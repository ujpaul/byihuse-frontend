<template>
  <div class="emb-product-add" style="margin: 20px">
    <v-row>
      <v-col cols="12" sm="9" md="10" lg="10" class="mx-auto">
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <div class="product-images-wrap d-flex">
              <div class="product-images mr-4">
                <div class="thumb-wrap" for="upload">
                  <v-img :src="fileOne" alt="images" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpic"
                    ref="pic1"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
                <div class="thumb-wrap" for="upload">
                  <v-img :src="filetwo" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpict"
                    ref="pic2"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
                <div class="thumb-wrap" for="upload">
                  <v-img :src="filethree" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpich"
                    ref="pic3"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
                <div class="thumb-wrap" for="upload">
                  <v-img :src="filefour" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpicf"
                    ref="pic4"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
                <div class="thumb-wrap" for="upload">
                  <v-img :src="filefive" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpicfive"
                    ref="pic5"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
                <div class="thumb-wrap" for="upload">
                  <v-img :src="filesix" height="70" />
                  <div class="edit-btn d-flex justify-center align-center">
                    <v-icon dark>add</v-icon>
                  </div>
                  <input
                    type="file"
                    @change="selectpicsix"
                    ref="pic6"
                    id="upload"
                    accept="image/*"
                    class="upload-img"
                  />
                </div>
              </div>
              <div class="product-preview-wrap">
                <v-img :src="fileOne" style="width: 80%;" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" class="content-wrap pl-md-6">

            <v-text-field prepend-icon="add" v-model="names" :label="$t('message.yourNames')"></v-text-field>
            <v-text-field prepend-icon="add" v-model="email" :label="$t('message.yourEmail')"></v-text-field>
            <v-text-field prepend-icon="add" v-model="phone" :label="$t('message.yourPhone')"></v-text-field>
            <v-text-field prepend-icon="add" v-model="name" :label="$t('message.propertyName')"></v-text-field>
            <v-text-field prepend-icon="add" v-model="description" :label="$t('message.propertyDescription')"></v-text-field>
            <v-text-field
              prepend-icon="add"
              v-model="price"
              class="price-input"
              :placeholder="$t('message.pricePerHour')"
            ></v-text-field>
            <v-text-field
              prepend-icon="add"
              v-model="pricePerDay"
              class="price-input"
              :placeholder="$t('message.pricePerDay')"
            ></v-text-field>
            <div class="d-flex">
                <v-btn
              color="accent"
              @click="uploadProduct"
              :loading="loading"
              class="mx-3"
              large
            >{{$t('message.registerProperty')}}</v-btn>
            <h5 style="color: red;margin-top: 10px;">{{$t('message.serviceFee')}}: 6000 RWF</h5>
            </div>
          </v-col>
          <v-flex xs12 sm12 md6 lg6 xl8>
        <AkiraCalcultaion :VAT="900" :fees="fees" :akira="165"/>
       </v-flex>
        </v-row>
      </v-col>
      
    </v-row>
  </div>
</template>
<script>
import rental from "Api/rental.js";
import AkiraCalcultaion from '../components/Global/AkiraCalculation.vue'
export default {
  components:{
    AkiraCalcultaion
  },
  data() {
    return {
      loading: false,
      fees:"6,000",
      fileOne: "https://via.placeholder.com/625x800",
      filetwo: "https://via.placeholder.com/625x800",
      filethree: "https://via.placeholder.com/625x800",
      filefour: "https://via.placeholder.com/625x800",
      filefive: "https://via.placeholder.com/625x800",
      filesix: "https://via.placeholder.com/625x800",
      names: '',
      email: '',
      phone: '',
      price: "",
      assignedDepartments: "",
      data: "",
      assignedDepartmentsId: "",
      Departments: [],
      allcategories: [],
      selectablecategories: [],
      selectedcategory: "",
      selectedCompany: [],
      allCompany: "",
      assignedCategoriesId: "",
      selected: "",
      selectedid: "",
      description: '',
      prictures: {
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
        pic5: "",
        pic6: ""
      },
      pricePerDay: '',
    };
  },
  methods: {
    selectpic(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.fileOne = e.target.result;
        this.pictures.pic1 = this.fileOne;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    selectpict(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.filetwo = e.target.result;
        this.pictures.pic1 = this.filetwo;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    selectpich(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.filethree = e.target.result;
        this.pictures.pic1 = this.filethree;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    selectpicf(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.filefour = e.target.result;
        this.pictures.pic1 = this.filefour;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    selectpicfive(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.filefive = e.target.result;
        this.pictures.pic1 = this.filefive;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    selectpicsix(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.filesix = e.target.result;
        this.pictures.pic1 = this.filesix;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    async uploadProduct() {
      this.loading = true;
      try {
        let container = new FormData();
        container.append("description", this.description);
        container.append("names", this.names);
        container.append("email", this.email);
        container.append("phone", this.phone);
        container.append("property", 'Sonorisation');
        container.append("name", this.name);
        container.append("price", this.price);
        container.append("pricePerDay", this.pricePerDay);
        container.append("picture1", this.$refs.pic1.files[0]);
        container.append("picture2", this.$refs.pic2.files[0]);
        container.append("picture3", this.$refs.pic3.files[0]);
        container.append("picture4", this.$refs.pic4.files[0]);
        container.append("picture5", this.$refs.pic5.files[0]);
        container.append("picture6", this.$refs.pic6.files[0]);
        const resProcts = await rental.createCusomterProperty(container);
        console.log(resProcts);
        this.loading = false;
        this.$snotify.success(`${resProcts.data.message}`, {
          closeOnClick: false,
          pauseOnHover: false,
          timeout: 1000,
          showProgressBar: false
        });
        location.replace(resProcts.data.data.meta.authorization.redirect);
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  },
};
</script>