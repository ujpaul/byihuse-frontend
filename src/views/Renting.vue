<template>
  <div class="feature-product-wrap section-gap title-gap">
    <div class="containevr">
      <div class="filter d-flex align-content-space-between" style="width:33%">
        <v-select :items="properties" label="Property type" v-model="property" outlined dense></v-select>
        <v-btn :loading="loading" style="margin-left: 10px" color="#ff7d00" @click="getRentalByCategory">
          <v-icon color="#003566">search</v-icon>
        </v-btn>
        <h5>
          <router-link :to="'/'+$i18n.locale+'/register-house'" v-if="house" class="format">{{$t('message.RegisterHouse')}}</router-link>
        </h5>
        <h5>
          <router-link :to="'/'+$i18n.locale+'/register-sonorisation'" v-if="sonorisation" class="format">{{$t('message.RegisterSonorisation')}}</router-link>
        </h5>
        <h5>
          <router-link :to="'/'+$i18n.locale+'/register-decoration'" v-if="decoration" class="format">{{$t('message.RegisterDecoration')}}</router-link>
        </h5>
        <h5>
          <router-link :to="'/'+$i18n.locale+'/register-band'" v-if="band" class="format">{{$t('message.RegisterBand')}}</router-link>
        </h5>
        <h5>
          <router-link :to="'/'+$i18n.locale+'/register-land'" v-if="land" class="format">{{$t('message.RegisterLand')}}</router-link>
        </h5>
      </div>
      <div class="filter">
        <div class="d-flex align-content-space-between" v-if="house">
          <v-select v-model="type" label="House type" :items="types" outlined dense></v-select>
          <v-btn :loading="loading" style="margin-left: 10px" color="#ff7d00" @click="check">
          Find
        </v-btn>
        </div>
        <h4 v-if="loadData">Loading data...</h4>
      </div>
      <div id="contt" class="tab-content">
        <div v-for="(cateogary,subindex) in produ" :key="subindex" class="tab-item">
          <div class="emb-card">
            <div id="item" class="thumb-wrap">
              <router-link :to="'/en/renting/'+property+'/'+cateogary.name+'/'+cateogary.objectID">
                <img
                  alt="feature product image"
                  :src="cateogary.image"
                  width="626"
                  height="800"
                  id="ddd"
                />
              </router-link>
            </div>
            <div class="emb-card-content pa-4">
              <h5 class="font-weight-medium" v-text="cateogary.name"></h5>
              <div class="emb-meta-info layout align-center my-1">
                <div class="inline-block">
                  <h6 class="accent--text font-weight-medium">
                    <emb-currency-sign></emb-currency-sign>
                    {{cateogary.price}} per hour
                    <br />
                    <span style="color: #000;">Available</span>
                  </h6>
                  <!-- <h6>Available</h6> -->
                </div>
                <div class="inline-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination text-center">
      <v-pagination class="my-4" v-model="page" :length="length" :totalVisible="totalVisible"></v-pagination>
    </div>
  </div>
