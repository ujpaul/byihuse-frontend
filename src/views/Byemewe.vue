<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.Services"
			subHeading="message.Useourservices"
            subTitle="Akira Byemewe"
		>
		</emb-page-title>
        <div class="delivery" style="margin:20px 10px 30px 10px;">
			<v-btn style="min-width: 45%; height: 60px" @click="registerAsLawyer" :class="{accent: attached}">{{$t("message.RegisterAsLawyer")}} </v-btn>
			<v-btn style="min-width: 54%; height: 60px" id="premium" @click="findLawyers" :class="{accent: !attached}">{{$t("message.FindLawyers")}} </v-btn>
		</div>
        <v-flex xs12 sm12 md6 lg6 xl8>
            <div class="mt-5"> 
                <v-card style="margin-left: 20px;">
                    <div class="text-center" style="margin-left: 20px;">
                        <v-card-text v-if="registerLawyer">
                        <v-form  ref="form" v-model="valid">
                        <v-text-field :placeholder="$t('message.yourNames')" v-model="names" :rules="inputRules.basictextRules"></v-text-field>
                        <v-text-field @keyup="checkInvalidId" :placeholder="$t('message.idNumber')" v-model="idnbr" :rules="inputRules.basictextRules" type="number"></v-text-field>
                        <small style="color: red;" v-if="invalidIdNumber">Invalid id number</small>
                        <v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" :rules="inputRules.basictextRules"></v-text-field>
                        <v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" :rules="inputRules.emailRules"></v-text-field>
                        <v-select :items="types" :label="$t('message.typeOfLawyer')" v-model="type"></v-select>
                        <v-text-field :placeholder="$t('message.province')" v-model="province" :rules="inputRules.basictextRules"></v-text-field>
                        <v-text-field :placeholder="$t('message.district')" v-model="district" :rules="inputRules.basictextRules"></v-text-field>
                        <v-file-input show-size label="Upload your cv(pdf)" v-model="document" accept="application/pdf"></v-file-input>
                        <v-file-input show-size label="Upload photo passport" v-model="image" accept="image/*"></v-file-input>
                        
                    <h5>Registration fees: 6000 RWF</h5>
                    <v-checkbox
                    :label="$t('message.termAndCondition')"
                    v-model="terms"
                    @click="toggleEnableDisable()"
                    ></v-checkbox>
                        <v-btn :loading="loading" class="accent" large @click="register" :disabled="isDisabled">{{$t('message.Submit')}}</v-btn>
                        </v-form>
                        
                    </v-card-text>
                    </div>
               
                </v-card>
                <v-container style="margin: 10px 10px 100px 0;" v-if="searchLawyers">
                    <div style="width: 49%">
                        <v-select :items="types" :label="$t('message.typeOfLawyer')" v-model="type" @change="selectLawyer = false"></v-select>
                        <span style="color: red" v-if="selectLawyer">*this field is required</span>
                    </div>
                     <v-flex xs12 sm12 md6 lg7 xl5  search-v3-wrap>
                           <input class="input" v-on:keyup.enter="search" style="width:85%;height:48px;"  v-model="keyword" type="text" :placeholder="$t('message.searchByDistrict')">
                           <v-btn @click="search"  icon>
                              <v-icon>search</v-icon>
                           </v-btn>
                     </v-flex>
               </v-container>
            </div>
        </v-flex>
   </div>
</template>
<style scoped>
.input{
    border: 1px #EEEEEE solid;
    padding-left: 10px;
    background: #f5f5f5;
}
#services{
    position: relative;
    bottom: 10px;
}
.mainSerices{
    display: flex;
}
.asideServices{
    /* background: grey; */
    /* height: 400px; */
    width: 100%;
}
/* #idCard{
    height: 100%;
} */
#navig{
    background: #EEEEEE;
}
#servicesId{
    font-size: 17px;
}
@media screen and (max-width: 1279px){
    #idCard{
        display: none;
    }
    .forSmall{
        /* display: none; */
        position: relative;
        top: 100px;
    }
    .thisOneTry{
        position: relative;
        top: 100px;
    }
}
@media screen and (min-width: 1279px){
    .forSmall, .toggleBtn{
        display: none;
    }
}
</style>
<script>
import lawyers from 'Api/Lawyers';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        loading: false,
        registerLawyer: false,
        isDisabled: true,
        terms: false,
        invalidIdNumber: false,
        searchLawyers: false,
        keyword: '',
        valid: false,
        names: "",
        idnbr: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        document: '',
        image: '',
        type: '',
         selectLawyer: false,
        types:[
            {text:'Noteri', value:'noteri'},
            {text:'Umwungnizi mumategeko', value:'umunyamategeko'},
            {text:"Umuhesha w'inkiko", value:'umuhesha'},
        ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      inputRules: {
        basictextRules: [v => !!v || "This field should not be empty"]
      },
      servicesName: [],
      selectedServices: {
                id: '',
                sectitle: "",
                subtitle: "",
                paragraph: "",
                productGallery: {}
      },
        selectedPreviewImage:'',
      symbol: false,
      currentValue:1,
      label:{}
    };
  },
  mounted() {
  },
  methods: {
      checkInvalidId(){
        if(this.idnbr.length !== 16){
            this.invalidIdNumber = true
        }
        else{
            this.invalidIdNumber = false
        }
      },
    async register(){
        this.loading = true
        if(this.names === '' || this.phone === '' || this.idnbr === "" || this.email == '' || this.province === '' || this.district == '' || this.type === '' || this.document == '' || this.image === ''){
            this.$snotify.error('Validation error, complete required fields',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 2000,
					showProgressBar:false,
				});
                this.loading = false
        }
         else{
             let data = new FormData();
        data.append("names",this.names);
        data.append("phoneNumber",this.phone);
        data.append("phone",this.idnbr);
        data.append("email",this.email);
        data.append("province",this.province);
        data.append("district",this.district);
        data.append("type",this.type);
        data.append("paymentOption","MOMO");
        data.append("document",this.document);
        data.append("image",this.image);
        try {
            const res = await lawyers.register(data)
            this.names = '';
            this.idnbr = '';
            this.email = '';
            this.phone = '';
            this.province = '';
            this.district = '';
            this.type = '';
            console.log(res);
       location.replace(res.data.data.meta.authorization.redirect);
        } catch (error) {
            console.log(error);
            this.loading = false
        }
         }
        
    },
      toggleEnableDisable() {
          if(this.terms === false){
              this.isDisabled = true
          }else{
            this.isDisabled = false
          }
      },
      registerAsLawyer() {
          this.searchLawyers = false
          this.registerLawyer = !this.registerLawyer
      },
      findLawyers(){
          this.registerLawyer = false;
          this.searchLawyers = !this.searchLawyers
      },
    saveDetails() {
      this.$refs.form.validate();
    },
    search(){
        if(this.type === ''){
            this.selectLawyer = true
        }else{
            this.$router.push(`/${this.$i18n.locale}/lawyers/${this.keyword}/${this.type}`)
        }
        
    }
  },
  computed: {
      ...mapGetters(["linksformbackend","selectedLocale","selectedCurrency"])
  }
};
</script>

