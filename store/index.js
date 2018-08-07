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
            sortedFiches: [],
            searchIsActive: false,
            searchWord: '',
            showFilter: false
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
            },
            SET_SEARCH_IS_ACTIVE (state, bool) {
                state.searchIsActive = bool
            },
            SET_CURRENT_SEARCH_WORD (state, str) {
                state.searchWord = str
            },
            SET_SHOW_FILTER (state, bool) {
                state.showFilter = bool
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
            },
            setSearchIsActive (context, bool) {
                context.commit('SET_SEARCH_IS_ACTIVE', bool)
            },
            setCurrentSearchWord (context, str) {
                context.commit('SET_CURRENT_SEARCH_WORD', str)
            },
            setShowFilter (context, bool) {
                context.commit('SET_SHOW_FILTER', bool)
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
                        return fiche.Slug.toLowerCase() === name.toLowerCase()
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
            },
            getTreeView (state) {
                let tree = {}
                tree['name'] = ''
                tree['children'] = []
                state.kernthemas.map((thema) => {
                    let currentObj = {}
                    currentObj['name'] = thema.Titel
                    currentObj['slug'] = thema.Slug
                    currentObj['children'] = []
                    thema.Subcat.map((subcat) => {
                        let sub = {}
                        let fiches = state.infofiches.filter((fiche) => {
                            return fiche.Subcategorie[0].display.trim() === subcat.display.trim()
                        }).map((result) => {
                            return { 'name': result.Slug }
                        })
                        sub['name'] = subcat.display
                        sub['children'] = fiches
                        currentObj['children'].push(sub)
                    })
                    tree['children'].push(currentObj)
                })
                tree['name'] = 'toolbox'
                return tree
            },
            getSearchData (state) {
                let json = {}
                state.infofiches.map((fiche) => {
                    json[fiche.Titel] = {
                        'beschrijving': fiche.Beschrijving,
                        'werking': fiche.Werking,
                        'tips': fiche.Tips,
                        'voorbeelden': fiche.Voorbeelden,
                        'slug': fiche.Slug,
                        'kernthema': fiche.Kernthemas.display,
                        'subcategorie': fiche.Subcategorie[0].display
                    }
                })
                return json
            },
            getSearchIsActive (state) {
                return state.searchIsActive
            },
            getCurrentSearchWord (state) {
                return state.searchWord
            },
            getShowFilter (state) {
                return state.showFilter
            }
        }
    })
}

export default createStore