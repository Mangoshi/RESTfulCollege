<template >
	<v-img
		lazy-src="https://picsum.photos/id/11/10/6"
		height="100%"
		max-height="100%"
		max-width="100%"
		src="https://picsum.photos/id/12/3840/2160"
	>
		<v-container>
			
			<div v-if="!loggedIn">
				<v-row>
					<v-spacer></v-spacer>
					<v-col
						cols="12"
						sm="10"
						md="8"
						lg="6"
						xl="4"
					>
						<v-card class="centered pa-5">
							<v-icon style="width:100%; font-size: 10em;">mdi-school</v-icon>
							<h2>RESTful College</h2>
						<v-text-field color="accent" type="email" v-model="form.email" placeholder="email" />
						<br>
						<v-text-field color="accent" type="password" v-model="form.password" placeholder="password" />
						<br>
						<v-btn color="accent" class="secondary--text" @click="login(form)">Login</v-btn>
						</v-card>
					</v-col>
					<v-spacer></v-spacer>
				</v-row>
			</div>
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
		}
	},
	created() {
		setInterval(this.getNow, 1000);
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
	.welcome{
		color: white;
		text-shadow: 2px 2px 2px #000;
		font-size: 125%;
		margin-top: 15vw;
		user-select: none;
	}
</style>