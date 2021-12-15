<template >
	<!-- Background image for login / home -->
	<v-img
		height="100%"
		max-height="100%"
		width="100%"
		max-width="100%"
		:lazy-src="this.photoSD"
		:src="this.photoHD"
		>
		<!-- If user is not logged in -->
		<v-container v-if="!loggedIn">
			<v-row>
				<v-spacer></v-spacer>
				<v-col
					cols="12"
					sm="10"
					md="8"
					lg="6"
					xl="4"
					class="login"
				>

					<!-- Login Form -->
					<v-card class="centered pa-5" color="rgb(0, 0, 0, 0.8)" v-if="formToggle"> 
						<v-icon style="width:100%; font-size: 10em;" color="accent">mdi-school</v-icon>
						<h2 class="white--text unselectable">RESTful College</h2>
						<v-form v-model="loginValid">
							<v-text-field 
							dark
							required
							color="accent"
							type="email"
							v-model="loginForm.email"
							placeholder="email"
							:rules="emailRules"
							/>
							<small v-if="errors.email" class="unselectable accent--text errorMessage">{{errors[0].email}}</small>
							<v-text-field 
							dark
							required
							color="accent"
							type="password"
							v-model="loginForm.password"
							placeholder="password"
							:rules="passwordRules"
							/>
							<small v-if="errors.password" class="align-left unselectable accent--text errorMessage">{{errors.password[0]}}</small>
						</v-form>
					<br>
					<v-btn color="secondary" class="accent--text mr-2" @click="toggleForm()">Register</v-btn>
					<v-btn color="accent" class="secondary--text ml-2" @click="login(loginForm)">Login</v-btn>
					</v-card>

					<!-- Register Form -->
					<v-card class="centered pa-5" color="rgb(0, 0, 0, 0.8)" v-else> 
						<v-icon style="width:100%; font-size: 10em;" color="accent">mdi-school</v-icon>
						<h2 class="white--text unselectable">RESTful College</h2>
						<v-form v-model="registerValid">
							<v-text-field 
							dark
							required
							color="accent"
							type="text"
							v-model="registerForm.name"
							placeholder="name"
							:rules="nameRules"
							/>
							<small v-if="errors.name" class="unselectable accent--text errorMessage">{{errors.name[0]}}</small>
							<v-text-field 
							dark
							required
							color="accent"
							type="email"
							v-model="registerForm.email"
							placeholder="email"
							:rules="emailRules"
							/>
							<small v-if="errors.email" class="unselectable accent--text errorMessage">{{errors.email[0]}}</small>
							<v-text-field 
							dark
							required
							color="accent"
							type="password"
							v-model="registerForm.password"
							placeholder="password"
							:rules="passwordRules"
							/>
							<small v-if="errors.password" class="unselectable accent--text errorMessage">{{errors.password[0]}}</small>
						</v-form>
					<br>
					<v-btn color="secondary" class="accent--text mr-2" @click="toggleForm()">Login</v-btn>
					<v-btn color="accent" class="secondary--text ml-2" @click="register(registerForm)">Register</v-btn>
				</v-card>

				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-container>
		<!-- If user is logged in -->
		<v-container v-else class="welcomeContainer">
			<v-card class="centered welcome unselectable white--text pa-5" color="rgb(0, 0, 0, 0.5)"> 
				<h2 class="mb-5 centered">Welcome, {{ getUsername() }}</h2>
				<div class="centered">
					{{ currentDate }}
				</div>
				<div class="centered">
					{{ currentTime }}
				</div>
				<p class="centered mt-5">
					You are logged in.
				</p>
			</v-card>
		</v-container>
	</v-img>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/config/college.js'

export default {
	name: "Home",
	title: 'RESTful College',
	components: {},
	data(){
		return{
			// Form data
			loginForm: {
				email: "",
				password: "",
			},
			registerForm: {
				name: "",
				email: "",
				password: ""
			},
			formToggle: true,
			// Dashboard data
			currentTime: "",
			currentDate: "",
			// Image data
			photoHD: "",
			photoSD: "",
			// Form validation data
			loginValid: false,
			registerValid: false,
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid',
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => v.length >= 5 || 'Password must be more than 5 characters long',
			],
			nameRules: [
				v => !!v || 'Name is required',
				v => v.length > 1 || 'Name must be more than 1 character long',
			]
		}
	},
	created() {
		setInterval(this.getNow, 1000);
	},
	mounted(){
		this.getBackgroundImage()
	},
	methods: {
		...mapActions(['login', 'register']),
		getNow: function() {
			const today = new Date();
			let minutes = this.checkSingleDigit(today.getMinutes())
			let seconds = this.checkSingleDigit(today.getSeconds())
			const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			const time = today.getHours() + ":" + minutes + ":" + seconds;
			this.currentDate = date;
			this.currentTime = time;
		},
		checkSingleDigit(digit){
			return ('0' + digit).slice(-2)
		},
		randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
		},
		getBackgroundImage(){
			// Pexels Request //
            const PEXELS_URL = `https://api.pexels.com/v1/search?query=landscape&per_page=20&orientation=landscape`
            const PEXELS_TOKEN = '563492ad6f91700001000001660dc6de6e62494da4a3601ccfc6ecc3'
            axios
			.get(PEXELS_URL, { headers: {"Authorization" : `Bearer ${PEXELS_TOKEN}`} })
			.then(pexels => {
				console.log("Pexels data: ", pexels.data)
				let photoIndex = this.randomInt(0,19)
				console.log("Random Photo Index: ", photoIndex)
				this.photoHD = pexels.data.photos[photoIndex].src.original
				this.photoSD = pexels.data.photos[photoIndex].src.medium
			})
			.catch(error => console.log("Pexels error: ", error))
		},
		toggleForm(){
			this.formToggle = !this.formToggle
			// this.errors = []
		},
		getUsername(){
			return localStorage.getItem('username')
		},
	},
	computed: {
		...mapState(['loggedIn', 'errors'])
	},
};
</script>

<style>
	.centered{
		text-align: center;
	}
	.login{
		margin-top: 2vw;
	}
	.welcome{
		text-shadow: 2px 2px 2px #000;
		font-size: 125%;
		margin-top: 12vw;
	}
	.welcomeContainer{
		max-width: 600px !important;
	}
	.errorMessage{
		text-align: left !important;
	}
</style>