<template>
  <div id="app" :class="isDark ? 'dark-theme' : ''">
    <AppHeader @onToggleTheme="toggleTheme" />
    <router-view :isDark="isDark" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  data() {
    return {
      isDark: false
    };
  },
  methods: {
    toggleTheme(isDark) {
      this.isDark = isDark;
    }
  },
  components: {
    AppHeader
  }
};
</script>
