import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		//// HOME ////
		{
			path: "/",
			name: "home",
			component: Home
		},
		//// COURSES ////
		{
			path: "/courses",
			name: "courses_index",
			// This is lazy-loading syntax to import the Component
			component: () => import("./pages/courses/Index.vue")
		},
		{
			path: "/courses/:id",
			name: "courses_show",
			component: () => import("./pages/courses/Show.vue")
		},
		//// ENROLMENTS ////
		{
			path: "/enrolments",
			name: "enrolments_index",
			component: () => import("./pages/enrolments/Index.vue")
		},
		{
			path: "/enrolments/:id",
			name: "enrolments_show",
			component: () => import("./pages/enrolments/Show.vue")
		},
		//// LECTURERS ////
		{
			path: "/lecturers",
			name: "lecturers_index",
			component: () => import("./pages/lecturers/Index.vue")
		},
		{
			path: "/lecturers/:id",
			name: "lecturers_show",
			component: () => import("./pages/lecturers/Show.vue")
		},
	]
});
