<template>
	<div class="emb-register-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3  wrap align-center justify-center>
						
						<v-flex sm10 md5 lg6 xl6>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>Emeza ko wakiriye commande yawe</h4>
								<v-form ref="form" v-model="valid">
									<v-text-field
										type="text"
										placeholder="Names*"
										v-model="names"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										type="email"
										v-model="email"
										placeholder="Email*"
										:rules="emailRules"
									>
									</v-text-field>
									<v-text-field
										type="number"
										v-model="phone"
										placeholder="phone number*"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
									label="Andika izina ry'ukuzaniye commande*"
									v-model="umukozi"
									>
									</v-text-field>
									<v-text-field
										type="text"
										placeholder="Izina rya commande*"
										v-model="product"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-btn :loading="loading" class="accent mx-0 mb-4" large  @click.stop.prevent="saveDetails">
										Ohereza
									</v-btn>
								</v-form>
							</div>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
   </div>
</template>
	
<script>
import command from "Api/Command";
// import department from "Api/department";
	export default{
   	data () {
      	return {
			  Departments: [],
			  items: ['SUPER-ADMIN', 'DEPARTMENT-ADMIN', 'CASHIER', 'AGENT', 'CLIENT'],
			  names: '',
			  email: '',
			  phone:'',
			  product: '',
			  umukozi: '',
			  loading: false,
         	valid: false,
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
      		],
          	inputRules: {
			   basictextRules: [v => !!v || 'This field should not be empty'],
            }
         }
      },
      methods: {
         saveDetails(){
				this.$refs.form.validate();
				if(this.valid == true){
					this.confirmCommand()
            }	
			},
		 async confirmCommand () {
			 this.loading = true
           try {
			   const data = {
                   names: this.names,
                   email: this.email,
                   phone: this.phone,
                   product: this.product,
                   operatorNames: this.umukozi
               }
				const res = await command.confirmReceivedCommand(data);
				this.loading = false
                this.names = ''
                this.email = ''
                this.phone = ''
                this.product = ''
                this.umukozi = ''
			this.$snotify.success(`${res.data.message}`,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 1000,
					showProgressBar:false,
				});
			} catch (err) {
				this.loading = false
				console.log(err)
			}
		}
	},
	}
</script>