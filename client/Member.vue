


<template>
  <div class="inner">
    <hr>
    <div class="columns">
      <div class="column col-6">
        <h2>{{this.name}}</h2>
      </div>
      <div class="column col-6 averageChange" v-bind:class="{ green: averageChange>0, red: averageChange<0 }">
        <h2>{{this.averageChange}}%</h2>
      </div>
    </div>
    <div class="columns">
      <div class="column col-5"> </div>
      <div class="column col-2">
        <h5>Köp</h5>
      </div>
      <div class="column col-2">
        <h5>Sälj</h5>
      </div>
      <div class="column col-3"></div>
    </div>
    <Stock
          v-for="item in stocks"
          v-bind:key="item.name"
          :name="item.name"
          :change="item.change"
          :buyPrice="item.buyPrice"
          :lastPrice="item.lastPrice"/>

  </div>
</template>


<script>
import Stock from "./Stock.vue";

export default {
  components: {
    Stock
  },
  props: [
    "name",
    "averageChange",
    "stocks"],
};
</script>
