<template>
	<div>
		<v-app>

			<v-navigation-drawer v-model="drawer" app>
				<v-list>

					<v-list-item class="d-flex justify-center">
						<v-list-item-avatar 
							color="success" 
							class="white--text"
						>
							ABC
						</v-list-item-avatar>
					</v-list-item>

					<v-list-item>
						<router-link to="/">Home</router-link>
					</v-list-item>

					<v-list-item>
						<router-link :to="{name: 'courses_index'}">Courses</router-link>
					</v-list-item>

					<v-list-item>
						<router-link :to="{name: 'enrolments_index'}">Enrolments</router-link>
					</v-list-item>
					
					<v-list-item>
						<router-link :to="{name: 'lecturers_index'}">Lecturers</router-link>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-app-bar app>
						<v-app-bar-nav-icon v-if="loggedIn" @click="drawer = !drawer"></v-app-bar-nav-icon>

						<v-spacer></v-spacer>

						<v-toolbar-title>RESTful College</v-toolbar-title>

						<v-spacer></v-spacer>

						<v-switch 
							:value="darkMode" 
							@change="toggleDarkMode" 
							:label="`dark mode: ${switchLabel}`"
							class="mt-5 mr-5">
						</v-switch>
						<v-btn v-if="$store.state.loggedIn" @click="logout()" class="v-btn primary">Log Out</v-btn>
			</v-app-bar>

			<v-main>
				<v-container fluid>
					<router-view></router-view>
				</v-container>
			</v-main>

			<MyFooter />

		</v-app>
	</div>
</template>

<script>
import MyFooter from "@/components/MyFooter.vue"
import { mapState } from 'vuex'

export default {
	name: "App",
	data: () => ({ 
		drawer: null, 
		darkMode: false
	}),
	components: {
		MyFooter,
	},
	created(){
		if (localStorage.getItem('token')){
			this.$store.commit('SET_LOGGED_IN_STATUS', true)
		} else {
			this.$store.commit('SET_LOGGED_IN_STATUS', false)
		}
	},
	methods:{
		logout(){
			this.$store.dispatch('logout')
			this.$router.replace("/")
		},
		toggleDarkMode: function () {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.darkMode = !this.darkMode;
		},
	},
	computed: {
		switchLabel: function () {
			return this.darkMode ? 'on' : 'off';
		},
		// so I can hide the sidebar when logged out
		...mapState(['loggedIn'])
	}
};
</script>

<style>
	.rc1:hover{
		text-decoration: underline;
	}
	.rc2{
		font-size: 85%;
	}
</style>
