<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.Services"
			subHeading="message.Useourservices"
            subTitle="Akira Byoroshye"
		>
		</emb-page-title>
        <div class="delivery" style="margin:20px 10px 30px 10px;">
			<v-btn style="min-width: 45%; height: 60px" @click="registerAsLawyer" :class="{accent: attached}">{{$t("message.drycleanerServices")}} </v-btn>
			<v-btn style="min-width: 54%; height: 60px" id="premium" :class="{accent: !attached}">{{$t("message.SanitaryService")}} </v-btn>
		</div>
        <v-flex xs12 sm12 md6 lg6 xl8>
            <div class="mt-5">
                        <div v-if="drycleaner" class="clothes-type text-center">
                            <v-btn class="orange" @click="toggle('men'),getServiceByType('men')">{{$t('message.men')}}</v-btn>
                            <v-btn class="green" @click="toggle('women'),getServiceByType('women')">{{$t('message.women')}}</v-btn>
                            <v-btn class="blue" @click="toggle('others'),getServiceByType('others')">{{$t('message.Others')}}</v-btn>
                            <v-btn class="blue" @click="toggle('order')">{{$t('Track Order')}}</v-btn>
                            <div >
                                
                            </div>
                            <div v-if="menSelected" style="margin-left: 30px;">
                                <h3 v-if="load">{{loadingMessage}}</h3>
                                    <v-row no-gutters>
                                        <v-col v-for="( item, index ) in men" :key="index" sm="4" md="4" lg="4" xl="4">
                                            <v-container
                                        class="px-0"
                                        fluid
                                    >
                                        <v-checkbox
                                        v-model="checkboxMen[index]"
                                        :label="`${item.name} : RWF ${item.price}`"
                                        color="success"
                                        @click="addProductToCart(item._id,item.name,item.price)"
                                        ></v-checkbox>
                                    </v-container>
                                        </v-col>
                                    </v-row>
                            </div>
                            <div v-if="womenSelected" style="margin-left: 30px;">
                                <h3 v-if="load">{{loadingMessage}}</h3>
                                    <v-row no-gutters>
                                        <v-col v-for="( item, index ) in women" :key="index" sm="4" md="4" lg="4" xl="4">
                                            <v-container
                                        class="px-0"
                                        fluid
                                    >
                                        <v-checkbox
                                        v-model="checkboxWomen[index]"
                                        :label="`${item.name} : RWF ${item.price}`"
                                        color="orange"
                                        @click="addProductToCart(item._id,item.name,item.price)"
                                        ></v-checkbox>
                                    </v-container>
                                        </v-col>
                                    </v-row>
                            </div>
                            <div v-if="othersSelected" style="margin-left: 30px;">
                                <h3 v-if="load">{{loadingMessage}}</h3>
                                    <v-row no-gutters>
                                        <v-col v-for="( item, index ) in others" :key="index" sm="4" md="4" lg="4" xl="4">
                                            <v-container
                                        class="px-0"
                                        fluid
                                    >
                                        <v-checkbox
                                        v-model="checkboxOthers[index]"
                                        :label="`${item.name} : RWF ${item.price}`"
                                        color="info"
                                        @click="addProductToCart(item._id,item.name,item.price)"
                                        ></v-checkbox>
                                    </v-container>
                                        </v-col>
                                    </v-row>
                            </div>
                            
                        </div>
                        <!-- <v-btn :loading="loading" class="accent" large @click="register" :disabled="isDisabled">{{$t('message.Submit')}}</v-btn> -->
                <v-container style="margin: 10px 10px 100px 0;" v-if="trackOrder">
                    <div class="mt-5">
                        <h4 style="margin-left: 100px;" class="mt-5">Track your order</h4>
                    </div>
                     <v-flex xs12 sm12 md6 lg7 xl5  search-v3-wrap>
                           <input class="input" v-on:keyup.enter="search" style="width:85%;height:48px;"  v-model="keyword" type="text" :placeholder="$t('message.searchByDistrict')">
                           <span style="color: red" v-if="selectLawyer">*this field is required</span>
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
.clothes-type{
    margin: 10px 0 10px 0;
}
.orange{
    background: #ff7d00;
    color: #fff;
    margin-right: 10px;
    font-size: 20px;
}
.green{
    background: #4dc247;
    color: #fff;
    margin-right: 10px;
    font-size: 20px;
}
.blue{
    background: #003566;
    color: #fff;
    margin-right: 10px;
    font-size: 20px;
}
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
import drycleaner from 'Api/DryCleaner';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        loading: false,
        loadingMessage: 'Loading services, please wait...',
        load: false,
        drycleaner: false,
        menSelected: false,
        womenSelected: false,
        othersSelected: false,
        sanitaryServices: false,
        checkboxMen: [],
        checkboxWomen: [],
        checkboxOthers: [],
        keyword: '',
        men:[],
        women: [],
        others: [],
         selectLawyer: false,
         trackOrder: false,
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
  methods: {
      /**
     * method for adding item to cart
     */
    addProductToCart(id,name,price) {
        let newItem = {
            objectID:id,
            name: name,
            price: price,
            isDryCleaner: true
        }
      this.$snotify.success("Product adding to the cart", {
        closeOnClick: false,
        pauseOnHover: false,
        timeout: 1000
      });
      setTimeout(() => {
        this.$store.dispatch("addProductToCart", newItem);
      }, 100);
    },
      toggle(item){
          if(item === 'men'){
              this.trackOrder = false;
              this.womenSelected = false;
              this.othersSelected = false;
              this.menSelected = true;
          } else if(item === 'women'){
              this.trackOrder = false;
              this.othersSelected = false;
              this.menSelected = false;
              this.womenSelected = true;
          } else if(item === 'others'){
              this.menSelected = false;
              this.womenSelected = false;
              this.othersSelected = true;
              this.trackOrder = false;
          } else {
              this.menSelected = false;
              this.womenSelected = false;
              this.othersSelected = false;
              this.trackOrder = true;
          }
      },
      async getServiceByType(type){
          this.load = true;
          try {
              const res = await drycleaner.getServiceByType(type);
              this.load = false;
              if(type === 'men'){
                  this.men = res.data.data;
              } else if(type === 'women'){
                  this.women = res.data.data;
              } else {
                  this.others = res.data.data;
              }
          } catch (error) {
              console.log(error);
          }
      },
      registerAsLawyer() {
          this.sanitaryServices = false
          this.drycleaner = !this.drycleaner
      },
      findLawyers(){
          this.drycleaner = false;
          this.sanitaryServices = !this.sanitaryServices
      },
    saveDetails() {
      this.$refs.form.validate();
    },
     search(){
        if(this.keyword === ''){
            alert('provide tracking number')
        }else{
            this.$router.push(`/${this.$i18n.locale}/track-order/${this.keyword}`)
        }
    }
  },
  computed: {
      ...mapGetters(["linksformbackend","selectedLocale","selectedCurrency","cart"])
  }
};
</script>

