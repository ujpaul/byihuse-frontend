<template>
  <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.ListOfLawyers"
			:subHeading="keyword"
		>
		</emb-page-title>
       <div style="margin-right: 10px">
            <v-row no-gutters>
            <v-col sm="12" xs="12" md="4" lg="=4" xl="4" v-for="lawyer in lawyers" :key="lawyer._id">
                <div class="div-container" >
                <div class="div-number">
                    <img :src="link + lawyer.picture" alt="" width="50%">
                </div>
                <div>
                    <h6>{{lawyer.names}}</h6>
                    <span>groupfinvia@gmail.com|+250 788 748 479</span>
                </div>
                
            </div>
            </v-col>
        </v-row>
       </div>
   </div>
</template>

<script>
import lawyers from 'Api/Lawyers';
import { mapGetters } from "vuex";
export default {
data(){
    return{
        lawyers: [],
        keyword: '',
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
        const res = await lawyers.getLawyersInDistrict(this.keyword,this.$route.params.type);
        this.lawyers = res.data.data;
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