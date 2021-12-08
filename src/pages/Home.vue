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
		<v-container>
			<!-- If user is not logged in -->
			<div v-if="!loggedIn">
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
					<!--Figure out how to use RGBA values with theme toggle...-->
						<v-card class="centered pa-5" color="rgb(0, 0, 0, 0.7)"> 
							<v-icon style="width:100%; font-size: 10em;" color="accent">mdi-school</v-icon>
							<h2 class="white--text unselectable">RESTful College</h2>
							<v-form>
								<v-text-field 
								dark 
								color="accent"
								type="email"
								v-model="form.email"
								placeholder="email"
								/>
								<v-text-field 
								dark 
								color="accent"
								type="password"
								v-model="form.password"
								placeholder="password"
								/>
							</v-form>
						<br>
						<v-btn color="accent" class="secondary--text" @click="login(form)">Login</v-btn>
						</v-card>
					</v-col>
					<v-spacer></v-spacer>
				</v-row>
			</div>
			<!-- If user is logged in -->
			<div v-else class="welcome">
				<h2 class="mb-5 centered">Welcome to <span class="rc1">REST</span><span class="rc2">ful</span> College</h2>
				<div class="centered">
					{{ currentDate }}
				</div>
				<div class="centered">
					{{ currentTime }}
				</div>
				<p class="centered mt-5">
					You are logged in.
				</p>
			</div>
		</v-container>
	</v-img>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/config/college.js'

export default {
	name: "Home",
	components: {},
	data(){
		return{
			form: {
				email: "",
				password: "",
				
			},
			currentTime: "",
			currentDate: "",
			photoHD: "",
			photoSD: "",
		}
	},
	created() {
		setInterval(this.getNow, 1000);
	},
	mounted(){
		this.getBackgroundImage()
	},
	methods: {
		...mapActions(['login']),
		getNow: function() {
			const today = new Date();
			this.minutes = this.checkSingleDigit(today.getMinutes())
			this.seconds = this.checkSingleDigit(today.getSeconds())

			const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			const time = today.getHours() + ":" + this.minutes + ":" + this.seconds;

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
		}
	},
	computed: {
		...mapState(['loggedIn']),
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
		color: white;
		text-shadow: 2px 2px 2px #000;
		font-size: 125%;
		margin-top: 12vw;
		user-select: none;
	}
</style>