<template>
	<div id="viewDiv">
	</div>
</template>

<script>
export default {
  mounted() {
    require(["esri/config", "esri/Map", "esri/views/MapView"], function(
      esriConfig,
      Map,
      MapView
    ) {
      esriConfig.apiKey = "YOUR_API_KEY";
      const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
      });
      const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
      });
    });
  }
};
</script>

<style lang='scss' scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>