<template>
  <header class="app-header">
    <div class="flex align-center space-between">
    <div class="logo-theme-unit-wrapper">
      <section class="logo">
        <h2>WeatherApp</h2>
      </section>
        <div class="header-btns-container flex align-center">
          <div v-show="isDark" class="header-theme flex align-center" @click="toggleTheme">
            <div>Theme:</div>
            <i class="fas fa-moon"></i>
          </div>
          <div v-show="!isDark" class="header-theme flex align-center" @click="toggleTheme">
            <div>Theme:</div>
            <i class="fas fa-sun"></i>
          </div>
          <div v-show="isCelcius" class="header-unit" @click="toggleUnit">Unit: °C</div>
          <div v-show="!isCelcius" class="header-unit" @click="toggleUnit">Unit: °F</div>
        </div>
      </div>
      <nav class="flex align-center">
        <Tabs />
      </nav>
    </div>
  </header>
</template>

<script>
import Tabs from "./Tabs.vue";
export default {
  components: {
    Tabs,
  },
  data() {
    return {
      isDark:false
    };
  },
  computed:{
      isCelcius (){
        return this.$store.getters.isCelcius
    }
  },
  methods: {
    toggleUnit(){
      const isCelcius = !this.isCelcius
      this.$store.dispatch({ type: "updateUnit", isCelcius});
    },
    toggleTheme(){
      this.isDark=!this.isDark
      this.$emit('onToggleTheme', this.isDark)
    }
  }
};
</script>
