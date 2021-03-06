<template>
	<div>
		<!-- Styling entire app with spacemono font & passing in the Vuetify theme as CSS variables -->
		<v-app class="spacemono" :style="cssProps">

			<!-- Side Bar -->
			<v-navigation-drawer 
				v-if="loggedIn"
				v-model="drawer" 
				app 
				permanent 
				expand-on-hover
				color="secondary"
				>
				<v-list >
					<v-list-item class="d-flex justify-center mb-5">
						<v-list-item-avatar 
							color="primary" 
							class="secondary--text unselectable"
							>
							X_X
						</v-list-item-avatar>
					</v-list-item>
					<v-list-item-group
						v-model="selectedItem"
						color="primary"
						>
						<v-list-item class="mb-10" to="/">
							<router-link to="/"><v-icon>mdi-home</v-icon></router-link>&nbsp;
							<router-link to="/" class="sideLink">Home</router-link>
						</v-list-item>
						<v-list-item class="mb-10" :to="{name: 'All Courses'}">
							<router-link :to="{name: 'All Courses'}"><v-icon>mdi-school</v-icon></router-link>&nbsp;
							<router-link :to="{name: 'All Courses'}" class="sideLink">Courses</router-link>
						</v-list-item>
						<v-list-item class="mb-10" :to="{name: 'All Enrolments'}">
							<router-link :to="{name: 'All Enrolments'}"><v-icon>mdi-text</v-icon></router-link>&nbsp;
							<router-link :to="{name: 'All Enrolments'}" class="sideLink">Enrolments</router-link>
						</v-list-item>
						<v-list-item class="mb-10" :to="{name: 'All Lecturers'}">
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
				<!---->
				<v-spacer></v-spacer>
				<!---->
				<label for="v-switch" class="mr-5 unselectable darkModeText">dark mode: {{ switchLabel }}</label>
				<v-switch 
					:value="darkMode" 
					@change="toggleDarkMode"
					class="mt-5 mr-5"
					color="accent"
					>
				</v-switch>
				<v-btn v-if="$store.state.loggedIn" @click="logout()" class="v-btn accent black--text">Log Out</v-btn>
			</v-app-bar>

			<!-- Router View -->
			<v-main>
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</v-main>

			<!-- Footer -->
			<MyFooter />

			<!-- Toast -->
			<MyToast ref="toast"/>

		</v-app>
	</div>
</template>

<script>
import MyFooter from "@/components/MyFooter.vue"
import { mapState } from 'vuex'
import MyToast from './components/MyToast.vue';


export default {
	name: "App",
	data: () => ({ 
		darkMode: false
	}),
	components: {
		MyFooter,
		MyToast,
	},
	mounted(){
		this.$root.toast = this.$refs.toast
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

		// making CSS color variables out of my theme from vuetify.js
		cssProps () {
			// create themeColors object
			var themeColors = {}
			// if dark mode is off,
			if(this.darkMode === false){
				// for each color key in themes.light, add to themeColors, adding '--v-' to the start of the key
				// then assign this key the value of the color
				Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
					themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color]
			})
			// else if dark mode is on
			} else {
				// fill themeColors with the colors from themes.dark instead
				Object.keys(this.$vuetify.theme.themes.dark).forEach((color) => {
					themeColors[`--v-${color}`] = this.$vuetify.theme.themes.dark[color]
				})
			}
			// return themeColors object
			return themeColors
		}
	}
};
</script>

<style>

/* Utility Classes */

	.unselectable{
		user-select: none;
	}

/* Font Classes */

	.spacemono{
		font-family: 'Space Mono', monospace !important;
	}
	.spacemono-bold{
		font-family: 'Space Mono', monospace !important;
		font-weight: 700;
	}

/* Router Link styling */

	.router-link-exact-active *{
        color: var(--v-accent) !important;
    }
	.router-link-exact-active {
        color: var(--v-accent) !important;
    }

/* Navbar styling */

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

/* Sidebar Link Styling */

	.sideLink{
		font-size: 1.3em !important;
		text-decoration: none;
	}
	.sideLink:hover{
		text-decoration: underline;
	}

/* Button Styling */

	.btnGroup *{
		height: 24px !important;
	}

/* CRUD Button Styling */

	.addBtn{
		color: var(--v-black) !important;
		border: 1px solid var(--v-black) !important;
		background-color: var(--v-accent) !important;
	}
	.addBtn:hover{
		color: var(--v-accent) !important;
		border: 1px solid var(--v-accent) !important;
		background-color: var(--v-black) !important;
	}
	.viewBtn{
		color: var(--v-viewFG) !important;
		border-color: var(--v-viewFG) !important;
		background-color: var(--v-viewBG) !important;
	}
	.viewBtn:hover{
		color: var(--v-viewBG) !important;
		border-color: var(--v-viewBG) !important;
		background-color: var(--v-viewFG) !important;
	}
	.editBtn{
		color: var(--v-editFG) !important;
		border-color: var(--v-editFG) !important;
		background-color: var(--v-editBG) !important;
	}
	.editBtn:hover{
		color: var(--v-editBG) !important;
		border-color: var(--v-editBG) !important;
		background-color: var(--v-editFG) !important;
	}
	.deleteBtn{
		color: var(--v-deleteFG) !important;
		border-color: var(--v-deleteFG) !important;
		background-color: var(--v-deleteBG) !important;
	}
	.deleteBtn:hover{
		color: var(--v-deleteBG) !important;
		border-color: var(--v-deleteBG) !important;
		background-color: var(--v-deleteFG) !important;
	}

/* Transition Styling */

	.fade-enter-active {
		-webkit-animation: fade-in 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
		animation: fade-in 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	}

	.fade-leave-active {
		-webkit-animation: fade-out 0.5s ease-out both;
		animation: fade-out 0.5s ease-out both;
	}

	@-webkit-keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes fade-out {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fade-out {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

</style>
