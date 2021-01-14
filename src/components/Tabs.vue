<template>
  <div>
    <md-tabs :md-active-tab="'tab-'+$route.path.slice(1)" >
      <md-tab id="tab-favorites" md-label="Favorites"  md-icon="favorite" to="/favorites" ></md-tab>
      <md-tab id="tab-home" md-label="Home"  md-icon="home" to="/" ></md-tab>
    </md-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    methods: {
  }
}
</script>
