


<template>
  <div class="outer">
    <div class="columns">
      <div class="column col-5">
        <h5>{{this.name}}</h5>
      </div>
      <div class="column col-2">
        <h5>{{this.buyPrice}}</h5>
      </div>
      <div class="column col-2">
        <h5>{{this.lastPrice}}</h5>
      </div>
      <div class="column col-3 change" v-bind:class="{ green: change>0, red: change<0 }">
        <h5>{{this.change}} %</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: [
    "name",
    "change",
    "buyPrice",
    "lastPrice"],
};
</script>
