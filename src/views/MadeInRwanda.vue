<template>
  <div class="feature-product-wrap section-gap title-gap">
    <div class="containevr">
      <div id="contt" class="tab-content">
        <div v-for="(cateogary,subindex) in produ" :key="subindex" class="tab-item">
          <div class="emb-card">
            <div id="item" class="thumb-wrap" style="word-wrap: break-word;">
              <router-link
                :to="'/en/products/'+cateogary.name+'/'+cateogary.category+'/'+cateogary.objectID"
              >
                <img
                  alt="feature product image"
                  :src="cateogary.image"
                  width="626"
                  height="800"
                  id="ddd"
                />
              </router-link>
              <div class="wishlist-icon">
                <v-btn
                  v-if="ifItemExistInWishlist(cateogary)"
                  @click="addItemToWishlist(cateogary)"
                  icon
                >
                  <v-icon class="black--text">favorite</v-icon>
                </v-btn>
                <v-btn v-else @click="addItemToWishlist(cateogary)" icon>
                  <v-icon class="grey--text">favorite</v-icon>
                </v-btn>
              </div>
              <div class="add-to-cart">
                <v-btn
                  v-if="ifItemExistInCart(cateogary,cart)"
                  to="/en/cart"
                  class="accent"
                  icon
                  absolute
                  bottom
                >
                  <v-tooltip color="#003566" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on">remove_red_eye</v-icon>
                    </template>
                    <span>{{$t("message.GoToCart")}}</span>
                  </v-tooltip>
                </v-btn>

                <v-btn v-else @click="addProductToCart(cateogary)" class="accent" icon>
                  <v-tooltip color="#003566" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on">shopping_cart</v-icon>
                    </template>
                    <span>{{$t("message.ClickToAddToCart")}}</span>
                  </v-tooltip>
                </v-btn>
              </div>
            </div>
            <div class="emb-card-content pa-4">
              <div>
                <h5 class="font-weight-medium only-h5" v-text="cateogary.name"></h5>
              </div>
              <div class="emb-meta-info layout align-center my-1">
                <div class="inline-block">
                  <h6 class="accent--text font-weight-medium price">
                    <emb-currency-sign></emb-currency-sign>
                    {{cateogary.price}}
                  </h6>
                </div>
                <div class="inline-block">
                  <!-- <v-rating 
													v-model="cateogary.rate"
													readonly
													background-color="grey"
													color="#edb876"
												>
                  </v-rating>-->
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
          <!-- </slick> -->
        </div>
        <!-- </template>	 -->
      </div>
    </div>
    <div class="pagination text-center">
      <v-pagination class="my-4" v-model="page" :length="length" :totalVisible="totalVisible"></v-pagination>
    </div>
  </div>
</template>
<style scoped>
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
  .emb-card {
    /* height: 36rem; 
	width: 24rem!important; */
    width: 20vw;
    height: 50vw;
    margin-bottom: 1rem;
  }
  .only-h5{
    font-size: 10px;
    margin-top: 30px;
    margin-left: -10px;
  }
  .price{
    font-size: 10px;
    margin-left: -10px;
  }
  .emb-card-content{
    word-wrap: break-word;
  }
  .accent{
    height: 2rem;
    width: 2rem;
    line-height: 5.125rem;
    /* position: absolute; */
    bottom: -42px;
  }
}
</style>
<script>
// import Slick from "vue-slick";
import { mapGetters } from "vuex";
import department from "Api/department";
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
      products: [],
      page: 1,
      produ: [],
      length: 7,
      totalVisible: 7
    };
  },
  methods: {
    /**
     * method for adding item to cart
     */
    addProductToCart(newItem) {
      this.$snotify.success("Product adding to the cart", {
        closeOnClick: false,
        pauseOnHover: false,
        timeout: 1000
      });
      setTimeout(() => {
        this.$store.dispatch("addProductToCart", newItem);
      }, 100);
    },
    /**
     * method for to change item
     */
    onTabChange(key) {
      this.selectedTab = key;
    },
    /**
     * method for checking if item exists in cart
     */
    ifItemExistInCart(result) {
      let exists = false;
      for (let item of this.cart) {
        if (item.id == result.objectID) {
          exists = true;
        }
      }
      return exists;
    },
    // this method is use to add a product in wishlist
    addItemToWishlist(item) {
      if (this.ifItemExistInWishlist(item)) {
        this.$snotify.error("Product already exist in the wishlist", {
          showProgressBar: false
        });
      } else {
        this.$snotify.success("Product adding to the wishlist", {
          closeOnClick: false,
          pauseOnHover: false,
          timeout: 1000,
          showProgressBar: false
        });
        setTimeout(() => {
          this.$store.dispatch("addItemToWishlist", item);
        }, 2000);
      }
    },
    /**
     * This Function Is use to check weather the product exist in the wishlist
     * Return boolean
     */
    ifItemExistInWishlist(result) {
      let exists = false;
      for (let item of this.wishlist) {
        if (item.id == result.objectID) {
          exists = true;
        }
      }
      return exists;
    }
  },
  async mounted() {
    try {
      const res = await department.getMadeInRwanda();
      console.log("Made in rwanda:", res);
      res.data.data.forEach(el => {
        // console.log(el)
        this.products.push({
          objectID: el._id,
          type: el.name.en,
          image: this.linksformbackend + el.pictures.pic1,
          price: el.price,
          cost: el.cost,
          payVat: el.vat,
          name: el.name.en,
          rate: 3,
          image_gallery: [
            this.linksformbackend + el.pictures.pic1,
            this.linksformbackend + el.pictures.pic2,
            this.linksformbackend + el.pictures.pic3,
            this.linksformbackend + el.pictures.pic4
          ],
          description: el.description.en,
          category: el.category.name.en,
          command: el.command
        });
      });
      // console.log()
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



