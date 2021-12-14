import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/college.js'

Vue.use(Vuex)

export default new Vuex.Store({
    // state: Store's data
    state: {
        loggedIn: false,
        errors: {},
        username: ""
    },
    // getters: 
    getters:{},
    // mutations: Store's methods which directly alter Store
    mutations:{
        SET_LOGGED_IN_STATUS(state, loggedIn){
            state.loggedIn = loggedIn
        },
        SET_ERRORS(state, errors){
            state.errors = errors
        },
        SET_USERNAME(state, username){
            state.username = username
        }
    },
    // actions: Store's methods
    actions:{
        login(context, credentials){
            axios
            .post("login",
			{
				email: credentials.email,
				password: credentials.password
			})
			.then(response =>{
				console.log(`login() response: ${JSON.stringify(response.data)}`)
                context.commit('SET_LOGGED_IN_STATUS', true)
                localStorage.setItem('token', response.data.token)
                context.commit('SET_USERNAME', JSON.stringify(response.data.name))
                localStorage.setItem('username', response.data.name)
			})
			.catch(error =>{
				console.log(`login() error: ${error}`)
                context.commit('SET_ERRORS', error)
			})
        },
        register(context, credentials){
            axios
            .post("register",
            // form validation errors
			{
                name: credentials.name,
				email: credentials.email,
				password: credentials.password
			})
			.then(response =>{
				console.log(`register() response: ${response.data}`)
                context.commit('SET_LOGGED_IN_STATUS', true)
                localStorage.setItem('token', response.data.token)
			})
			.catch(error =>{
				console.log(`register() error: ${error}`)
                context.commit('SET_ERRORS', error)
			})
        },
        logout(context){
            localStorage.removeItem('token')
            context.commit('SET_LOGGED_IN_STATUS', false)
        },
        // getUsername(context){
        //     let token = localStorage.getItem('token')
        //     axios
        //     .get(`user`,
        //     {
        //         headers: {
        //             "Authorization" : `Bearer ${token}`
        //         }
        //     })
        //     .then(response => {
        //         console.log(`getUsername() response: ${response.data}`)
        //         context.commit('SET_USERNAME', response.data.name)
        //         }
        //     )
        //     .catch(error => console.log("getUsername() error caught: ", error))	
        // }
    }
})