</template>
<style scoped>
.format{
  color: blue;
  text-decoration: underline;
  margin-left: 10px;
  white-space: nowrap
}
.pagination {
  display: flex;
  justify-content: center;
  /* margin-left: 300px; */
}
#contt {
  display: flex !important;
  flex-wrap: wrap;
  justify-content: center;
  /* margin-left: 100-; */
}
.font-weight-medium {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
}
.filter {
  width: 400px;
  margin-left: 500px;
  margin-bottom: 20px;
}
@media screen and (min-width: 600px) {
  .thumb-wrap #ddd {
    max-height: 26rem;
  }
}
@media screen and (min-width: 1240px) {
  .emb-card {
    height: 31rem;
    width: 19rem !important;
  }
  .thumb-wrap {
    height: 25rem;
  }
}
@media (min-width: 806px) and (max-width: 1240px) {
  .emb-card {
    height: 29rem;
    width: 17rem !important;
  }
}
@media (min-width: 600px) and (max-width: 806px) {
  .emb-card {
    /* height: 36rem; */
    /* width: 24rem!important; */
    width: 40vw;
    height: 66vw;
  }
}
@media screen and (max-width: 600px) {
  .filter {
    margin-left: 30px;
    max-width: 300px;
  }
  .emb-card {
    /* height: 36rem; 
	width: 24rem!important; */
    width: 60vw;
    height: 100vw;
    margin-bottom: 1rem;
  }
}
</style>
<script>
// import Slick from "vue-slick";
import { mapGetters } from "vuex";
import rent from "Api/rental";
export default {
  props: ["secTitle"],
  computed: {
    ...mapGetters(["rtlLayout", "cart", "wishlist", "linksformbackend"])
    // produc () {
    //   return this.$store.state.products
    // }
  },
  components: {
    // Slick
  },
  data() {
    return {
      loading: false,
      loadData: false,
      selectedTab: 0,
      activeTab: null,
      slickOptions: {
        autoplay: true,
        slidesToShow: 5,
        infinite: false,
        arrows: false,
        dots: true,
        rtl: this.rtlLayout,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: false
            }
          }
        ]
      },
      properties: [
        "Cars",
        "Tractors",
        "Land",
        "House",
        "Decoration",
        "Sonorisation",
        "Band(music)"
      ],
      property: "Cars",
      types: [
        {text: 'Commercial', value: 'commercial'},
        {text: 'Hotel room', value: 'hotel room'},
        {text: 'Residential', value: 'residential'},
        {text: 'Maison de passage', value: 'maison passage'},
        {text: 'Lodge', value: 'lodge'},
      ],
      type: '',
      category: '',
      products: [],
      categories: [],
      page: 1,
      produ: [],
      length: 7,
      totalVisible: 7,
      land: false,
      house: false,
      sonorisation: false,
      band: false,
      decoration: false
    };
  },
  methods: {
    onTabChange(key) {
      this.selectedTab = key;
    },
    async check(){
       this.loadData = true
    try {
      const res = await rent.getRentalHouseByCategory({category: this.type});
      this.loadData = false
      res.data.data.forEach(el => {
        this.products.push({
          objectID: el._id,
          image: this.linksformbackend + el.pictures.pic1,
          price: el.price,
          name: el.name.en,
          image_gallery: [
            this.linksformbackend + el.pictures.pic1,
            this.linksformbackend + el.pictures.pic2,
            this.linksformbackend + el.pictures.pic3,
            this.linksformbackend + el.pictures.pic4
          ],
          description: el.description.en,
          company: el.company.name
        });
      });
      this.produ = this.products.slice(0, 20);
      this.length = Math.ceil(this.products.length / 20);
    } catch (err) {
      console.log(err);
    }
    },
    async getRentalByCategory() {
      this.products = [];
      this.loadData = true
      try {
        const res = await rent.getRentalByCategory({ category: this.property });
        if(res){
          if(this.property === 'Land'){
            this.land = true
            this.decoration = false;
            this.house = false;
            this.sonorisation = false;
            this.band = false;
          }else if(this.property === 'Band(music)'){
            this.band = true
            this.decoration = false;
            this.house = false;
            this.sonorisation = false;
            this.land = false;
          }else if(this.property === 'Decoration'){
            this.decoration = true
            this.land = false;
            this.house = false;
            this.sonorisation = false;
            this.band = false;
          }else if(this.property === 'Sonorisation'){
            this.sonorisation = true
            this.decoration = false;
            this.house = false;
            this.land = false;
            this.band = false;
          }else if(this.property === 'House'){
            this.house = true
            this.decoration = false;
            this.land = false;
            this.sonorisation = false;
            this.band = false;
          }else{
            this.decoration = false;
            this.house = false;
            this.sonorisation = false;
            this.band = false;
            this.land = false;
          }
        }
        this.loadData = false
        this.products = [];
        res.data.data.forEach(el => {
          this.products.push({
            objectID: el._id,
            image: this.linksformbackend + el.pictures.pic1,
            price: el.price,
            name: el.name.en,
            category: el.property,
            image_gallery: [
              this.linksformbackend + el.pictures.pic1,
              this.linksformbackend + el.pictures.pic2,
              this.linksformbackend + el.pictures.pic3,
              this.linksformbackend + el.pictures.pic4
            ],
            description: el.description.en,
          });
        });
        this.produ = this.products.slice(0, 20);
        this.length = Math.ceil(this.products.length / 20);
      } catch (err) {
        console.log(err);
      }
      console.log('products:', this.products);
    }
  },
  async getHouseByCategory(){
    alert('clicked')
     this.loadData = true
    try {
      const res = await rent.getRentalHouseByCategory({category: this.type});
      this.loadData = false
      res.data.data.forEach(el => {
        this.products.push({
          objectID: el._id,
          image: this.linksformbackend + el.pictures.pic1,
          price: el.price,
          name: el.name.en,
          image_gallery: [
            this.linksformbackend + el.pictures.pic1,
            this.linksformbackend + el.pictures.pic2,
            this.linksformbackend + el.pictures.pic3,
            this.linksformbackend + el.pictures.pic4
          ],
          description: el.description.en,
          company: el.company.name
        });
      });
      this.produ = this.products.slice(0, 20);
      this.length = Math.ceil(this.products.length / 20);
    } catch (err) {
      console.log(err);
    }
  },
  async mounted() {
    this.loadData = true
    try {
      const res = await rent.getRental();
      this.loadData = false
      res.data.data.forEach(el => {
        this.products.push({
          objectID: el._id,
          image: this.linksformbackend + el.pictures.pic1,
          price: el.price,
          name: el.name.en,
          image_gallery: [
            this.linksformbackend + el.pictures.pic1,
            this.linksformbackend + el.pictures.pic2,
            this.linksformbackend + el.pictures.pic3,
            this.linksformbackend + el.pictures.pic4
          ],
          description: el.description.en,
          company: el.company.name
        });
      });
      this.produ = this.products.slice(0, 20);
      this.length = Math.ceil(this.products.length / 20);
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    page: function() {
      // console.log(this.page, 'hello')
      this.produ = [];
      const trimeStart = (this.page - 1) * 20;
      const trimeEnd = trimeStart + 20;
      this.produ = this.products.slice(trimeStart, trimeEnd);
      // for (let i = trimeStart; i < trimeEnd; i++) {
      //   this.produ.push(this.products[i]);

      // }
      console.log("Produ", this.produ);
      console.log(trimeStart);
    }
  }
};
</script>



