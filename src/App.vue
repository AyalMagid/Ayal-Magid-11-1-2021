<template>
	<div id="app" class="">
		<AppHeader />
		<router-view />
	</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
	components: {
		AppHeader,
		AppFooter,
	},
};
</script>
