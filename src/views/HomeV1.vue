<template>
  <div>
    <div class="main">
      <div class="banner">
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg8 xl8>
              <emb-home-main-banner :data="homeBannerData"></emb-home-main-banner>
            </v-flex>
            <v-flex xs12 sm12 md12 lg4 xl4>
              <v-layout row wrap text-center mx-0>
                <v-flex xs12 sm6 md6 lg12 xl12 px-0>
                  <!-- <emb-aside-banner-v1 img="/static/images/aside-4.jpg"></emb-aside-banner-v1> -->
                  <vuetify-audio :file="file" color="#ff7d00" :ended="audioFinish"></vuetify-audio>
                </v-flex>
                <v-flex xs12 sm6 md6 lg12 xl12 px-0>
                  <!-- <emb-aside-banner-v2 img="/static/images/aside-3.jpg"></emb-aside-banner-v2> -->
                  <emb-aside-banner-v2 img="/static/images/ads/carv8.jpeg"></emb-aside-banner-v2>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <Products />
      <emb-features :data="featuresData"></emb-features>
      <emb-feature-product secTitle="Featured Products"></emb-feature-product>
      <emb-day-deal></emb-day-deal>
      <emb-detail-offer></emb-detail-offer>
      <emb-new-arrival-Products secTitle="New Arrivals"></emb-new-arrival-Products>
      <!-- <embTestimonial
				secTitle="Customer Reviews"
				:data="TestimonialData"
			>
      </embTestimonial>-->
      <!-- <emb-blog
				secTitle="Latest From Blogs"
				:data="blogData"
			>	
      </emb-blog>-->
      <h2 class="text-center mb-5">{{$t("message.OurPartners")}}</h2>
      <div class="partners-container">
        <VueSlickCarousel v-bind="settings">
          <div class="partners" style="background-color:#000;">
            <img src="static/images/logo/partner (1).jpg" width="200" height="50" />
          </div>
          <div class="partners">
            <img src="static/images/logo/partner (1).png" width="200" height="50" />
          </div>
          <div>
            <img src="static/images/logo/partner4.png" width="200" height="50" />
          </div>
          <div class="partners" style="height:50px">
            <img src="static/images/logo/partner5.png" width="200" height="20" />
          </div>
          <div class="partners">
            <img src="static/images/logo/partner3.png" width="200" height="50" />
          </div>
          <div class="partners" style="margin-bottom:30px;">
            <img src="static/images/logo/partner2.png" width="200" height="50" />
          </div>
          <div class="partners" style="margin-bottom:30px;">
            <img src="static/images/logo/partner1.png" width="170" height="150" />
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>
<script>
import VuetifyAudio from "vuetify-audio";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
//Api
import categories from "Api/categories";
import departments from "Api/department";
// Import Products to the homepage

// import Products from "./Product";
import Products from "./MadeInRwanda";
// layout components
import HomeMainBanner from "Components/Layouts/Banner/HomeMainBanner";
// import AsideBannerV1 from "Components/Layouts/Banner/AsideBannerV2";
import AsideBannerV2 from "Components/Layouts/Banner/AsideBannerV2";

// widgets
import newArrivalProducts from "Components/Widgets/newArrivalProducts";
import Features from "Components/Widgets/Feature";
import FeatureProduct from "Components/Widgets/FeatureProduct";
import DayDeal from "Components/Widgets/DayDeal";
import DetailOffer from "Components/Widgets/DetailOffer";
// import Testimonial from "Components/Widgets/Testimonial";
// import Blog from "Components/Widgets/Blog";
// import ShopCard from "Components/Widgets/ShopCard";
// import Subscribe from "Components/Widgets/Subscribe";

// data
import homeBannerData from "Assets/data/homeBannerData";
import featuresData from "Assets/data/featuresData";
// import featureProductData from "Assets/data/featureProductData";
// import dayDealData from "Assets/data/dayDealData";
// import latestArrivalData from "Assets/data/latestArrivalData";
// import TestimonialData from "Assets/data/TestimonialData";
// import shopCard from "Assets/data/shopCard";

