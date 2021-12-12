<template>
	<v-form>
		<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.title"
						color="accent"
						label="Title"
						hint="The course title"
						required
						clearable
						clear-icon="mdi-trash-can-outline"
					></v-text-field>
					<small v-if="errors.title" class="unselectable accent--text">{{errors.title[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.code"
						color="accent"
						label="Code"
						hint="The course code"
						required
						clearable
						clear-icon="mdi-trash-can-outline"
					></v-text-field>
					<small v-if="errors.code" class="unselectable accent--text">{{errors.code[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						type="number"
						v-model="form.level"
						color="accent"
						label="Level"
						hint="The QQI level of the course"
						required
						clearable
						clear-icon="mdi-trash-can-outline"
					></v-text-field>
					<small v-if="errors.level" class="unselectable accent--text">{{errors.level[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						type="number"
						v-model="form.points"
						color="accent"
						label="Points Required"
						hint="The points required to get into the course"
						required
						clearable
						clear-icon="mdi-trash-can-outline"
					></v-text-field>
					<small v-if="errors.points" class="unselectable accent--text">{{errors.points[0]}}</small>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="form.description"
						color="accent"
						label="Description"
						hint="The description of the course"
						required
						clearable
						clear-icon="mdi-trash-can-outline"
					></v-textarea>
					<small v-if="errors.description" class="unselectable accent--text">{{errors.description[0]}}</small>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="cancelForm()">
						Cancel
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="accent" class="black--text" @click="submitForm()">
						Submit
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CourseEdit",
	title: `Course Editor • RESTful College`,
	data(){
		return{
			form: {
				title: '',
				code: '',
				level: '',
				points: '',
				description: '',
			},
			errors: {}
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
						let course = response.data.data
						this.form.title = course.title
                        this.form.description = course.description
                        this.form.code = course.code
                        this.form.points = course.points
                        this.form.level = course.level
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		},
		submitForm(){
			let token = localStorage.getItem('token')
			axios
			.put(`courses/${this.$route.params.id}`, this.form, {
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response =>{
				console.log("submitForm() response: ", response.data.data)
				this.$router.push({
					name: "Course Viewer",
                    params: {
                        id: this.$route.params.id
                    }
				})
			})
			.catch(error => {
				console.log("submitForm() error message: ", error.response.data.errors)
				this.errors = error.response.data.errors
				console.log("All error data: ", error)
			})
		},
		cancelForm(){
			this.$router.go(-1)
		}
	}
};
</script>