<template>
  <div>
      <div class="container">
      <div class="flex-container">
          <div>
                <img class="img-container" :src="link + tech[0].passport" alt="">
            </div>
            <div>
                <h5>{{tech[0].names}}</h5>
                <span>{{tech[0].type}}</span>
            </div>
      </div>
  </div>
  <div class="hr"></div>
  <v-container grid-list-xl>
          <v-layout row wrap>
              <v-flex xs12 sm12 md4 lg4 xl4>
                    <template>
            <v-card
                class="mx-auto"
                max-width="344"
            >
                <v-img
                src="/static/images/pdf.jpg"
                height="200px"
                ></v-img>

                <v-card-title>
                Diploma({{tech[0].level}})
                </v-card-title>
            </v-card>
        </template>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4>
                  <template>
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                    <v-img
                    src="/static/images/pdf.jpg"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    CV
                    </v-card-title>
                </v-card>
         </template>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4>
                  <template>
            <v-card
                class="mx-auto"
                max-width="344"
            >
                <a :href="link + tech[0].workedOnImage" target="_blank">
                <v-img
                :src="link + tech[0].workedOnImage"
                height="200px"
                ></v-img>

                <v-card-title>
                Project worked on previously
                </v-card-title>
            </a>
                <v-card-subtitle>
                </v-card-subtitle>
            </v-card>
        </template>
              </v-flex>
          </v-layout>
    </v-container>
  </div>
</template>
<script>
import Tech from 'Api/Technician'
import { mapGetters } from "vuex";
export default {
    data(){
    return {
        id: '',
        tech: [],
        keys: [],
        link: ''
    }
},
computed: {
    ...mapGetters([
      "linksformbackend",
    ])
  },
async mounted(){
    try {
        this.id = this.$route.params.userId;
        const res = await Tech.getTechnician(this.id);
        this.tech = res.data.data;
        this.keys = Object.keys(this.tech[0]);
    } catch (error) {
        console.log(error);
    }
    this.link = this.linksformbackend
}
}
</script>

<style scoped>
.container {
    margin: 30px 10px 10px 30px;
}
.hr{
    width: 100%;
    border-bottom: 4px #eee solid;
    margin: 10px 30px 10px 10px;
}
.flex-container{
    display: flex;
    margin: 20px;
}
.img-container{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    margin-right: 10px;
}
.flex-item{
    margin-left: 10px;
}
</style>