<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CurrencyService
{
    protected string $apiKey;

    protected string $apiUrl;

    protected string $baseCurrency;

    protected int $cacheMinutes;

    public function __construct()
    {
        $this->apiKey = config('services.currency.api_key');
        $this->apiUrl = config('services.currency.api_url');
        $this->baseCurrency = config('services.currency.base');
        $this->cacheMinutes = config('services.currency.cache_minutes');
    }

    /**
     * Get exchange rates for all supported currencies
     */
    public function getExchangeRates(): array
    {
        $cacheKey = 'currency_exchange_rates';

        return Cache::remember($cacheKey, now()->addMinutes($this->cacheMinutes), function () {
            try {
                $response = Http::get($this->apiUrl, [
                    'apikey' => $this->apiKey,
                    'base_currency' => $this->baseCurrency,
                    'currencies' => 'USD,EUR,GBP,INR',
                ]);

                if ($response->successful()) {
                    $data = $response->json();

                    return [
                        'success' => true,
                        'rates' => $data['data'] ?? [],
                        'base' => $this->baseCurrency,
                        'last_updated' => now()->toIso8601String(),
                    ];
                }

                Log::warning('Currency API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return $this->getFallbackRates();
            } catch (\Exception $e) {
                Log::error('Currency API error: '.$e->getMessage());

                return $this->getFallbackRates();
            }
        });
    }

    /**
     * Convert amount from one currency to another
     */
    public function convert(float $amount, string $from, string $to): float
    {
        if ($from === $to) {
            return $amount;
        }

        $rates = $this->getExchangeRates();

        if (! $rates['success']) {
            return $amount;
        }

        $fromRate = $rates['rates'][$from]['value'] ?? 1;
        $toRate = $rates['rates'][$to]['value'] ?? 1;

        // Convert to base currency first, then to target currency
        $baseAmount = $amount / $fromRate;

        return round($baseAmount * $toRate, 2);
    }

    /**
     * Get fallback rates if API fails
     */
    protected function getFallbackRates(): array
    {
        return [
            'success' => false,
            'rates' => [
                'USD' => ['code' => 'USD', 'value' => 1.0],
                'EUR' => ['code' => 'EUR', 'value' => 0.92],
                'GBP' => ['code' => 'GBP', 'value' => 0.79],
                'INR' => ['code' => 'INR', 'value' => 83.12],
            ],
            'base' => 'USD',
            'last_updated' => now()->toIso8601String(),
            'fallback' => true,
        ];
    }

    /**
     * Get formatted exchange rate info
     */
    public function getFormattedRates(): array
    {
        $data = $this->getExchangeRates();

        $formatted = [];
        foreach ($data['rates'] as $code => $rate) {
            $formatted[$code] = [
                'code' => $code,
                'rate' => $rate['value'],
                'symbol' => $this->getCurrencySymbol($code),
            ];
        }

        return $formatted;
    }

    /**
     * Get currency symbol
     */
    protected function getCurrencySymbol(string $code): string
    {
        return match ($code) {
            'USD' => '$',
            'EUR' => '€',
            'GBP' => '£',
            'INR' => '₹',
            default => $code
        };
    }
}
