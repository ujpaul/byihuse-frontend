<template>
  <div class="editInfo-wrap emb-card pa-4">
    <div class="text-center justify-content-center">
      <img src="static/images/user-wallet.jpg" />
      <h1>{{refund ? refund : 0}} RWF</h1>
    </div>
  </div>
</template>

<script>
import customerRefund from "Api/Customer.js";
export default {
  data() {
    return {
      refund: ""
    };
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  created() {
    this.getUserRefund();
  },
  methods: {
    async getUserRefund() {
      const json = localStorage.getItem("data");
      const data = JSON.parse(json);
      const id = data.id;
      let refund = 0;
      const res = await customerRefund.getSingleCustomerRefund(id);
      res.data.data.forEach(el => {
        refund += parseInt(el.refund);
      });
      this.refund = refund;
    }
  }
};
</script>