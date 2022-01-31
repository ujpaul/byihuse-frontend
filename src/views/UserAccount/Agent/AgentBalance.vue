<template>
  <div class="editInfo-wrap emb-card pa-4">
    <div class="text-center justify-content-center">
      <img src="static/images/user-wallet.jpg" />
      <h1>{{balance ? balance.toFixed(2): 0}} RWF</h1>
    </div>
  </div>
</template>

<script>
import customerRefund from "Api/Agent.js";
export default {
  data() {
    return {
      balance: ""
    };
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  created() {
    this.getBalance();
  },
  methods: {
    async getBalance() {
      const json = localStorage.getItem("data");
      const data = JSON.parse(json);
      const id = data.id;
      let balance = 0;
      const res = await customerRefund.getBalance(id);
      res.data.data.forEach(el => {
        balance += parseInt(el.agentData.balance);
      });
      this.balance = balance;
    }
  }
};
</script>