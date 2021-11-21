<template>
	<v-container>
		<h2 class="mb-5 centered">Welcome to <span class="rc1">REST</span><span class="rc2">ful</span> College</h2>
		<div v-if="!loggedIn">
			<v-row>
				<v-col></v-col>
				<v-col class="col-3">
					<v-card class="pa-5">
					<v-text-field type="email" v-model="form.email" placeholder="email" />
					<br>
					<v-text-field type="password" v-model="form.password" placeholder="password" />
					<br>
					<v-btn @click="login(form)">Login</v-btn>
					</v-card>
				</v-col>
				<v-col></v-col>
			</v-row>
		</div>
		<p v-else class="centered">
			You are logged in.
		</p>
	</v-container>
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
				password: ""
			}
		}
	},
	computed: {
		...mapState(['loggedIn'])
	},
	methods: {
		...mapActions(['login'])
	}
};
</script>

<style>
	.centered{
		text-align: center;
	}
</style>