<template>
  <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.Services"
			subHeading="message.Useourservices"
		>
		</emb-page-title>
        <v-data-table
      :headers="headers"
      :items="customerOrder"
      :items-per-page="15"
      :loading="loading"
      align="center"
    >
    <template v-slot:item.time ="{}">
      <p style="color:#4dc247; font-size:20px;" id="demo"></p>
    </template>
    </v-data-table>
   </div>
</template>

<script>
import DryCleaner from 'Api/DryCleaner';
import moment from "moment";
export default {
    data(){
        return{
            customerOrder: [],
            loading: false,
            headers: [
        {
          text: "First name",
          sortable: false,
          value: "firstname"
        },
        {
          text: "Last name",
          sortable: false,
          value: "lastname"
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
          text: "Clothes",
          sortable: false,
          value: "product"
        },
        {
          text: "Amount Paid",
          sortable: false,
          value: "amount"
        },
        {
          text: "Status",
          sortable: false,
          value: "status"
        },
        {
          text: "Time Left for delivery",
          sortable: false,
          value: "time"
        },
      ],
      timer: '',
      data1: '',
      date2: ''
        }
    },
    computed:{
       
    },
    methods: {
         countDown(){
// Set the date we're counting down to
let countDownDate = new Date("Jan 5, 2022 16:10:00").getTime();
// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();
  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let hours = Math.floor((distance % (1000 * 60 * 60 * 4)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML =  " Time expired if you didn't get your clothes call +250 788 125 096";
  }
  document.getElementById("demo").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";

}, 1000);
        }
    },
    async mounted(){
        this.countDown();
        this.loading = true;
    try {
        const res = await DryCleaner.getCustomerOrder(this.$route.params.trackNumber);
        this.customerOrder = res.data.data;
        this.loading = false;
        let prod = '';
        res.data.data.forEach(el => {
        const dat = moment(el.createdAt);
        const time = moment(el.createdAt);
        const tt = time.format("LT");
        const da = dat.format("L");
        const date = tt + "" + " " + da;
        el.products.forEach(pro => {
            prod += pro._id.name + ','
        });
        const product = prod.toString().replace(/,\s*$/, "");
        this.customerOrder.push({
          id: el._id,
          firstname: el.firstName,
          lastname: el.lastName,
          email: el.email,
          amount: el.totalAmountPaid,
          product: product,
          phone: el.phoneNumber,
          status: el.status.status,
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