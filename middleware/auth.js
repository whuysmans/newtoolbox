export default function (context) {
    if (process.server) {
        console.log(context.req.url)
        if (context.req && context.req.url !== '/login') {
            if(!context.req.headers.cookie) {
                return context.redirect('/login')
            }
            console.log(context.req.headers)
            const jwtCookie = context.req.headers.cookie.split(';').find( c => c.trim().startsWith('token=') )
            console.log(jwtCookie)
            if(!jwtCookie) {
                return context.redirect('/login')
            }
            const token = jwtCookie.split('=')[1]
        }
    } else if (process.client) {
        if (context.route.path !== '/login') {
            if (!localStorage.getItem('token')) {
                context.redirect('/login')
            }
        }
    }
}