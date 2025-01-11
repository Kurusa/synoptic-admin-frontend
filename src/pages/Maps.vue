<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import { fetchCitiesStats } from "@/api/dashboard";

export default {
  name: "MapView",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  methods: {
    async loadCitiesOnMap() {
      try {
        const cities = await fetchCitiesStats();

        if (cities.length > 0) {
          const bounds = [];
          cities.forEach((city) => {
            const marker = L.marker([city.lat, city.lon]).addTo(this.map);
            marker.bindPopup(`<b>${city.name}</b><br>Users: ${city.userCount}`);
            this.markers.push(marker);
            bounds.push([city.lat, city.lon]);
          });

          this.map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Error loading cities:", error);
      }
    },
    initializeMap() {
      this.map = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
  },
  async mounted() {
    this.initializeMap();
    await this.loadCitiesOnMap();
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
