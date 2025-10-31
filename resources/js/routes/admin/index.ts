import { queryParams, type RouteDefinition, type RouteFormDefinition, type RouteQueryOptions } from './../../wayfinder';
/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
});

login.definition = {
    methods: ['get', 'head'],
    url: '/admin/login',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:16
 * @route '/admin/login'
 */
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

login.form = loginForm;

/**
 * @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:54
 * @route '/admin/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
});

logout.definition = {
    methods: ['post'],
    url: '/admin/logout',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:54
 * @route '/admin/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:54
 * @route '/admin/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:54
 * @route '/admin/logout'
 */
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:54
 * @route '/admin/logout'
 */
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
});

logout.form = logoutForm;
