<template>
	<v-container fluid>
		<v-switch
			v-model="singleExpand"
			label="Expand Single Item"
		></v-switch>
		<v-data-iterator
			:items="lecturers"
			item-key="id"
			:items-per-page="12"
			:single-expand="singleExpand"
			hide-default-footer
		>
			<template v-slot:default="{ items, isExpanded, expand }">
			<v-row>
				<v-col
					v-for="item in items"
					:key="item.id"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
				<v-card>
					<v-card-title>
					<h4>{{ item.name }}</h4>
					</v-card-title>
					<v-switch
						:input-value="isExpanded(item)"
						:label="isExpanded(item) ? 'Expanded' : 'Closed'"
						class="pl-4 mt-0"
						@change="(v) => expand(item, v)"
					></v-switch>
					<v-divider></v-divider>
					<v-list
						v-if="isExpanded(item)"
						dense
					>
					<v-list-item>
						<v-list-item-content>ID:</v-list-item-content>
						<v-list-item-content class="align-end">
						{{ item.id }}
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>Phone:</v-list-item-content>
						<v-list-item-content class="align-end">
						{{ item.phone }}
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>Email:</v-list-item-content>
						<v-list-item-content class="align-end">
						{{ item.email }}
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>Address:</v-list-item-content>
						<v-list-item-content class="align-end">
						{{ item.address }}
						</v-list-item-content>
					</v-list-item>
					</v-list>
				</v-card>
				</v-col>
			</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "LecturersIndex",
	components: {
		
	},
	data(){
		return{
			lecturers: [],
			singleExpand: false,
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`lecturers`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("getData() response: ", response.data.data)
						this.lecturers = response.data.data
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		}
	}
};
</script>
