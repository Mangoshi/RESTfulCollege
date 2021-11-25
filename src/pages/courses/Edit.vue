<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.title"
						color="accent"
						label="Title"
						hint="The course title"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.code"
						color="accent"
						label="Code"
						hint="The course code"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.level"
						color="accent"
						label="Level"
						hint="The QQI level of the course"
						required
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.points"
						color="accent"
						label="Points Required"
						hint="The points required to get into the course"
						required
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="form.description"
						color="accent"
						label="Description"
						hint="The description of the course"
						required
					></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="accent" class="black--text" @click="submitForm()">
						Submit
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="cancelForm()">
						Cancel
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
	components: {
		
	},
	data(){
		return{
			course: {},
			form: {
				title: '',
				code: '',
				level: '',
				points: '',
				description: '',
			}
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
						this.form.title = this.course.title
                        this.form.description = this.course.description
                        this.form.code = this.course.code
                        this.form.points = this.course.points
                        this.form.level = this.course.level
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
				console.log(response.data)
				this.$router.push({
					name: "Course Viewer",
                    params: {
                        id: this.$route.params.id
                    }
				})
			})
			.catch(err => {
				console.log(err)
				console.log(err.response.data)
			})
		},
		cancelForm(){
			this.$router.go(-1)
		}
	}
};
</script>