// import api from "Api";
// import Company from "Api/company";
// import products from "Api/products";
import { mapGetters } from "vuex";
export default {
  components: {
    VuetifyAudio,
    VueSlickCarousel,
    embHomeMainBanner: HomeMainBanner,
    // embAsideBannerV1: AsideBannerV1,
    embAsideBannerV2: AsideBannerV2,
    Products,
    // AsideBannerV1,
    embFeatures: Features,
    embNewArrivalProducts: newArrivalProducts,
    embFeatureProduct: FeatureProduct,
    embDayDeal: DayDeal,
    embDetailOffer: DetailOffer
  },
  computed: {
    ...mapGetters(["selectedLocale"])
  },
  data() {
    return {
      homeBannerData,
      featuresData,
      file: "/static/audio/audio.mp3",
      blogData: null,
      resCat: "",
      resDept: "",
      categories: [],
      audioFinish: true,
      items: [
        {
          id: 1,
          title: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" }
          ]
        }
      ],
      settings: {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        cssEase: "linear"
      }
    };
  },

  async created() {
    try {
      this.resCat = await categories.getCategories();
      this.resDept = await departments.getDepartment();
      this.categories = this.resDept.data.data;
      var obj = [];
      var arr = {};
      if (this.selectedLocale.name === "French") {
        this.resDept.data.data.forEach(dep => {
          this.resCat.data.data.forEach(el => {
            if (dep._id === el.department) {
              obj.push({
                path: `${el.name.en}`,
                children_menus: null,
                name: `${el.name.fr}`
              });
            }
          });
          arr[dep.name.fr] = { ...obj };
          for (let i = 0; i < obj.length; i++) {
            delete obj[i];
          }
        });
      } else if (this.selectedLocale.name === "English") {
        this.resDept.data.data.forEach(dep => {
          this.resCat.data.data.forEach(el => {
            if (dep._id === el.department) {
              obj.push({
                path: `${el.name.en}`,
                children_menus: null,
                name: `${el.name.en}`
              });
            }
          });
          arr[dep.name.en] = { ...obj };
          for (let i = 0; i < obj.length; i++) {
            delete obj[i];
          }
        });
      } else if (this.selectedLocale.name === "Swahili") {
        this.resDept.data.data.forEach(dep => {
          this.resCat.data.data.forEach(el => {
            if (dep._id === el.department) {
              obj.push({
                path: `${el.name.sw}`,
                children_menus: null,
                name: `${el.name.sw}`
              });
            }
          });
          arr[dep.name.sw] = { ...obj };
          for (let i = 0; i < obj.length; i++) {
            delete obj[i];
          }
        });
      } else if (this.selectedLocale.name === "Kinyarwanda") {
        this.resDept.data.data.forEach(dep => {
          this.resCat.data.data.forEach(el => {
            if (dep._id === el.department) {
              obj.push({
                path: `${el.name.en}`,
                children_menus: null,
                name: `${el.name.kiny}`
              });
            }
          });
          arr[dep.name.kiny] = { ...obj };
          for (let i = 0; i < obj.length; i++) {
            delete obj[i];
          }
        });
      }
      this.menus[2].children = arr;
    } catch (err) {
      console.log(err.message);
    }
  },
  methods: {
    async check() {
      this.checkData = await departments.getDepartment();
      this.cats = await categories.getCategories();
      // alert(this.checkData.data.data[0].name.en);
    },
    changeRoute(megaitemkey, submega) {
      console.log(megaitemkey, submega);
      this.$router.push(
        `/${this.$i18n.locale}/products/${megaitemkey}/${submega}`
      );
    },
    changedepRoute(megaitemkey) {
      console.log(megaitemkey);
      this.$router.push(`/${this.$i18n.locale}/products/${megaitemkey}`);
    },
    changeOneRoute(oneLink) {
      console.log(oneLink);
      if (oneLink !== "categoriesiii" && oneLink !== "servicesTitle") {
        this.$router.push(`/${this.$i18n.locale}/${oneLink}`);
      }
    }
  }
};
</script>
<style scoped>
.items-container {
  display: flex;
}
.item1 {
  width: auto;
  max-width: 300px;
  margin-top: 52px;
}
.partners {
  max-width: 200px !important;
  height: 150px;
}
.partners-container {
  max-height: 100px;
  width: 1100px;
  margin-left: 100px;
  margin-bottom: 50px;
}
</style>