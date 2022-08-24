<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.Services"
			subHeading="message.Useourservices"
            subTitle="Akira Byizewe"
		>
		</emb-page-title>
        <div class="delivery" style="margin:20px 10px 30px 10px;">
			<v-btn style="min-width: 45%; height: 60px" @click="registerAsLawyer" :class="{accent: attached}">{{$t("message.RegisterAsTechnician")}} </v-btn>
			<v-btn style="min-width: 54%; height: 60px" id="premium" @click="findLawyers" :class="{accent: !attached}">{{$t("message.FindTechinician")}} </v-btn>
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
                        <v-select :items="types" :label="$t('message.typeOfTechnician')" v-model="type"></v-select>
                        <v-select :items="levels" label="Level" v-model="level"></v-select>
                        <v-file-input :label="$t('message.Cv')" v-model="cv" accept="application/pdf"></v-file-input>
                        <v-file-input :label="$t('message.Diploma')" v-model="diploma" accept="application/pdf"></v-file-input>
                        <v-file-input :label="$t('message.PreviousWork')" v-model="previous" accept="image/*"></v-file-input>
                        <v-file-input :label="$t('message.Photo')" v-model="passport" accept="image/*"></v-file-input>
                        
                    <h5>{{$t('message.serviceFee')}}: 6000 RWF</h5>
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
                <v-card style="margin-left: 20px;">
                    <div class="text-center" style="margin-left: 20px;">
                        <v-card-text v-if="requestTechnician">
                        <v-form  ref="form" v-model="valid">
                        <v-text-field :placeholder="$t('message.yourNames')" v-model="names" :rules="inputRules.basictextRules"></v-text-field>
                        <v-text-field :placeholder="$t('message.yourPhone')" type="number" v-model="phone" :rules="inputRules.basictextRules"></v-text-field>
                        <v-text-field :placeholder="$t('message.yourEmail')" type="email" v-model="email" :rules="inputRules.emailRules"></v-text-field>
                        <v-select :items="types" :label="$t('message.typeOfTechnician')" v-model="type" @change="changeTechnician"></v-select>
                        <v-select v-if="appear" :items="specialist" label="Specialist" v-model="type"></v-select>
                        <v-select :items="experience" :label="$t('message.ExperienceNeeded')" v-model="exp"></v-select>
                        <v-select :items="places" :label="$t('message.Workplace')" v-model="place" @change="changePlace"></v-select>
                        <v-textarea :label="$t('message.WorkDetails')" v-model="details"></v-textarea>
                        
                    <h5>Service fees: {{service}} RWF</h5>
                    <v-checkbox
                    :label="$t('message.termAndCondition')"
                    v-model="terms"
                    @click="toggleEnableDisable()"
                    ></v-checkbox>
                        <v-btn :loading="loading" class="accent" large @click="orderTechnician" :disabled="isDisabled">{{$t('message.Submit')}}</v-btn>
                        </v-form>
                        
                    </v-card-text>
                    </div>
               
                </v-card>
                <v-container style="margin: 10px 10px 100px 0;" v-if="searchLawyers">
                     <div style="display: flex;">
                         <div style="width: 40%;">
                             <v-select :items="types" :label="$t('message.typeOfTechnician')" v-model="type" @change="selectLawyer = false"></v-select>
                         </div>
                         <div style="margin-top: 20px">
                             <v-btn @click="search"  icon>
                              <v-icon>search</v-icon>
                           </v-btn>
                           <v-btn @click="request" color="primary" style="margin-left: 30px;">
                              {{$t('message.RequestTechnician')}}
                           </v-btn>
                         </div>
                     </div>
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
import Tech from 'Api/Technician';
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
        exp: '',
        service: 15000,
        valid: false,
        names: "",
        idnbr: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        image: '',
        type: '',
        diploma: '',
        passport: '',
        previous: '',
        cv: '',
        level: '',
        details: '',
        requestTechnician: false,
        experience: [
            {text: '1 Year', value: 'one year'},
            {text: '2 Years', value: 'two years'},
            {text: '3 Years', value: 'three years'},
            {text: '4 Years', value: 'four years'},
            {text: '5 Years +', value: 'five years and above'},
        ],
        levels: [
            {text: 'Primary level', value: 'primary'},
            {text: 'Secondary level', value: 'A2'},
            {text: 'Advanced Diploma', value: 'A1'},
            {text: 'Bachalors Degree', value: 'A0'},
            {text: 'Masters Degree', value: 'masters'},
        ],
        places: [
            {text: 'Within Kigali', value: 'kigali'},
            {text: 'Outside Kigali', value: 'outside kigali'},
        ],
        place:'',
         selectLawyer: false,
         appear: false,
        types:[
            {text:'Photographer', value:'photographer'},
            {text:'Graphic Designer', value:'graphic designer'},
            {text:'Pianist', value:'pianist'},
            {text:'Guitarist', value:'Guitarist'},
            {text:'Drummer', value:'drummer'},
            {text:'Mechanical', value:'mechanical'},
            {text:'Electrical', value:'electrical'},
            {text:'Plumbing', value:'plumbing'},
            {text:'Electronics technician ', value:'electronics technician '},
            {text:'Film Maker', value:'graphic designer'},
            {text:'Mechanic', value:'mechanic'},
            {text:'Decoration', value:'decoration'},
            {text:'Sonorisation', value:'sonorisation'},
            {text:'Driver', value:'driver'},
            {text:'Accountant', value:'accountant'},
            {text:'Industrial Machine Operator', value:'industrial machine operator'},
            {text:'Massage', value:'massage'},
            {text:'Barber', value:'barber'},
            {text:'Patisserie', value:'patisserie'},
            {text:'sewing and embroidery ', value:'sewing and embroidery'},
            {text:'Agronomist', value:'agronomist'},
            {text:'Veternary', value:'veternary'},
            {text:'Welder ', value:'welder'},
            {text:'Other(provide details information below) ', value:'other'},
        ],
        specialist: [],
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
//   mounted() {
//       const dm = document.
//   },
  methods: {
      changeTechnician(){
          if(this.type === 'barber'){
              this.place = 'kigali';
              this.places[0].value = 'kigali';
              alert(this.place);
              this.service = 5000;
              this.places = [{text: 'Within Kigali', value: 'kigali'},]
          }else{
              this.service = 15000;
              this.places = [
            {text: 'Within Kigali', value: 'kigali'},
            {text: 'Outside Kigali', value: 'outside kigali'},
        ];
          }
          if(this.type === 'mechanical'){
              alert(this.type)
              this.appear = true;
              this.specialist = [
                  {text: 'HVAC Technician', value: 'HVAC Technician'},
                  {text: 'Lift Technician', value: 'Lift Technician'}
              ]
          }else if(this.type === 'electrical'){
              alert(this.type)
              this.appear = true
              this.specialist = [
                  {text: 'Smoak detector technician', value: 'Smoak detector technician'},
                  {text: 'Fire hydrate technician', value: 'Fire hydrate technician'},
                  {text: 'Laying cable technician', value: 'Laying cable technician'},
                  {text: 'Transformer technician', value: 'Transformer technician'},
                  {text: 'Network cable technician', value: 'Network cable technician'},
                  {text: 'High volatage cable technician', value: 'High volatage cable technician'},
                  {text: 'Firefighting technician', value: 'Firefighting technician'},
              ]
          }else if(this.type === 'plumbing'){
              this.type
              this.appear = true;
              this.specialist = [
                  {text: 'Laying pipes technician', value: 'Laying pipes technician'},
                  {text: "Installation of w.c equipment's technician", value: "Installation of w.c equipment's technician"},
                  {text: 'STP(sewage treatment plan) technician', value: 'sewage treatment plan technician'},
                  {text: 'WWTP(Waste Water Treatment plan) technician', value: 'Waste Water Treatment plan technician'},
              ]
          }else{
              this.appear = false
          }

      },
      changePlace(){
          if(this.place === 'kigali' && this.type !== 'barber'){
              this.service = 15000;
          }else{
              this.service = '50,000';
          }
      },
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
        if(this.names ==='' || this.phone ==='' || this.email === '' || this.idnbr === '' || this.type ==='' || this.cv === '' || this.passport === '' || this.previous === '' || this.diploma === ''){
                this.$snotify.error('Validation error, complete required fields',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 2000,
					showProgressBar:false,
				});
                this.loading = false
        }else {
            let data = new FormData();
        data.append("names",this.names);
        data.append("phoneNumber",this.phone);
        data.append("phone",this.idnbr);
        data.append("email",this.email);
        data.append("type",this.type);
        data.append("level",this.level);
        data.append("paymentOption","MOMO");
        data.append("cv",this.cv);
        data.append("passport",this.passport);
        data.append("previous",this.previous);
        data.append("diploma",this.diploma);
        try {
            const res = await Tech.register(data)
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
    async orderTechnician(){
         this.loading = true
        if(this.names ==='' || this.phone ==='' || this.email === '' || this.type ==='' || this.exp === '' || this.place === '' || this.details === ''){
                this.$snotify.error('Validation error, complete required fields',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 2000,
					showProgressBar:false,
				});
                this.loading = false
        }else{
            const data = {
                type: this.type,
                experience: this.exp,
                names: this.names,
                phoneNumber: this.phone,
                email: this.email,
                workPlace: this.place,
                details: this.details,
                paymentOption: 'MOMO'
            }
            try {
            const res = await Tech.orderTechician(data)
            this.names = '';
            this.email = '';
            this.phone = '';
            this.exp = '';
            this.place = '';
            this.type = '';
            this.details = ';'
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
            this.$router.push(`/${this.$i18n.locale}/technicians/${this.type}`)
        }
        
    },
    request(){
        this.requestTechnician = true;
        this.searchLawyers = false
        this.registerLawyer = false;
    },
  },
  computed: {
      ...mapGetters(["linksformbackend","selectedLocale","selectedCurrency"])
  }
};
</script>

