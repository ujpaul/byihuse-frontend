<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="Byiza"
			subHeading="message.Useourservices"
			subTitle="Akira Byiza"
		>
		</emb-page-title>
		<div class="delivery" style="margin:20px 10px 30px 10px;">
			<v-btn style="min-width: 45%; height: 60px" @click="cat1" :class="{accent: attached}">CATEGORY I </v-btn>
			<v-btn style="min-width: 54%; height: 60px" id="premium" @click="cat2" :class="{accent: !attached}">CATEGORY II</v-btn>
		</div>
		<div style="height: 400px; margin: 10px;overflow: scroll" class="d-flex" v-if="category1">
			<img src="/static/images/category1.jpg" alt="" width="75%" style="height:400px">
			<div style="width: 25%; margin-left: 10px;" v-if="show">
				<p><strong>Akira inzu tura muyawe</strong>
				FINVIA GROUP LTD brings you a chance to own affordable house.This category has a house of two levels, each level for only 50 millions rwandan francs(50, 000,000 RWF)<br/>
				Payment of house comes in three installments<br/>
				<b>Phase 1</b>: 16,666,666 RWF<br/>
				<b>Phase 2</b>: 16,666,666 RWF<br/>
				<b>Phase 3</b>: 16,666,666 RWF<br/>
				If you are interested get <a href="#" style="color: blue;"><u>Contract here</u></a> and request to be constructed you
				</p>
				<div style="width: 100%" class="text-center">
					<v-btn color="primary" @click="showForm()">Request House</v-btn>
					<v-btn color="accent" @click="showTrackingDiv()" style="margin-left: 10px;">Track Process</v-btn>
				</div>
				<akira-calcultaion :fees="50000000" :VAT="9000000" :akira="375000" style="margin:10px"/>
			</div>
			<div style="width: 25%; margin-left: 10px;" v-if="form1">
				<h3 class="ms-5">Requesting form</h3>
				<v-text-field :placeholder="$t('message.yourNames')" v-model="names" :rules="inputRules.basictextRules"></v-text-field>
				<v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" :rules="inputRules.basictextRules"></v-text-field>
				<v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" :rules="inputRules.emailRules"></v-text-field>
				<v-text-field :placeholder="$t('message.feePaid')" value="16,666,666 RWF" :rules="inputRules.emailRules" readonly></v-text-field>
				<v-file-input label="Upload Contract" v-model="contract" accept="application/pdf"></v-file-input>
				<div class="text-center">
					<v-btn :loading="loading" color="accent" @click="request('Category I')">Request</v-btn>
				</div>
			</div>
			<div v-if="tracking" style="margin-left: 10px;">
				<h5>Track construction Process</h5>
				<div class="d-flex">
					<div>
					<v-text-field label="Enter tracking number" v-model="truckNbr" outlined dense></v-text-field>
					<span style="color: red;" v-if="showError">This field is required</span>
				</div>
				<div>
                    <v-btn @click="search"  icon>
                     <v-icon>search</v-icon>
                    </v-btn>
				</div>
				</div>	
			</div>
		</div>	
		<div style="height: 400px; margin: 10px;overflow: scroll;" class="flex-d" v-if="category2">
			<img src="/static/images/category2.jpg" alt="" width="75%" style="height:400px">
			<div style="width: 25%; margin-left: 10px;" v-if="show">
				<p><strong>Akira inzu tura muyawe</strong>
				FINVIA GROUP LTD brings you a chance to own affordable house for only 15 millions rwandan francs(17,700,000 RWF)<br/>
				Payment of house comes in three installments<br/>
				<b>Phase 1</b>: 5,900,000 RWF<br/>
				<b>Phase 2</b>: 5,900,000 RWF<br/>
				<b>Phase 3</b>: 5,900,000 RWF<br/>
				If you are interested get <a href="#" style="color: blue;"><u>Contract here</u></a> and request to be constructed for you
				</p>
				<div style="width: 100%" class="text-center">
					<v-btn color="primary" @click="switchdiv()">Request House</v-btn>
					<v-btn color="accent" @click="showTrackingDiv()" style="margin-left: 10px;">Track Process</v-btn>
				</div>
				<akira-calcultaion :fees="17700000" :VAT="2700000" :akira="225000" style="margin:10px"/>
			</div>
			<div style="width: 25%; margin-left: 10px;" v-if="form">
				<h3 class="ms-5">Requesting form</h3>
				<v-text-field :placeholder="$t('message.yourNames')" v-model="names" :rules="inputRules.basictextRules"></v-text-field>
				<v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" :rules="inputRules.basictextRules"></v-text-field>
				<v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" :rules="inputRules.emailRules"></v-text-field>
				<v-text-field placeholder="Amount to be paid" value="5,900,000 RWF" :rules="inputRules.emailRules" readonly></v-text-field>
				<v-file-input label="Upload Contract" v-model="contract" accept="application/pdf"></v-file-input>
				<div class="text-center">
					<v-btn :loading="loading" color="accent" @click="request('Category II')">Request</v-btn>
				</div>
			</div>
			<div v-if="tracking" style="margin-left: 10px;">
				<h5>Track construction Process</h5>
				<div class="d-flex">
					<div>
					<v-text-field label="Enter tracking number" v-model="truckNbr" outlined dense></v-text-field>
					<span style="color: red;" v-if="showError">This field is required</span>
				</div>
				<div>
                    <v-btn @click="search"  icon>
                     <v-icon>search</v-icon>
                    </v-btn>
				</div>
				</div>	
			</div>
		</div>
   </div>
