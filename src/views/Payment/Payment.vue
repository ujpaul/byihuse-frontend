<template>
   <div class="emb-payment-wrap">
		<emb-page-title heading="message.PaymentInformation"></emb-page-title>
		<div class="emb-payment-content section-gap overflow-x-hidden">
			<v-container grid-list-xl py-0>
				
				<template v-if="cart.length > 0">
					<div class="delivery" style="margin-bottom: 30px">
							<v-btn style="min-width: 45%; height: 60px" @click="freedelivery" :class="{accent: attached}">{{$t("message.FreeDelivery")}} <small>({{$t("message.productsinfewhours")}})</small></v-btn>
							<v-btn style="min-width: 54%; height: 60px" id="premium" @click="premiumdelivery" :class="{accent: !attached}">{{$t("message.PremiumDelivery")}} - <emb-currency-sign></emb-currency-sign>{{(3000/currentValue).toFixed(2)}} <small>({{$t("message.productsinfewhours")}})</small></v-btn>
						</div>
					<div class="deliveryNavigation">
						
						<div class="Navigation">
							<emb-sidebar-panel class="mb-12"></emb-sidebar-panel>	
						</div>
					</div>
					<v-expansion-panels v-model="panel" multiple >
						<v-expansion-panel>
							<shipping-address @changeStepOneForm="enableStepOneForm"></shipping-address>
						</v-expansion-panel>
						<v-expansion-panel :disabled="!stepOneFormValid" :class="{'contracted': !stepOneFormValid}">
							<promo-codes @changePanel="changePanelValue"></promo-codes>
						</v-expansion-panel>
						<v-expansion-panel :disabled="!stepOneFormValid" :class="{'contracted': !stepOneFormValid}">
							<payment-option></payment-option>
						</v-expansion-panel>
					</v-expansion-panels>	
				</template>
				<template v-else>
					<div class="text-center">
						<div class="mb-6">
							<img  alt="cart-empty" height="128" src="/static/images/empty-cart.png" width="128">
						</div>
						<h4 > {{$t("message.YourShoppingBagisempty")}}</h4>
						<router-link class="primary--text" :to="'/'+$i18n.locale+'/products'">{{$t("message.GotoShopping")}}</router-link>
					</div>
				</template>
			</v-container>
		</div>
   </div>
</template>

<script>
import ShippingAddress from './Component/ShippingAddress'
import PromoCodes from './Component/PromoCodes'
import PaymentOption from './Component/PaymentOption'
import currency from "Api/currency";
import { mapGetters } from 'vuex';

export default {
	data(){
		return{
			stepOneFormValid: false,
			expansionPanel: [0],
			attached: true,
			currentValue:1
		}
	},
	components:{
		shippingAddress:ShippingAddress,
		promoCodes:PromoCodes,
		paymentOption:PaymentOption
	},
	computed: {
		...mapGetters(["cart","selectedCurrency", "drawer"]),
		panel: {
			get() {
				return this.expansionPanel;
			},
			set(val) {
				if(val.includes(0)){
					this.expansionPanel = [0];
					this.stepOneFormValid = false;
				}else if(val.includes(1) && this.expansionPanel != 1){
					this.expansionPanel = [1];
				}else if(val.includes(2)){
					this.expansionPanel = [2];
				}else{
					this.expansionPanel= [];
				}
			}
		}
	},
	async mounted (){
			try {
				const res= await currency.getcurrency()
				res.data.data.forEach(el => {
					if (this.selectedCurrency.symbol === el.symbol) {
						this.currentValue= el.currentValue
					}
				});
				// console.log(res)
			} catch (err) {
				console.log(err.response.message)
			}
	},
	methods: {
		enableStepOneForm(){
			this.stepOneFormValid = true;
			this.expansionPanel = [1];
		},
		changePanelValue(){
			this.expansionPanel = [2];
		},
		freedelivery(){
			this.attached= true
			this.$store.state.shipping= 0
		},
		premiumdelivery(){
			this.attached= false
			if(this.$store.state.shipping === 3000){
				this.$store.state.shipping= 0
			}else{
				this.$store.state.shipping = 3000;
			}
			// console.log('helo')
		}
	}
}
</script>
<style  scoped>
.deliveryNavigation{
	display: flex;
	/* justify-content: end; */
}
.delivery{
	flex: 1;
}
.Navigation{
	flex: 1;
}

</style>