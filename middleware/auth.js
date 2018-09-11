export default function (context) {
    if (process.server) {
        if (context.req && context.req.url !== '/login') {
            if(!context.req.headers.cookie) {
                return context.redirect('/login')
            }
            const jwtCookie = context.req.headers.cookie.split(';').find( c => c.trim().startsWith('token=') )
            if(!jwtCookie) {
                return context.redirect('/login')
            }
            const token = jwtCookie.split('=')[1]
            context.store.dispatch('setAuthenticated', true)
        }
    } else if (process.client) {
        if (context.route.path !== '/login') {
            if (!localStorage.getItem('token')) {
                context.redirect('/login')
            }
        }
    }
}