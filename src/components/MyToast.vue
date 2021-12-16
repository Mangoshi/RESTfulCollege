<template>
<v-snackbar
	:color="color"
	:timeout="timer"
	v-model="showSnackbar"
	bottom
	right
>
	<v-icon @click="showSnackbar = false" left>{{icon}}</v-icon>{{message}}
</v-snackbar>
</template>

<script>
export default {
	name: "toast",
	data() {
		// defaults
		return{
		showSnackbar: true,
		message: 'Snackbar welcomes you :)',
		color: 'success',
		icon: 'mdi-close',
		timer: 3000
		}
	},
	methods:{
		show(data) {
		this.message = data.message || 'missing "message".'
		this.color = data.color || 'success'
		this.timer = data.timer || 3000
		this.icon = data.icon || 'mdi-close'
		}
	}
}
</script>
