<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.title"
						label="Title"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.code"
						label="Code"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.level"
						label="Level"
						required
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.points"
						label="Points Required"
						required
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="course.description"
						label="Description"
						required
					></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="primary" class="white--text">
						Submit
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
import axios from 'axios'

export default {
	name: "CourseEdit",
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
				.get(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
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