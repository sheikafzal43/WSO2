import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see routes/web.php:9
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:9
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:9
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:9
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:9
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:9
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:9
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see routes/web.php:13
* @route '/donate'
*/
export const donate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: donate.url(options),
    method: 'get',
})

donate.definition = {
    methods: ["get","head"],
    url: '/donate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:13
* @route '/donate'
*/
donate.url = (options?: RouteQueryOptions) => {
    return donate.definition.url + queryParams(options)
}

/**
* @see routes/web.php:13
* @route '/donate'
*/
donate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: donate.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/donate'
*/
donate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: donate.url(options),
    method: 'head',
})

/**
* @see routes/web.php:13
* @route '/donate'
*/
const donateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: donate.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/donate'
*/
donateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: donate.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/donate'
*/
donateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: donate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

donate.form = donateForm

/**
* @see routes/web.php:42
* @route '/admin'
*/
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:42
* @route '/admin'
*/
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
* @see routes/web.php:42
* @route '/admin'
*/
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:42
* @route '/admin'
*/
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

/**
* @see routes/web.php:42
* @route '/admin'
*/
const adminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:42
* @route '/admin'
*/
adminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:42
* @route '/admin'
*/
adminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

admin.form = adminForm
