<template>
	<div>
		<v-app class="spacemono">

			<!-- Side Bar -->

			<v-navigation-drawer 
			v-model="drawer" 
			app 
			permanent 
			expand-on-hover
			color="secondary"
			>
				<v-list shaped>
					<v-list-item class="d-flex justify-center mb-5">
						<v-list-item-avatar 
							color="primary" 
							class="secondary--text">
							X_X
						</v-list-item-avatar>
					</v-list-item>
					<v-list-item-group
						v-model="selectedItem"
						color="primary">
						<v-list-item class="mb-10">
							<router-link to="/"><v-icon>mdi-home</v-icon></router-link>&nbsp;
							<router-link to="/" class="sideLink">Home</router-link>
						</v-list-item>

						<v-list-item class="mb-10">
							<router-link :to="{name: 'All Courses'}"><v-icon>mdi-school</v-icon></router-link>&nbsp;
							<router-link :to="{name: 'All Courses'}" class="sideLink">Courses</router-link>
						</v-list-item>

						<v-list-item class="mb-10">
							<router-link :to="{name: 'All Enrolments'}"><v-icon>mdi-text</v-icon></router-link>&nbsp;
							<router-link :to="{name: 'All Enrolments'}" class="sideLink">Enrolments</router-link>
						</v-list-item>
						
						<v-list-item class="mb-10">
							<router-link :to="{name: 'All Lecturers'}"><v-icon>mdi-account-group</v-icon></router-link>&nbsp;
							<router-link :to="{name: 'All Lecturers'}" class="sideLink">Lecturers</router-link>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-navigation-drawer>

			<!-- Navigation Bar -->

			<v-app-bar 
			app
			color="secondary"
			class="primary--text"
			>
				<v-toolbar-title class="navTitle">
					<span class="rc1">REST</span><span class="rc2">ful</span> College<span class="rc3">&nbsp;(&nbsp;{{ currentRouteName }}&nbsp;)</span>
				</v-toolbar-title>

				<v-spacer></v-spacer>
				
				<label for="v-switch" class="mr-5">dark mode: {{ switchLabel }}</label>
				<v-switch 
					:value="darkMode" 
					@change="toggleDarkMode"
					class="mt-5 mr-5">
				</v-switch>
			
				<v-btn v-if="$store.state.loggedIn" @click="logout()" class="v-btn accent black--text">Log Out</v-btn>
			</v-app-bar>

			<!-- Router View -->

			<v-main>
				<v-container fluid>
					<router-view></router-view>
				</v-container>
			</v-main>

			<!-- Footer -->

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
		darkMode: false,
		selectedItem: 0
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
		currentRouteName() {
			return this.$route.name;
		},
		// so I can hide the sidebar when logged out
		...mapState(['loggedIn']),
	}
};
</script>

<style>
	.spacemono{
		font-family: 'Space Mono', monospace !important;
	}
	.spacemono-bold{
		font-family: 'Space Mono', monospace !important;
		font-weight: 700;
	}
	.router-link-exact-active *{
        color: deeppink !important;
    }
	.router-link-exact-active {
        color: deeppink !important;
    }
	.navTitle{
		font-size: 1.5em !important;
		user-select: none;
		text-align: left;
		margin-left: 10px;
	}
	.rc1:hover{
		text-decoration: underline;
	}
	.rc2{
		font-size: 85%;
	}
	.rc3{
		font-size: 75%;
	}
	.sideLink{
		font-size: 1.3em !important;
		text-decoration: none;
	}
	.sideLink:hover{
		text-decoration: underline;
	}
</style>
