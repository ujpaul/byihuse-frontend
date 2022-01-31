<template>
  <div class="emb-contact-wrap">
    <emb-page-title
      heading="message.Rental"
      subHeading="message.subHeadingRental"
    ></emb-page-title>
    <v-btn class="primary ml-1 toggleBtn" icon @click="darwer = !darwer">
      <i class="material-icons">menu</i>
    </v-btn>
    <div class="mainSerices">
      <div>
        <!-- <div id="idCard">
          <v-navigation-drawer id="idCard" dark class="primary" width="230" height="100%" permanent>
            <v-list id="services">
              <div v-for="names in rentalNames" :key="names">
                <v-list-item id="servicesId" @click="viewServices(names.id)" link>{{names.name}}</v-list-item>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-navigation-drawer>
        </div>
        <div class="forSmall">
          <v-navigation-drawer
            v-model="darwer"
            app
            dark
            width="230"
            height="1000"
            class="primary"
            id="thisOneTry"
            temporary
          >
            <v-list id="services">
              <div v-for="names in rentalNames" :key="names">
                <v-list-item id="servicesId" @click="viewServices(names.id)" link>{{names.name}}</v-list-item>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-navigation-drawer>
        </div> -->
      </div>
      <div class="asideServices">
        <div class="day-deal-wrap white section-gap">
          <v-container grid-list-xl pb-0>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6 lg6 xl6 deal-content>
                <div class="day-deal-content">
                  <div class="mb-12">
                    <h2 class="font-weight-regular mb-6">
                      {{ selectedServices.sectitle }}
                    </h2>
                    <h5 class="font-weight-regular">
                      {{ selectedServices.subtitle }}
                    </h5>
                    <!-- <p class="d-inline-block mr-1">
								<strike class="px-1"><emb-currency-sign class="font-color"></emb-currency-sign>42.46</strike>
                    </p>-->
                    <p>{{ selectedServices.paragraph }}</p>
                  </div>
                  <v-layout row wrap cmx-0>
                    <v-flex
                      xs4
                      sm4
                      md4
                      lg4
                      xl4
                      class="product-gallery"
                      v-for="(productImage,
                      key) in selectedServices.productGallery"
                      :key="key"
                      @click="togglePreviewImage(productImage)"
                    >
                      <a href="javascript:void(0)">
                        <v-img
                          alt="deal of the day"
                          class="emb-card"
                          :src="productImage"
                          aspect-ratio="0.8"
                          max-width="217"
                          max-height="217"
                        />
                      </a>
                    </v-flex>
                    <div class="text-center" style="width:100%">
                      <v-btn color="#006feb"
                        ><a
                          href="/static/contract/Contract.pdf"
                          style="color: #fff"
                          download
                          >Get Contract</a
                        ></v-btn
                      >
                    </div>
                  </v-layout>
                </div>
              </v-flex>

              <v-flex xs12 sm12 md6 lg5 xl6>
                <div class="sec-title">
                  <h5>{{ $t("message.Fillthisform") }}</h5>
                </div>
                <v-radio-group v-model="choose">
                    <div class="d-flex">
                      <v-radio
                        label="Hours"
                        color="warning"
                        value="hours"
                      ></v-radio>
                      <v-radio
                        label="Days"
                        color="warning"
                        value="days"
                        style="margin-bottom: 10px;"
                      ></v-radio>
                    </div>
                  </v-radio-group>
                <!-- <v-form ref="form" v-model="valid"> -->
                  <div class="hourRental d-flex">
                    <div>
                      <button
                        class="cart-btn"
                        style="border-radius:3px 0 0 3px"
                        @click="rentalHour ++"
                      >
                        +
                      </button>
                      <button
                        class="cart-btn"
                        style="border-radius:0 3px 3px 0"
                        @click="rentalHour > 1 ? rentalHour-- : ''"
                      >
                        -
                      </button>
                    </div>
                    <div class="input">
                      <v-text-field
                        v-model="rentalHour"
                        id="input"
                        solo
                      ></v-text-field>
                    </div>
                    <div v-if="choose === 'hours'" class="font-weight-regular rentalH ml-2">
                      {{ $t("message.RentingHour") }}
                    </div>
                    <div v-if="choose === 'days'" class="font-weight-regular rentalH ml-2">
                      {{ $t("message.RentingDay") }}
                    </div>
                  </div>
                  <p class="accent--text d-inline-block sec-content">
                    {{ $t("message.Startingatonly") }}
                    <emb-currency-sign class="accent--text"></emb-currency-sign>
                    {{
                      (
                        (selectedServices.price / currentValue) *
                        rentalHour
                      ).toFixed(2)
                    }}
                  </p>
                  <v-text-field
                    v-model="firstName"
                    type="text"
                    :placeholder="$t('message.firstname')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="lastName"
                    type="text"
                    :placeholder="$t('message.lastname')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    type="email"
                    :placeholder="$t('message.yourEmail')"
                  ></v-text-field>
                  <v-text-field
                    v-model="phoneNumber"
                    type="number"
                    :placeholder="$t('message.yourPhone')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="destination.district"
                    type="text"
                    :placeholder="$t('message.districtDestination')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="destination.sector"
                    type="text"
                    :placeholder="$t('message.sectorDestination')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="destination.cell"
                    type="text"
                    :placeholder="$t('message.cellDestination')"
                    :rules="inputRules.basictextRules"
                  ></v-text-field>
                  <v-file-input
                    :label="$t('message.Nid')"
                    v-model="NID"
                  ></v-file-input>
                  <v-file-input
                    :label="$t('message.contract')"
                    v-model="contract"
                  ></v-file-input>
                  <v-select
                    :label="$t('message.WhereAreYouGoing')"
                    :items="where"
                    v-model="place"
                  ></v-select>
                  <v-select
                    :label="$t('message.WhoIsDriver')"
                    :items="drivers"
                    v-model="driver"
                    @change="driverType"
                  ></v-select>
                  <v-file-input
                    :label="$t('message.drivingLicence')"
                    v-model="licence"
                    v-if="myself"
                  ></v-file-input>
                  <div v-if="needDriver">
                    <v-text-field
                      v-model="forDriver.driverFirstname"
                      type="text"
                      :placeholder="$t('message.firstname')"
                      :rules="inputRules.basictextRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="forDriver.driverLastName"
                      type="text"
                      :placeholder="$t('message.lastname')"
                      :rules="inputRules.basictextRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="forDriver.driverPhoneNumber"
                      type="number"
                      :placeholder="$t('message.yourPhone')"
                      :rules="inputRules.basictextRules"
                    ></v-text-field>
                    <v-file-input
                      :label="$t('message.drivingLicence')"
                      v-model="driverLicence"
                    ></v-file-input>
                    <v-file-input
                      :label="$t('message.Nid')"
                      v-model="driverId"
                    ></v-file-input>
                  </div>
                  <div class="d-flex">
                    <v-btn
                    :loading="loading"
                    class="accent mx-0 mt-4"
                    large
                    @click.stop.prevent="AskForServices"
                    >{{ $t("message.Submit") }}</v-btn
                  >
                  <div style="margin: 20px 0 0 10px;">
                    <h5> {{$t('message.Salary')}}:{{choose === 'hours' ? (
                        (selectedServices.price / currentValue) *
                        rentalHour - (
                        (selectedServices.costPerHour / currentValue) *
                        rentalHour ) ) * 15/100 : (
                        (selectedServices.pricePerDay / currentValue) *
                        rentalHour -(
                        (selectedServices.costPerDay / currentValue) *
                        rentalHour )
                      ) * 15 / 100}} RWF
                    </h5>
                  </div>
                  </div>
                <!-- </v-form> -->
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hourRental {
  /* width: 200px; */
  /* height: 50px; */
  display: flex;
  align-items: center;
}
.cart-btn {
  width: 30px;
  height: 30px;
  margin-bottom: 20px;
  background-color: #ff7d00;
  color: #fff;
  border-radius: 1px solid #ff7d00;
}
.input {
  width: 100px;
  font-size: 20px;
}
#input {
  text-align: end;
}
.rentalH {
  font-size: 20px;
  margin-bottom: 20px;
}
#services {
  position: relative;
  bottom: 10px;
}
.mainSerices {
  display: flex;
}
.asideServices {
  /* background: grey; */
  /* height: 400px; */
  width: 100%;
}
/* #idCard{
    height: 100%;
} */
#navig {
  background: #eeeeee;
}
#servicesId {
  font-size: 17px;
}
@media screen and (max-width: 1279px) {
  #idCard {
    display: none;
  }
  .forSmall {
    /* display: none; */
    position: relative;
    top: 100px;
  }
  .thisOneTry {
    position: relative;
    top: 100px;
  }
}
@media screen and (min-width: 1279px) {
  .forSmall,
  .toggleBtn {
    display: none;
  }
}
</style>
<script>
import Rental from "Api/rental";
import { mapGetters } from "vuex";
import currency from "Api/currency";
export default {
  data() {
    return {
      loading: false,
      myself: false,
      needDriver: false,
      contract: "",
      firstName: "",
      lastName: "",
      email: "",
      destination: {
        district: "",
        sector: "",
        cell: "",
      },
      choose: "hours",
      phoneNumber: "",
      forDriver: {
        driverFirstname: "",
        driverLastname: "",
        driverPhoneNumber: "",
      },
      driverLicence: "",
      driverId: "",
      NID: "",
      licence: "",
      details: "",
      address: "",
      darwer: null,
      valid: false,
      contactInfo: "",
      where: [
        { text: "Within country", value: "inside" },
        { text: "outside country", value: "outside" },
      ],
      place: "",
      driver: "",
      drivers: [
        { text: "Myself", value: "myself" },
        { text: "My driver", value: "my driver" },
        { text: "Company driver", value: "company driver" },
      ],
      inputRules: {
        basictextRules: [(v) => !!v || "This field should not be empty"],
      },
      rentalNames: [],
      selectedServices: {
        id: "",
        sectitle: "",
        subtitle: "",
        paragraph: "",
        productGallery: {},
      },
      selectedPreviewImage: "",
      rentalHour: "1",
      symbol: false,
      currentValue: 1,
      pricePerDay: '',
      costPerDay: '',
      pricePerHour: '',
      costPerHour: ''
      //   price
    };
  },
  mounted() {
    this.getContactInfo();
    // this.getOne();
    const data = JSON.parse(localStorage.getItem("data"));
    // console.log(data)
    if (data) {
      this.fristName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
    }
    alert(this.pricePerDay);
  },
  methods: {
    driverType() {
      if (this.driver === "myself") {
        this.myself = true;
        this.needDriver = false;
      } else {
        this.myself = false;
        this.needDriver = true;
      }
    },
    async AskForServices() {
      try {
        this.loading = true;
        const price = this.selectedServices.price * this.rentalHour;
        //   console.log(this.selectedServices)
        if (this.driver === "myself") {
          const data = new FormData();
          data.append("rentalId", this.selectedServices.id);
          data.append("firstName", this.firstName);
          data.append("lastName", this.lastName);
          data.append("email", this.email);
          data.append("phoneNumber", this.phoneNumber);
          data.append("rentalHours", this.rentalHour);
          data.append("contract", this.contract);
          data.append("idCard", this.NID);
          data.append("licence", this.licence);
          data.append("paymentOption", "MOMO");
          data.append("price", price);
          data.append("rentOption", this.choose);
          data.append("destination", JSON.stringify(this.destination));
          const orderRes = await Rental.rentalOrder(data);
          location.replace(orderRes.data.data.meta.authorization.redirect);
          this.$snotify.success(`${orderRes.data.message}`, {
            closeOnClick: false,
            pauseOnHover: false,
            timeout: 3000,
            showProgressBar: false,
          });
          this.loading = false;
        } else {
          const data = new FormData();
          data.append("rentalId", this.selectedServices.id);
          data.append("firstName", this.firstName);
          data.append("lastName", this.lastName);
          data.append("email", this.email);
          data.append("phoneNumber", this.phoneNumber);
          data.append("rentalHours", this.rentalHour);
          data.append("contract", this.contract);
          data.append("idCard", this.NID);
          data.append("licence", this.licence);
          data.append("driverLicence", this.driverLicence);
          data.append("driverId", this.driverId);
          data.append("driver", JSON.stringify(this.forDriver));
          data.append("paymentOption", "MOMO");
          data.append("price", price);
          data.append("rentOption", this.choose);
          data.append("destination", JSON.stringify(this.destination));
          const res = await Rental.rentOrder(data);
          location.replace(res.data.data.meta.authorization.redirect);
          this.$snotify.success(`${res.data.message}`, {
            closeOnClick: false,
            pauseOnHover: false,
            timeout: 3000,
            showProgressBar: false,
          });
          this.loading = false;
        }
        // this.$router.push('/en/session/thank-you')
      } catch (err) {
        console.log(err.message);
        this.loading = false;
      }
      //   console.log('hhelo')
    },
    togglePreviewImage(image) {
      this.selectedPreviewImage = image;
    },
    async getOne() {
      const url = new URL(window.location.href);
      const str = JSON.stringify(url);
      const arr = str.split("/");
      const strId = arr[arr.length - 1].split('"');
      const id = strId[0];
      try {
        const res = await Rental.getOne(id);
        const response = JSON.stringify(res.data.data);
        const data = JSON.parse("[" + response + "]");

        data.map((el) => {
          this.rentalNames.push({
            name: el.name.en,
            id: el._id,
          });
        });
        alert(JSON.stringify(this.rentalNames));
        // res.data.data.forEach(el => {
        //   res.data.data.forEach(el => {
        // this.rentalNames.push({
        //   name: el.name.en,
        //   id: el._id
        //     });
        //   });
        //   if (this.rentalNames[0].id === el._id) {
        //     (this.selectedServices = {
        //       id: el._id,
        //       sectitle: el.name.en,
        //       price: el.price,
        //       paragraph: el.description.en,
        //       productGallery: {
        //         pic1: this.linksformbackend + el.pictures.pic1,
        //         pic2: this.linksformbackend + el.pictures.pic2,
        //         pic3: this.linksformbackend + el.pictures.pic3
        //         // pic4:this.linksformbackend+el.pictures.pic4,
        //       }
        //     }),
        //       (this.selectedPreviewImage =
        //         this.linksformbackend + el.pictures.pic1);
        //   }
        //   alert(JSON.stringify(this.rentalNames));
        // });
      } catch (error) {
        console.log(error);
      }
    },
    async getContactInfo() {
      const url = new URL(window.location.href);
      const str = JSON.stringify(url);
      const arr = str.split("/");
      const strId = arr[arr.length - 1].split('"');
      const id = strId[0];
      try {
        const res = await Rental.getOne(id);
        const response = JSON.stringify(res.data.data);
        const data = JSON.parse("[" + response + "]");
        const curRes = await currency.getcurrency();
        curRes.data.data.forEach((el) => {
          if (el.symbol === this.selectedCurrency.symbol) {
            this.symbol = true;
            this.currentValue = el.currentValue;
          }
        });
        //   this.servicesName.splice(0,1)
        if (this.selectedLocale === "French") {
          data.forEach((el) => {
            //   console.log(el)
            this.rentalNames.push({
              name: el.name.fr,
              id: el._id,
            });
          });
          data.forEach((el) => {
            //   console.log(el)
            if (this.rentalNames[0].id === el._id) {
              (this.selectedServices = {
                id: el._id,
                sectitle: el.name.fr,
                price: el.price,
                paragraph: el.description.fr,
                productGallery: {
                  pic1: this.linksformbackend + el.pictures.pic1,
                  pic2: this.linksformbackend + el.pictures.pic2,
                  pic3: this.linksformbackend + el.pictures.pic3,
                  // pic4:this.linksformbackend+el.pictures.pic4,
                },
              }),
                // this.price= el.
                (this.selectedPreviewImage =
                  this.linksformbackend + el.pictures.pic1);
            }
          });
        } else {
          data.forEach((el) => {
            data.forEach((el) => {
              this.rentalNames.push({
                name: el.name.en,
                id: el._id,
              });
            });
            if (this.rentalNames[0].id === el._id) {
              (this.selectedServices = {
                id: el._id,
                sectitle: el.name.en,
                price: el.price,
                paragraph: el.description.en,
                productGallery: {
                  pic1: this.linksformbackend + el.pictures.pic1,
                  pic2: this.linksformbackend + el.pictures.pic2,
                  pic3: this.linksformbackend + el.pictures.pic3,
                  // pic4:this.linksformbackend+el.pictures.pic4,
                },
              }),
                (this.selectedPreviewImage =
                  this.linksformbackend + el.pictures.pic1);
            }
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async viewServices(id) {
      try {
        // console.log(id)
        const resOne = await Rental.getRental();
        if (this.selectedLocale.name === "French") {
          resOne.data.data.forEach((el) => {
            if (el._id === id) {
              this.selectedServices = {
                id: el._id,
                sectitle: el.name.fr,
                price: el.price,
                paragraph: el.description.fr,
                productGallery: {
                  pic1: this.linksformbackend + el.pictures.pic1,
                  pic2: this.linksformbackend + el.pictures.pic2,
                  pic3: this.linksformbackend + el.pictures.pic3,
                  // pic4:this.linksformbackend+el.pictures.pic4,
                },
              };
              // console.log(this.linksformbackend+el.pictures.pic1)
              this.selectedPreviewImage = this.selectedServices.productGallery.pic1;
            }
          });
        } else {
          resOne.data.data.forEach((el) => {
            if (el._id === id) {
              this.selectedServices = {
                id: el._id,
                sectitle: el.name.en,
                price: el.price,
                paragraph: el.description.en,
                productGallery: {
                  pic1: this.linksformbackend + el.pictures.pic1,
                  pic2: this.linksformbackend + el.pictures.pic2,
                  pic3: this.linksformbackend + el.pictures.pic3,
                  // pic4:this.linksformbackend+el.pictures.pic4,
                },
              };
              // console.log(this.linksformbackend+el.pictures.pic1)
              this.selectedPreviewImage = this.selectedServices.productGallery.pic1;
            }
          });
        }
        if (window.innerWidth <= 1279) {
          this.darwer = false;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    saveDetails() {
      this.$refs.form.validate();
    },
  },
  computed: {
    ...mapGetters(["linksformbackend", "selectedLocale", "selectedCurrency"]),
  },
};
</script>
