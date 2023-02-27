<template>
	<div class="emb-register-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3  wrap align-center justify-center>
						
						<v-flex sm10 md12 lg8 xl7>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>{{$t('message.registerAsAgent')}}</h4>
								<v-form ref="form" v-model="valid">
									<v-text-field
										type="text"
										:placeholder="$t('message.firstname')"
										v-model="firstName"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										type="text"
										v-model="lastName"
										:placeholder="$t('message.lastname')"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										type="email"
										v-model="email"
										:placeholder="$t('message.yourEmail')"
										:rules="emailRules"
									>
									</v-text-field>
									<v-text-field
										type="number"
										v-model="phone"
										:placeholder="$t('message.yourPhone')"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-select
									label="Urashaka kuba umu agent umez'ate?"
									:items="agentType"
									v-model="type"
									@change="showSomeFields"
									>
									</v-select>
									<div v-if="show">
										<v-text-field
										type="text"
										:placeholder="$t('message.businessAddress')"
										v-model="address"
									>
									</v-text-field>
									<v-text-field
										type="number"
										:placeholder="$t('message.tinNumber')"
										v-model="tin"
									>
									</v-text-field>
									<v-file-input label="Shyiraho ipatante iri muri pdf" v-model="ipatante" accept="application/pdf"></v-file-input>
									</div>
									<v-text-field
										type="password"
										:placeholder="$t('message.yourPassword')"
										v-model="password"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										class="mb-4"
										type="password"
										:placeholder="$t('message.confirmPassword')"
										v-model="repassword"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<h4>{{$t('message.serviceFee')}}: 11800 RWF</h4>
									<v-btn :loading="loading" class="accent mx-0 mb-4" large  @click.stop.prevent="saveDetails">
										{{$t('message.register')}}
									</v-btn>
								</v-form>
							</div>
						</v-flex>
						
					</v-layout>
				</v-flex>
				<v-flex sm10 md5 lg8 xl7>
					<AkiraCalcultaion :akira="450" :fees="11800" :VAT="1800" class="component"/>
				</v-flex>
			</v-layout>
		</div>
   </div>
</template>
	
<script>
import agent from "Api/Agent";
import AkiraCalcultaion from '../components/Global/AkiraCalculation.vue'
// import department from "Api/department";
	export default{
		components:{
			AkiraCalcultaion
		},
   	data () {
      	return {
			  Departments: [],
			  items: ['SUPER-ADMIN', 'DEPARTMENT-ADMIN', 'CASHIER', 'AGENT', 'CLIENT'],
			  firstName: '',
			  lastName: '',
			  email: '',
			  role: 'AGENT',
			  phone:'',
			  password: '',
			  repassword: '',
			  data: '',
			  show: false,
			  type: '',
			  ipatante: '',
			  address: '',
			  tin: '',
			  loading: false,
			  agentType:[
				  {text: 'Agent unafite ibicuruzwa',value: 'fixed'},
				  {text: 'Agent utembera',value: 'mobile'},
			  ],
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
		  showSomeFields(){
			  if(this.type === 'fixed'){
				  this.show = true
			  }else{
				  this.show = false
			  }
		  },
         saveDetails(){
				this.$refs.form.validate();
				if(this.valid == true){
					this.signup()
					// console.log('askjhaskj')
					// this.$router.push('/session/signin');
            }	
			},
		 async signup () {
			 this.loading = true
           try {
			   const data = new FormData();
			   data.append("firstName",this.firstName);
			   data.append("lastName",this.lastName);
			   data.append("email", this.email);
			   data.append("phone", this.phone);
			   data.append("role", this.role);
			   data.append("password",this.password);
			   data.append("tin", this.tin);
			   data.append("ipatante", this.ipatante);
			   data.append("businessAddress", this.address);
			   data.append("type", this.type);
				const res = await agent.register(data);
				location.replace(res.data.data.meta.authorization.redirect);
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
<style scoped>
.component{
	margin: 30px 10px 10px 120px;
	width: 320px !important;
}
@media screen and (max-width:600px) {
	.component{
	margin: 30px 10px 10px 10px;
	width: 285px !important;
}
}
</style>