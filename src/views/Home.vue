<template>
	<div class="home pos-main-container">
		<h1>Home</h1>
		<BaseButton>Select</BaseButton>
		<BaseInput label="my INPUT" @input="log" text="enter somthing" />
		<BaseSelect label="Pick One.." :options="options" @select="log" />
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			options: ['baba', 'gaga', 'dada'],
		};
	},
	methods: {
		log(data) {
			console.log('clicked');
		},
	},
	components: {},
};
</script>
