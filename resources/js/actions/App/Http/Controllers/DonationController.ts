import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/donations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DonationController::index
* @see app/Http/Controllers/DonationController.php:14
* @route '/api/donations'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\DonationController::store
* @see app/Http/Controllers/DonationController.php:28
* @route '/api/donations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/donations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DonationController::store
* @see app/Http/Controllers/DonationController.php:28
* @route '/api/donations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DonationController::store
* @see app/Http/Controllers/DonationController.php:28
* @route '/api/donations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DonationController::store
* @see app/Http/Controllers/DonationController.php:28
* @route '/api/donations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DonationController::store
* @see app/Http/Controllers/DonationController.php:28
* @route '/api/donations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const DonationController = { index, store }

export default DonationController