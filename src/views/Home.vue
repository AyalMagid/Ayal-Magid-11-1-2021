<template>
  <div class="home">
    <b-modal v-model="modalShow">{{modalContent}}</b-modal>
    <div :class="`search-container flex space-between ${isDark?'dark-theme':''}`">
      <input
        ref="search"
        :class="`search-input ${isDark?'dark-theme':''}`"
        v-model="searchBy"
        @keyup.enter="setCurrLocation('',true)"
      />
      <div
        :class="`search-icon flex-center ${isDark?'dark-theme':''}`"
        @click="setCurrLocation('',true)"
      >
        <i class="fas fa-search"></i>
      </div>
    </div>
    <div class="home-main-container">
      <div class="home-top-container flex space-between align-center">
        <Loader v-show="isLoader" class="loader flex-center" />
        <div v-if="currDayWeather" class="city-name-temp-wrapper">
          <div class="city-name">{{location?location.name:''}}</div>
          <div class="city-temp">
            {{isCelcius? currDayWeather.Temperature.Metric.Value:currDayWeather.Temperature.Imperial.Value}}°
            {{isCelcius? currDayWeather.Temperature.Metric.Unit: currDayWeather.Temperature.Imperial.Unit}}
          </div>
        </div>
        <div v-show="!isLoader" class="add-remove-wrapper flex-center" @click="addOrRemoveFavorite">
          <div v-show="isFavorite" class="add-remove-icon">
            <i class="fas fa-heart"></i>
          </div>
          <div v-show="!isFavorite" class="add-remove-icon">
            <i class="far fa-heart"></i>
          </div>
          <button class="add-remove-btn">{{isFavorite? 'Remove':'Add'}}</button>
        </div>
      </div>
      <div v-if="currDayWeather" class="weather-title">
        {{currDayWeather.WeatherText}}
        <img
          class="weather-icon"
          :src="getImgUrl(currDayWeather.WeatherIcon)"
        />
      </div>
      <div v-if="dailyForecasts" class="weather-days-container flex space-between wrap">
        <div
          v-for="(dayForecast, idx) in dailyForecasts"
          :key="idx"
          class="day-forecast flex col justify-center align-center"
        >
          <div class="day-name">{{getDayByWord(new Date(dayForecast.Date).getDay())}}</div>
          <div
            class="day-temp"
          >{{`${dayForecast.Temperature.Minimum.Value}-${dayForecast.Temperature.Maximum.Value}°${dayForecast.Temperature.Minimum.Unit}`}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { weatherService } from "../services/weather-service.js";
import { geoLocationService } from "../services/geoLocation-service.js";
import { utilsService } from "../services/utils-service.js";
import { storageService } from "../services/storage-service.js";
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  props: ["isDark"],
  data() {
    return {
      searchBy: "",
      location: null,
      geoLocation: null,
      currDayWeather: null,
      dailyForecasts: null,
      isLoader: true,
      modalShow: false,
      modalContent: ""
    };
  },
  async created() {
    const favorites = storageService.loadFromStorage("weather-favorites");
    if (favorites) this.$store.dispatch({ type: "setFavorites", favorites });
    // location taken from url (when directed from favorites)
    const locationName = this.$route.params.location;
    // default is by device location
    if (!locationName)
      this.geoLocation = await geoLocationService.getGeoLocaion();
    this.setCurrLocation(locationName);
  },
  mounted() {
    this.$refs.search.focus();
  },
  computed: {
    isFavorite() {
      let isLocationFavorite;
      if (this.location && this.$store.getters.favorites.length)
        isLocationFavorite = this.$store.getters.favorites.find(
          f => f.id === this.location.id
        );
      return isLocationFavorite;
    },
    isCelcius() {
      return this.$store.getters.isCelcius;
    }
  },
  watch: {
    isCelcius: function(newValue, oldValue) {
      this.setCurrLocation(this.$route.params.location, true);
    }
  },
  methods: {
    getDayByWord(dayNum) {
      return utilsService.getDayByWord(dayNum);
    },
    getImgUrl(weatherIcon) {
      return require(`../assets/images/weather${weatherIcon}.png`);
    },
    async setCurrLocation(locationName, searched = false) {
      this.isLoader = false;
      // specific location is searched for
      if (searched) locationName = this.searchBy;
      // not a search, not from favorites => geolocation worked
      if (!searched && !locationName && this.geoLocation) {
        try {
          this.location = await weatherService.getLocationByGeoCoords(
            this.geoLocation
          );
        } catch {
          this.modalContent = "There was a problem getting your GEO location";
          this.modalShow = true;
        }
      } else {
        try {
          this.location = await weatherService.getLocationByName(locationName);
        } catch {
          this.modalContent =
            "There was a problem getting from the server the location";
          this.modalShow = true;
        }
      }

      this.location = {
        id: this.location.Key,
        name: this.location.AdministrativeArea.LocalizedName
      };
      this.searchBy = "";
      weatherService
        .getCurrentWeather(this.location.id)
        .then(dailyWeather => (this.currDayWeather = dailyWeather))
        .catch(err => {
          this.modalContent =
            "Server had a problem with getting today's weather";
          this.modalShow = true;
        });
      weatherService
        .getFiveDaysWeather(this.location.id, this.isCelcius)
        .then(fiveDaysWeather => (this.dailyForecasts = fiveDaysWeather))
        .catch(err => {
          this.modalContent =
            "Server had a problem with getting 5 days today's weather";
          this.modalShow = true;
        });
    },

    addOrRemoveFavorite() {
      let updatedFavorites = this.$store.getters.favorites.slice();
      if (this.isFavorite) {
        const idx = updatedFavorites.findIndex(f => f.id === this.location.id);
        updatedFavorites.splice(idx, 1);
      } else {
        updatedFavorites.push({ ...this.location });
      }
      storageService.saveToStorage("weather-favorites", updatedFavorites);
      this.$store.dispatch({ type: "updateFavorites", updatedFavorites });
    }
  },
  components: {
    Loader
  }
};
</script>


 