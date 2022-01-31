<template>
  <div class="emb-cart-wrap emb-card">
    <emb-page-title heading="message.cartHeading" subHeading="message.subHeadingCart"></emb-page-title>
    <div class="cart-content section-gap">
      <v-container grid-list-xl py-0>
        <div v-if="cart == ''" class="text-center">
          <div class="text-center">
            <div class="mb-6">
              <img alt="cart-empty" height="128" src="/static/images/empty-cart.png" width="128" />
            </div>
            <h4>{{$t("message.YourShoppingBagisempty")}}</h4>
            <router-link
              class="primary--text"
              :to="'/'+$i18n.locale+'/products/'"
            >{{$t("message.GotoShopping")}}</router-link>
          </div>
        </div>
        <div v-else class="cart-shop-list">
          <div class="emb-card mb-12 pa-6 white">
            <div v-for="(item, index) in cart" :key="index">
              <v-row class="cart-item-wrap">
                <v-col cols="12" sm="12" md="2" class="d-inline-flex align-center justify-center">
                  <img :src="item.image" alt="cart-item" width="100" />
                </v-col>
                <v-col cols="12" sm="6" md="4" class="d-inline-flex align-center justify-center">
                  <div class="text-center">
                    <h5 class="mb-1">{{item.name}}</h5>
                  </div>
                </v-col>
                <v-col cols="6" sm="3" md="2" class="d-inline-flex align-center justify-center">
                  <div class="d-flex">
                    <div class="d-flex" style="margin-top:20px;">
                      <button
                        class="cart-btn"
                        style="border-radius:3px 0 0 3px"
                        @click="increment"
                      >+</button>
                      <button
                        class="cart-btn"
                        style="border-radius:0 3px 3px 0"
                        @click="decrement"
                      >-</button>
                    </div>
                    <v-text-field
                      class="d-inline-block inputPrice"
                      type="number"
                      v-model="item.quantity"
                      min="1"
                      placeholder="Quantity"
                      id="itemsQuantity"
                      @keyup="itemsInTheCart()"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" sm="3" md="2" class="d-inline-flex align-center justify-center">
                  <h4 class="mb-0">
                    <emb-currency-sign></emb-currency-sign>
                    {{(item.quantity)*(item.price/currentValue).toFixed(2)}}
                  </h4>
                </v-col>
                <v-col
                  cols="2"
                  sm="2"
                  md="2"
                  class="res-float-icon d-inline-flex align-center justify-md-center justify-end"
                >
                  <a
                    class="accent--text remove-cart"
                    @click="deleteProductFromCart(item)"
                    href="javascript:void(0)"
                  >
                    <i class="material-icons font-weight-bold">close</i>
                  </a>
                </v-col>
              </v-row>
              <div class="text-center">
                <span v-if="item.command === true && appear === true" style="color: red; font-size: 25px;">{{$t('message.MessageCommand')}}</span>
              </div>
            </div>
          </div>
          <v-layout align-center justify-end>
            <vue-snotify></vue-snotify>
            <v-flex xs12 sm12 md5 lg5 xl5 py-0>
              <div class="layout align-center justify-space-between subtotal">
                <p>{{$t("message.Subtotal")}}</p>
                <span>
                  <emb-currency-sign></emb-currency-sign>
                  {{(itemTotal/currentValue).toFixed(2)}}
                </span>
              </div>
              <div class="layout align-center justify-space-between subtotal">
                <p>{{$t("message.discount")}}</p>
                <span>
                  <emb-currency-sign></emb-currency-sign>
                  {{itemsQuantity >11 ? ((itemTotal/currentValue*3)/100).toFixed(2):itemsInTheCart() > 11 ? ((itemTotal/currentValue*3)/100).toFixed(2):0}}
                </span>
              </div>
              <div class="layout align-center justify-space-between subtotal">
                <p>{{$t("message.Delivery")}}</p>
                <span>
                  <emb-currency-sign></emb-currency-sign>
                  {{(shipping/currentValue).toFixed(2)}}
                </span>
              </div>
              <div class="layout align-center justify-space-between subtotal">
                <p>{{$t("message.Vat")}}</p>
                <span>
                  <emb-currency-sign></emb-currency-sign>
                  {{vat}}
                </span>
              </div>
              <div class="layout align-center justify-space-between subtotal">
                <p>{{$t("message.Salary")}}</p>
                <span>
                  <emb-currency-sign></emb-currency-sign>
                  {{(refund).toFixed(2)}}
                </span>
              </div>
              <v-divider class="my-3"></v-divider>
              <div class="layout align-center justify-space-between subtotal layout-gap">
                <h4>{{$t("message.Total")}}</h4>
                <h4>
                  <emb-currency-sign></emb-currency-sign>
                  {{itemsQuantity >11 ? ((getTotalPrice/currentValue)-(itemTotal/currentValue*3)/100).toFixed(2):itemsInTheCart() > 11 ? ((getTotalPrice/currentValue)-(itemTotal/currentValue*3)/100).toFixed(2):(getTotalPrice/currentValue).toFixed(2)}}
                </h4>
              </div>
              <div class="layout justify-end subtotal">
                <v-btn
                v-if="show"
                :disabled="disabled"
                  large
                  class="accent mr-0"
                  :to="'/'+$i18n.locale+'/checkout/payment'"
                >{{$t('message.checkout')}}</v-btn>
                <v-btn
                v-if="show === false"
                  large
                  class="accent mr-0"
                  :to="'/'+$i18n.locale+'/checkout/payment'"
                >{{$t('message.checkout')}}</v-btn>
              </div>
            </v-flex>
          </v-layout>
          <emb-delete-confirmation
            ref="deleteConfirmationDialog"
            message="message.deleteCartProduct"
            @onConfirm="onDeleteProductFromCart"
          ></emb-delete-confirmation>
        </div>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import currency from "Api/currency";
