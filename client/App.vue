<template>
  <div class="container scroll"  >
    <div>
      <h1>Trade suggestions 😊</h1>
        <div v-if="data !== null && data.state === 'GO_GO_GO'">
          <Stock
            v-for="item in data.list"
            v-bind:key="item.name"
            :name="item.name"
            :change="item.change"
            :sellAt="item.sellAt"
            :expectedEarning="item.expectedEarning"
            :sellBefore="item.sellBefore"
            :luck="item.luck"
            :buy="item.buy"
            :red="item.red"
            :green="item.green" />
        </div>
        <div class="column col-12" v-if="data !== null && data.state === 'TRY_AGAIN_LATER'">
          <h2>There has likely not been any trading today 😞, please come back another day.</h2>
        </div>
        <div class="column col-12" v-if="data !== null && data.state === 'TO_EARLY'">
          <h2>You have to wait untill the market closes 17:30 to get a recomendation.</h2>
          <img src="/images/waiting.gif" class="image"/>
        </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stock from "./Stock.vue";

export default {
  components: {
    Stock
  },
  data () {
    return {
      data: null,
    }
  },
  async mounted() {
    try {
        const params = new URLSearchParams(window.location.search);
        const response = await axios.get("/api/info", { params });
        this.data = response.data;
      } catch (error) {
        console.log(`error: ${error.message}`);
      }
  },
  methods: {
  },
};
</script>
