import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
const showLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
showLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
* @see app/Http/Controllers/AdminAuthController.php:16
* @route '/admin/login'
*/
showLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showLogin.form = showLoginForm

/**
* @see \App\Http\Controllers\AdminAuthController::login
* @see app/Http/Controllers/AdminAuthController.php:28
* @route '/admin/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminAuthController::login
* @see app/Http/Controllers/AdminAuthController.php:28
* @route '/admin/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::login
* @see app/Http/Controllers/AdminAuthController.php:28
* @route '/admin/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::login
* @see app/Http/Controllers/AdminAuthController.php:28
* @route '/admin/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::login
* @see app/Http/Controllers/AdminAuthController.php:28
* @route '/admin/login'
*/
loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\AdminAuthController::logout
* @see app/Http/Controllers/AdminAuthController.php:54
* @route '/admin/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/admin/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminAuthController::logout
* @see app/Http/Controllers/AdminAuthController.php:54
* @route '/admin/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::logout
* @see app/Http/Controllers/AdminAuthController.php:54
* @route '/admin/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::logout
* @see app/Http/Controllers/AdminAuthController.php:54
* @route '/admin/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::logout
* @see app/Http/Controllers/AdminAuthController.php:54
* @route '/admin/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

const AdminAuthController = { showLogin, login, logout }

export default AdminAuthController