<template>
  <div class="container scroll"  >
    <div>
      <h1>Aktie utmaningen!</h1>
        <div v-if="data !== null && data.state === 'GO_GO_GO'">
          <Member
            v-for="item in data.list"
            v-bind:key="item.name"
            :name="item.name"
            :stocks="item.stocks"
            :averageChange="item.averageChange" />
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Member from "./Member.vue";

export default {
  components: {
    Member
  },
  data () {
    return {
      data: null,
    }
  },
  async mounted() {
    try {
        const response = await axios.get("/api/info");
        this.data = response.data;
      } catch (error) {
        console.log(`error: ${error.message}`);
      }
  },
  methods: {
  },
};
</script>
