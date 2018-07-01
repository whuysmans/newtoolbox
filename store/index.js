import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

Vue.use(Vuex)

const createStore = () => {
    return new Vuex.Store({
        state: {
            infofiches: [],
            kernthemas: [],
            homeInfo: null,
            biblio: null,
            activeSubcat: '',
            activeState: '', 
            token: null,
            classSlug: {},
            activeThema: '',
            sortedFiches: []
        },
        mutations: {
            LOAD_INFO_FICHES (state, fiches) {
                fiches.map((fiche) => {
                  state.infofiches.push(fiche)
                })
            },
            LOAD_KERN_THEMAS (state, themas) {
                // dirty hack to load them in the right order
                state.kernthemas.push(themas.filter((thema) => {
                    return thema._id === 4
                })[0])
                state.kernthemas.push(themas.filter((thema) => {
                    return thema._id === 2
                })[0])
                state.kernthemas.push(themas.filter((thema) => {
                    return thema._id === 3
                })[0])
                themas.map((thema) => {
                    state.classSlug[thema.Titel] = thema.Slug
                })
            },
            LOAD_HOME_INFO (state, info) {
                state.homeInfo = info
            },
            LOAD_BIBLIO (state, biblio) {
                state.biblio = biblio
            },
            SET_TOKEN (state, token) {
                state.token = token
            },
            SET_ACTIVE_SUBCAT(state, subcat) {
                state.activeSubcat = subcat 
            },
            SET_ACTIVE_THEMA (state, thema) {
                state.activeThema = thema
            },
            SET_SORTED_FICHES (state) {
                let sortedData = state.kernthemas.map((thema) => {
                    return thema.Subcat.map((subcat) => {
                        return state.infofiches.filter((fiche) => {
                            return subcat.display.trim() === fiche.Subcategorie[0].display.trim()
                        })
                    })
                }).reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), [])
                state.sortedFiches = sortedData
            }
        },
        actions: {
            async nuxtServerInit ({commit}, state) {
                let results = await Promise.all([
                    axios.get(process.env.baseUrl + 'infofiches'),
                    axios.get(process.env.baseUrl + 'kernthemas'),
                    axios.get(process.env.baseUrl + 'homeinfo'),
                    axios.get(process.env.baseUrl + 'bibliografie')
                  ])
                  commit('LOAD_KERN_THEMAS', results[1].data.entries)
                  commit('LOAD_HOME_INFO', results[2].data.entries[0])
                  commit('LOAD_INFO_FICHES', results[0].data.entries)
                  commit('LOAD_BIBLIO', results[3].data.entries)
                  commit('SET_SORTED_FICHES')
            },
            setToken (context, token) {
                context.commit('SET_TOKEN', token)
                if (process.client) {
                    localStorage.setItem('token', token)
                }
                Cookie.set('token', token)
            },
            setActiveSubcat ({commit}, subcat) {
                commit('SET_ACTIVE_SUBCAT', subcat)
            },
            setActiveThema ({commit}, thema) {
                commit('SET_ACTIVE_THEMA', thema)
            }
        },
        getters: {
            getBiblio (state) {
                return state.biblio
            },
            getInfoFiches (state) {
            return state.infofiches
            },
            getClassSlug (state) {
            return (title) => {
                return state.classSlug[title]
            }
            },
            getKernThemas (state) {
            return state.kernthemas
            },
            getHomeInfo (state) {
            return state.homeInfo
            },
            getActiveSubcat (state) {
                return state.activeSubcat
            },
            getClassSlug (state) {
                return (title) => {
                    return state.classSlug[title]
                }
            },
            getInfoFiche (state) {
                return (name) => {
                    return state.infofiches.filter((fiche) => {
                        return fiche.Slug.toLowerCase() === name
                    })
                }
            },
            getActiveThema (state) {
                return state.activeThema
            },
            getInfoFicheIndex (state) {
                return (name) => {
                    return state.sortedFiches.indexOf(state.sortedFiches.filter((fiche) => {
                        return fiche.Slug.toLowerCase() === name
                    })[0])
                }
            },
            getSlugByNumber (state) {
                return (nr) => {
                    return state.sortedFiches[nr].Slug
                }
            },
            getNumberOfFiches (state) {
                return state.infofiches.length
            },
            getSortedFiches (state) {
                return state.sortedFiches 
            } 
        }
    })
}

export default createStore