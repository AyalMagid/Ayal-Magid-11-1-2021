<template>
  <div class="favorites-list">
    <div class="favorites-list-container">
      <div class="favorites-list-inside-wrapper flex space-between wrap">
      <div v-for="(favorite, idx) in favoritesWeather" :key="idx" class="favorite-container flex col align-center jusify-center space-between" @click="changeRoute(favorite)">
          <div class="city-name">{{favorite.name}}</div>
          <img class="weather-icon" :src="getImgUrl(favorite.WeatherIcon)"/>
          <div class="weather-desc">{{favorite.WeatherText}}</div>
          <div class="city-temp">{{`${favorite.Temperature.Metric.Value}°${isCelcius? favorite.Temperature.Metric.Unit: favorite.Temperature.Imperial.Unit}`}}</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["favoritesWeather","isCelcius"],
  data() {
    return {};
  },
  created() {},
  methods: {
    changeRoute(favorite){
      console.log(favorite.name)
      this.$router.push({ path: `/${favorite.name}`})
    },
    getImgUrl(weatherIcon) {
    return require(`../assets/images/weather${weatherIcon}.png`)
  }
  }
};
</script>
