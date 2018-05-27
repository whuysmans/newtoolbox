import axios from 'axios'

const getToken = (context) => {
    let token = null
    if (!context.req.headers.cookie) {
        context.redirect('/login')
    }
    const jwtCookie = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
    if (!jwtCookie) {
        context.redirect('/login')
    }
    token = jwtCookie.split('=')[1]
    return token
}

const loadData = async function (context, token) {
    const options = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let results = await Promise.all([
        axios.get(process.env.baseUrl + 'infofiches', options),
        axios.get(process.env.baseUrl + 'kernthemas', options),
        axios.get(process.env.baseUrl + 'homeinfo', options),
        axios.get(process.env.baseUrl + 'bibliografie', options)
    ])
    context.store.commit('LOAD_KERN_THEMAS', results[1].data.entries)
    context.store.commit('LOAD_HOME_INFO', results[2].data.entries[0])
    context.store.commit('LOAD_INFO_FICHES', results[0].data.entries)
    context.store.commit('LOAD_BIBLIO', results[3].data.entries)
}

export default loadData