</template>

<script>
import housing from "Api/Housing";
import AkiraCalcultaion from '../components/Global/AkiraCalculation.vue'
export default {
components:{
	AkiraCalcultaion
},
  data() {
    return {
	loading: false,
	category1: false,
	category2: false,
	tracking: false,
	showError: false,
	truckNbr: '',
	form: false,
	form1: false,
	show: true,
	  email: '',
	  names: '',
	  contract: '',
	  phone: '',
      valid: false,
      contactInfo: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      inputRules: {
        basictextRules: [v => !!v || "This field should not be empty"]
	  },
    };
  },
  methods: {
	  showTrackingDiv(){
		  this.show = false;
		  this.form = false;
		  this.tracking = true;
	  },
	  cat1(){
		  this.category2 = false
		  this.category1 = !this.category1
		  this.show = true;
		  this.form = false;
		  this.tracking = false;
	  },
	  cat2(){
		  this.category1 = false
		  this.category2 = !this.category2
		  this.show = true;
		  this.form = false;
		  this.tracking = false;
	  },
	  switchdiv(){
		  this.show = false;
		  this.form = true;
	  },
	  showForm(){
		  this.show = false;
		  this.form1 = true;
	  },
	  search(){
        if(this.truckNbr === ''){
            this.showError = true
        }else{
            this.$router.push(`/${this.$i18n.locale}/track-construction-process/${this.truckNbr}`)
        }
        
    },
    async request(type){
        this.loading = true
        // if(this.names ==='' || this.phone ==='' || this.email === '' || this.contract === ''){
        //         this.$snotify.error('Validation error, complete required fields',{
        //             closeOnClick: false,
        //             pauseOnHover: false,
        //             timeout: 2000,
		// 			showProgressBar:false,
		// 		});
        //         this.loading = false
        // }else {
            let data = new FormData();
        data.append("names",this.names);
        data.append("phone",this.phone);
        data.append("email",this.email);
        data.append("type",type);
        data.append("status",'Phase 1');
        data.append("paymentOption","MOMO");
        data.append("contract",this.contract);
        try {
            const res = await housing.request(data)
            this.names = '';
            this.email = '';
            this.phone = '';
            this.type = '';
       location.replace(res.data.data.meta.authorization.redirect);
        } catch (error) {
            console.log(error);
            this.loading = false
        }
        // }
    },
    saveDetails() {
      this.$refs.form.validate();
    }
  }
};
</script>
<style scoped>
.flex-d{
	display: flex;
}
@media screen and(max-width:600px) {
	.flex-d{
		flex-direction: row;
	}
}
</style>
