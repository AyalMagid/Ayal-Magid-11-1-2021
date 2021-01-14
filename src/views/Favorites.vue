<template>
  <div class="favorties">
    <main>
      <b-modal v-model="modalShow">There was a problem getting from the server the forecasts</b-modal>
      <favoritesList
        v-if="favoritesWeather"
        :favoritesWeather="favoritesWeather"
        :isCelcius="isCelcius"
      />
      <div
        v-else
        class="favorites-list-container none-fav-msg"
      >You dont have any city in your favorites!</div>
    </main>
  </div>
</template>

<script>
import { weatherService } from "../services/weather-service.js";
import favoritesList from "@/components/FavoritesList.vue";

export default {
  name: "Favorites",
  data() {
    return {
      favorites: this.$store.getters.favorites,
      favoritesWeather: null,
      dailyForecasts: null,
      modalShow: false
    };
  },
  created() {
    this.getForecasts();
  },
  computed: {
    isCelcius() {
      return this.$store.getters.isCelcius;
    },
    watch: {
      isCelcius: function(newValue, oldValue) {
        this.getForecasts();
      }
    }
  },
  methods: {
    getDayByWord(dayNum) {
      return utilsService.getDayByWord(dayNum);
    },
    async getForecasts() {
      if (this.favorites.length) {
        const favoritesWeather = await this.favorites.map(async favorite => {
          try {
            const favoriteWeatherObj = await weatherService.getCurrentWeather(
              favorite.id
            );
            favoriteWeatherObj.name = favorite.name;
            return favoriteWeatherObj;
          } catch (err) {
            this.modalShow = true;
          }
        });
        Promise.all(favoritesWeather).then(favoritesWeather => {
          this.favoritesWeather = favoritesWeather;
        });
      }
    }
  },
  components: {
    favoritesList
  }
};
</script>


