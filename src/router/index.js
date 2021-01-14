import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/favorites',
		name: 'Favorites',
		component: Favorites,
	},
	{
		path: '/:location?',
		name: 'Home',
		component: Home,
	},
];

export const router = new VueRouter({ routes });

