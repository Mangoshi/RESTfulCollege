<template>
	<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.title"
						color="accent"
						label="Title"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.code"
						color="accent"
						label="Code"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.level"
						color="accent"
						label="Level"
						readonly
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.points"
						color="accent"
						label="Points Required"
						readonly
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="course.description"
						color="accent"
						label="Description"
						readonly
					></v-textarea>
				</v-col>
			</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CourseView",
	components: {
		
	},
	data(){
		return{
			course: {}
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`courses/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("getData() response: ", response.data.data)
						this.course = response.data.data
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		}
	}
};
</script>
