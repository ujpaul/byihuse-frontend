<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="Byiza"
			subHeading="message.Useourservices"
			subTitle="Akira Byiza"
		>
		</emb-page-title>
        <v-data-table
      :headers="headers"
      :items="customerOrder"
      :items-per-page="15"
      :loading="loading"
      align="center"
    >
    <template v-slot:item.left ="{item }">
        <p style="color: red;">{{item.category = 'Category I' ? 26000000 - item.totalPaid : 15000000 - item.totalPaid}} RWF</p>
    </template>
    <template v-slot:item.totalPaid ="{item}">
        <p style="color: green">{{item.totalPaid}} RWF</p>
    </template>
    </v-data-table>
    <div class="mt-5 mb-5 text-center">
        <v-btn color="primary" @click="callDialog1" v-if="cat1">{{text}}</v-btn>
        <v-btn color="primary" @click="callDialog2" v-if="cat2">{{text}}</v-btn>
    </div>
    <v-dialog
      v-model="dialog1"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{title}}
        </v-card-title>

        <v-card-text>
          <v-text-field :placeholder="$t('message.yourNames')" v-model="names" readonly></v-text-field>
		<v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" readonly></v-text-field>
		<v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" readonly></v-text-field>
		<v-text-field placeholder="Amount to be paid" value="8,700,000 RWF" readonly></v-text-field>
		<div class="text-center">
			<v-btn color="accent" @click="request('Category I')">Request</v-btn>
		</div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{title}}
        </v-card-title>

        <v-card-text>
          <v-text-field :placeholder="$t('message.yourNames')" v-model="names"></v-text-field>
		<v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone"></v-text-field>
		<v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email"></v-text-field>
		<v-text-field placeholder="Amount to be paid" value="8,700,000 RWF" readonly></v-text-field>
		<div class="text-center">
			<v-btn :loading="load" color="accent" @click="request()">Request</v-btn>
		</div>
        </v-card-text>
      </v-card>
    </v-dialog>
   </div>
</template>

<script>
import Housing from 'Api/Housing';
import moment from "moment";
export default {
    data(){
        return{
            customerOrder: [],
            loading: false,
            headers: [
        {
          text: "Names",
          sortable: false,
          value: "names"
        },
        {
          text: "Email",
          sortable: false,
          value: "email"
        },
        {
          text: "Phone Number",
          sortable: false,
          value: "phone"
        },
        {
          text: "House Category",
          sortable: false,
          value: "type"
        },
        {
          text: "Amount Paid",
          sortable: false,
          value: "totalPaid"
        },
        {
          text: "Amount Left",
          sortable: false,
          value: "left"
        },
        {
          text: "Status",
          sortable: false,
          value: "status"
        },
      ],
      text: '',
      dialog1: false,
      dialog2: false,
      cat1: '',
      cat2: '',
      title: '',
      names: '',
      email: '',
      phone: '',
      type: '',
      status: '',
      trackNumber: '',
      load: false
        }
    },
    computed:{
       
    },
    methods: {
        callDialog1(){
            this.dialog1 = true
        },
        callDialog2(){
            this.dialog2 = true
        },
        async request(){
        this.load = true
        // if(this.names ==='' || this.phone ==='' || this.email === '' || this.contract === ''){
        //         this.$snotify.error('Validation error, complete required fields',{
        //             closeOnClick: false,
        //             pauseOnHover: false,
        //             timeout: 2000,
		// 			showProgressBar:false,
		// 		});
        //         this.loading = false
        // }else {
            let data = {
                names: this.names,
                email: this.email,
                phone: this.phone,
                status: this.status,
                type: this.type,
                trackNumber: this.trackNumber,
                paymentOption: 'MOMO'
            }
        try {
            const res = await Housing.requestHouse(data)
            this.names = '';
            this.email = '';
            this.phone = '';
            this.type = '';
       location.replace(res.data.data.meta.authorization.redirect);
        } catch (error) {
            console.log(error);
            this.load = false
        }
        // }
    },
    },
    async mounted(){
        this.loading = true;
    try {
        const res = await Housing.getConstructionProcess(this.$route.params.trackNumber);
        this.customerOrder = res.data.data;
        this.loading = false;
        res.data.data.forEach(el => {
        const dat = moment(el.createdAt);
        const time = moment(el.createdAt);
        const tt = time.format("LT");
        const da = dat.format("L");
        const date = tt + "" + " " + da;
        this.names = el.names;
        this.email = el.email;
        this.phone = el.phone;
        this.trackNumber = el.trackNumber;
        if(el.paymentStatus === 'Phase 1 Fully Paid'){
            this.text = 'Pay Phase 2'
            this.status = 'Phase 2'
            this.title = 'Form to pay Phase 2 for your house'
        }else{
            this.text = 'Pay Last Phase'
            this.status = 'Phase 3'
            this.title = 'Form to pay last Phase for your house'
        }
        if(el.category === 'Category I'){
            this.cat1 = true;
            this.cat2 = false;
            this.type = 'Category I'
        }else{
            this.cat2 = true;
            this.cat1 = false;
            this.type = 'Category II'
        }
        this.customerOrder.push({
          id: el._id,
          names: el.names,
          email: el.email,
          totalPaid: el.totalPaid,
          phone: el.phone,
          type: el.type,
          status: el.paymentStatus,
          date: date,
        });
      });
    } catch (error) {
        console.log(error);
    }
    this.customerOrder.splice(0, 1);
}

}
</script>

<style>

</style>