export default {
  data() {
    return {
      selectDeletedProduct: null,
      total: null,
      headers: [
        {
          text: "Product",
          align: "left",
          sortable: false,
          value: "image"
        },
        { text: "Product Name", value: "name" },
        { text: "Product Quantity", value: "quantity" },
        { text: "Product Total", value: "total" },
        { text: "Remove", value: "remove" }
      ],
      currentValue: 1,
      disabled: false,
      appear: true,
      show: false,
      msg: 'check',
      placeholder: 'any kind'
    };
  },
  computed: {
    ...mapGetters(["cart", "selectedCurrency", "tax", "shipping"]),

    vat() {
      let productTotal = 0;
      let vat = 0;
      let cost = 0;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          if (item.payVat === true) {
            cost += item.cost * item.quantity;
            productTotal += item.price * item.quantity;
            vat += (productTotal - cost ) * 18/100
          } else {
            vat = 0;
          }
        }
      }
      return vat.toFixed(2);
    },
    itemTotal() {
      let productTotal = null;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          productTotal += item.price * item.quantity;
        }
        return productTotal.toFixed(2);
      } else {
        return productTotal.toFixed(2);
      }
    },
    refund() {
      let productTotal = null;
      let vat = 0;
      let taxOverProfit = 0;
      let grossProfit = 0;
      let profitAfterTax = 0;
      let totalCost = 0;
      let payVat = null;
      let refund = 0;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          productTotal += item.price * item.quantity;
          totalCost += item.cost * item.quantity;
          payVat = item.payVat;
        }
        grossProfit = productTotal - totalCost;
        if (payVat === true) {
          vat = (productTotal - totalCost) * 18 / 100;
        } else {
          vat = 0;
        }
        profitAfterTax = grossProfit - vat;
        taxOverProfit = (profitAfterTax * 3) / 100;
        refund = ((profitAfterTax - taxOverProfit) * 15) / 100;
        return refund;
      } else {
        return 0;
      }
    },
    itemsQuantity() {
      let items = null;
      for (const item of this.cart) {
        items += item.quantity;
      }
      return items;
    },
    getTotalPrice() {
      let totalPrice = this.tax + this.shipping;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          totalPrice += item.price * item.quantity;
        }
        return totalPrice.toFixed(2);
      } else {
        return totalPrice.toFixed(2);
      }
    }
  },
  created(){
    for (const item of this.cart) {
        if(item.command){
          this.show = true
          this.disabled = true
          this.appear = true
        }else {
          this.disabled = false
          this.appear = false
        }
      }
  },
  async mounted() {
    this.disabled = false
    try {
      const res = await currency.getcurrency();
      res.data.data.forEach(el => {
        if (this.selectedCurrency.symbol === el.symbol) {
          this.currentValue = el.currentValue;
        }
      });
      // console.log(res)
    } catch (err) {
      console.log(err.response.message);
    }
  },

  methods: {
    decrement(){
      for (const item of this.cart) {
        if(item.quantity > 1){
          item.quantity --
        }
        if(item.quantity < 20){
          if(item.command){
            this.disabled = true
            this.appear = true
          }
        }
      }
    },
    increment(){
      for (const item of this.cart) {
        item.quantity ++
        if(item.quantity > 19){
          if(item.command){
            this.disabled = false
            this.appear = false
          }
          
        }
      }
    },
    itemsInTheCart() {
      let items = 0;
      let isDisabled = false;
      for (const item of this.cart) {
        if(item.command){
          this.disabled = true
          isDisabled = true
        }else{
          this.disabled = false
          isDisabled = false
        }
        items += Number(item.quantity);
      }
      if(items > 19) {
        this.disabled = false;
      }
      const qty = Number(items);
      if(qty > 19 && isDisabled === true){
          this.disabled = false;
          this.appear = false;
          this.msg = 'Checkout'
      }else{
        this.disabled = true
        this.appear = true
      }
      return qty;
    },
    deleteProductFromCart(product) {
      this.$refs.deleteConfirmationDialog.openDialog();
      this.selectDeletedProduct = product;
      // console.log('shsajk', product)
    },
    onDeleteProductFromCart() {
      this.$refs.deleteConfirmationDialog.close();
      this.$snotify.error("Product Removing from cart", {
        closeOnClick: false,
        pauseOnHover: false,
        timeout: 1000
      });
      this.$store.dispatch(
        "onDeleteProductFromCart",
        this.selectDeletedProduct
      );
    }
  },
  watch: {
    getTotalPrice: function() {
      this.$store.state.totalPrice = this.getTotalPrice;
    }
  }
};
</script>
<style scoped>
.cart-btn {
  width: 20px;
  height: 30px;
  background-color: #ff7d00;
  color: #fff;
  border-radius: 1px solid #ff7d00;
}
.inputPrice >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice >>> input::-webkit-outer-spin-button,
.inputPrice >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>

