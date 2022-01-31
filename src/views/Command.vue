<template>
  <v-app class="pt-4">
      <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg6 xl8>
                <div class="mt-5 pb-5">
              <img src="/static/images/logo/first-slide.jpg" alt="" width="600" height="500">
          </div>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl8>
          <div class="mt-5"> 
              <h3 style="color: #ff7d00;">{{$t("message.commande")}}</h3>
              <v-card>

        <v-card-text>
            <v-form  ref="form" v-model="valid">
            <v-text-field :placeholder="$t('message.yourNames')" v-model="names" :rules="inputRules.basictextRules"></v-text-field>
            <v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" :rules="inputRules.basictextRules"></v-text-field>
            <v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" :rules="inputRules.emailRules"></v-text-field>
            <v-text-field :placeholder="$t('message.yourProduct')" v-model="product" :rules="inputRules.basictextRules"></v-text-field>
            <v-textarea
          solo
          name="input-7-4"
          :label="$t('message.details')"
          v-model="details"
          :rules="inputRules.basictextRules"
        ></v-textarea>
            <v-btn :loading="loading" class="accent" large @click="makeCommand">{{$t('message.Submit')}}</v-btn>
            </v-form>
            
        </v-card-text>
      </v-card>
          </div>
            </v-flex>
          </v-layout> 
        </v-container>    
  </v-app>
</template>

<script>
import Command from "Api/Command";
export default {
    data(){
        return{
            names:'',
            phone:'',
            email:'',
            product:'',
            details:'',
            amount: '',
            valid: false,
            loading: false,
            inputRules: {
        basictextRules: [
          v => !!v || "This field should not be empty",
          ],
          emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
	  },
        }
    },
    methods: {
        async makeCommand(){
            this.loading=true
            if(this.names ==='' || this.phone ==='' || this.email === '' || this.product === '' || this.details ===''){
                this.$snotify.error('Validation error try again',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 2000,
					showProgressBar:false,
				});
                this.loading = false
            }
            else{
                try {
		  const res = await Command.makeCommand({
			   names: this.names,
			   phone: this.phone,
			   email:this.email,
			   product: this.product,
			   details: this.details,
               amount: this.amount
			   })
		//   console.log()
		  this.$snotify.success(`${res.data.message}`,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 3000,
					showProgressBar:false,
				});
                this.names = ''
                this.phone = ''
                this.email = ''
                this.product = ''
                this.details = ''
                this.amount = ''
				this.loading=false
	  } catch (err) {
		  console.log(err)
		  this.loading=false
	  }

            }
      
        },
        saveDetails() {
      this.$refs.form.validate();
    }
    }

}
</script>

<style>

</style>