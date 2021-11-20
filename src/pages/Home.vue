<template>
	<v-col>
		<h2>Welcome to <span class="rc1">REST</span><span class="rc2">ful</span> College</h2>
		<div v-if="!loggedIn">
			Email: <v-text-field type="email" v-model="form.email" placeholder="email" />
			<br>
			Password: <v-text-field type="password" v-model="form.password" placeholder="password" />
			<br>
			<v-btn @click="login(form)">Login</v-btn>
		</div>
		<p v-else>
			You are logged in.
		</p>
	</v-col>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: "Home",
	components: {},
	data(){
		return{
			form: {
				email: "sam@bloggs.com",
				password: "secret"
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

</style>