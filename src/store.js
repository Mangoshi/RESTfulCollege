import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    // state: Store's data
    state: {
        loggedIn: false
    },
    // getters: 
    getters:{},
    // mutations: Store's methods which directly alter Store
    mutations:{
        SET_LOGGED_IN_STATUS(state, loggedIn){
            state.loggedIn = loggedIn
        }
    },
    // actions: Store's methods
    actions:{
        login(context, credentials){
            axios
            .post("https://college-api-mo.herokuapp.com/api/login",
			{
				email: credentials.email,
				password: credentials.password
			})
			.then(response =>{
				console.log(response.data)
                context.commit('SET_LOGGED_IN_STATUS', true)
                localStorage.setItem('token', response.data.token)
			})
			.catch(error =>{
				console.log(error)
				console.log(error.response.data.message)
			})
        },
        logout(context){
            localStorage.removeItem('token')
            context.commit('SET_LOGGED_IN_STATUS', false)
        }
    }
})