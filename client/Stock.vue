


<template>
  <div class="outer" v-bind:class="{ buy: this.buy }">
    <div class="inner">
      <h2>{{this.name}}</h2>
      <div class="columns">
        <div class="column col-6">
          <h5>Today:</h5>
        </div>
        <div class="column col-6">
          <h5 v-bind:class="{ red: this.red, green: this.green }">{{this.change}}%</h5>
        </div>
      </div>
      <div class="columns" v-if="this.sellAt">
        <div class="column col-6">
          <h5>Sell for:</h5>
        </div>
        <div class="column col-6">
          <h5>{{this.sellAt}} SEK</h5>
        </div>
      </div>
      <div class="columns" v-if="this.expectedEarning">
        <div class="column col-6">
          <h5>Expected earning:</h5>
        </div>
        <div class="column col-6">
          <h5>{{this.expectedEarning}}%</h5>
        </div>
      </div>
      <div class="columns" v-if="this.sellBefore">
        <div class="column col-6">
          <h5>Order validity time:</h5>
        </div>
        <div class="column col-6">
          <h5>{{this.sellBefore}} days</h5>
        </div>
      </div>
      <div class="columns" v-if="this.luck">
        <div class="column col-6">
          <h5>Luck factor:</h5>
        </div>
        <div class="column col-6">
          <h5>{{this.luck}}%</h5>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: [
    "name",
    "change",
    "sellAt",
    "sellBefore",
    "luck",
    "buy",
    "expectedEarning",
    "red",
    "green"],
};
</script>
