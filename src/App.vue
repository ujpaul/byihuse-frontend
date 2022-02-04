<template>
  <v-app>
    <router-view></router-view>
    <div class="rtl-layout" @click="toggleRTLLayout">
      <!-- <a class="text-xl" href="javascript:void(0);">RTL</a> -->
      <PageLoading v-if="load === true"/>
    </div>
  </v-app>
</template>

<script>
import PageLoading from './components/Global/PageLoading'
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components:{PageLoading},
  computed: {
    ...mapGetters(["rtlLayout"]),
    mobileMenu: {
      get() {
        return this.$store.getters.sidebarOpen;
      },
      set(val) {
        this.$store.dispatch("toggleSidebar", val);
      }
    }
  },
  data(){
    return{
      load: true
    }
  },
  /**
   * Method To set the Rtl While page is opened
   */
  mounted() {
    setTimeout(() => {
      this.load = false
    }, 4000);
    this.$store.dispatch("apiLink");
    if (this.rtlLayout) {
      this.$vuetify.rtl = this.rtlLayout;
    }
    // if (condition) {

    // }
    const token = localStorage.getItem("now");
    // console.log(token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      this.$store.commit({
        type: "onAddProductToC",
        dart: cart
      });
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (wishlist) {
      this.$store.commit({
        type: "onAddItemToWish",
        wishlist: wishlist
      });
    }
    // this.$store.commit({
    // 	type:'tryyyy'
    // })
  },
  async created() {
  },
  methods: {
    /**
     * Method To Toggle The RTL Layout
     */
    toggleRTLLayout() {
      this.$vuetify.rtl = !this.rtlLayout;
      this.$store.dispatch("changeRtlLayout");
      
    }
  }
};
</script>



