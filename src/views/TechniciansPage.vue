<template>
  <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.ListOfTechnicians"
			:subHeading="type"
		>
		</emb-page-title>
       <div style="margin-right: 10px">
            <v-row no-gutters>
                <!-- <router-link :to="{ name: 'TechnicianProfile'}"> -->
                    <v-col sm="12" xs="12" md="4" lg="=4" xl="4" v-for="tech in technicians" :key="tech._id">
                        <div class="div-container" >
                            <div class="div-number">
                                <img :src="link + tech.passport" alt="" width="50%">
                            </div>
                            <router-link :to="{name: 'tech', params: { userId: tech._id}}">
                                <div>
                                <h6>{{tech.names}}</h6>
                                <span>groupfinvia@gmail.com|+250 788 748 479</span>
                            </div>
                            </router-link>
                        </div>
                    </v-col>
                <!-- </router-link> -->
        </v-row>
       </div>
   </div>
</template>

<script>
import Tech from 'Api/Technician';
import { mapGetters } from "vuex";
export default {
data(){
    return{
        technicians: [],
        keyword: '',
        type: '',
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
        this.keyword = this.$route.params.keyword
        this.type = this.$route.params.type
        const res = await Tech.getTechnicians(this.keyword,this.type);
        this.technicians = res.data.data;
    } catch (error) {
        console.log(error);
    }
    this.link = this.linksformbackend
}
}
</script>

<style scoped>
.div-container{
    margin: 20px 0 20px 20px; 
    display: flex;
    background: #eee;
    border-radius: 5px;
    padding-left: 10px;
    padding-top: 10px;
}
.div-number{
    width: 80px;
    height: 50px;
    border-radius: 50px;
    color: #fff;
    margin-right: 0;
    margin-top: 10px;
}
</style>