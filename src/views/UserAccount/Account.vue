<template>
  <div class="account-wrap">
    <div class="inner-container">
      <div class="bg-white final-receipt-page section-gap">
        <div class="account-info">
          <div class="container grid-list-xl">
            <div class="layout justify-start mt-0 mb-4 mx-0">
              <div class="login-user-img">
                <img src="/static/images/logo/face.png" width="70" alt="Active User" />
              </div>
              <div class="px-4">
                <h4>{{$t("message.Hi")}},{{firstName}}</h4>
                <div class="text-muted text-xl">{{email}}</div>
              </div>
            </div>
            <v-layout row wrap fill-height profile-list>
              <v-flex xs12 sm12 md4 lg3 xl2 user-nav-list px-0>
                <div class="emb-card account-block fill-height py-4">
                  <template v-for="(option,key,index) in settings">
                    <v-list
                      v-for="cateogary in settings[key]"
                      :key="cateogary.name"
                      class="py-0 text-center"
                    >
                      <v-list-item
                        @click="onTabChange(index)"
                        :to="'/'+$i18n.locale+cateogary.path"
                      >
                        <v-list-item-action class="ma-0">
                          <v-icon>{{cateogary.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content class="py-0 text-left">
                          <v-list-item-title>
                            <span>{{$t(cateogary.title)}}</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md8 lg9 xl9 user-content-wrapper>
                <div v-for="(option,key,index) in settings" :key="key">
                  <router-view v-if="index == selectedTab"></router-view>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      email: "",
      settings: {
        orderHistory: [
          {
            title: "message.OrderHistory",
            icon: "history",
            path: "/account/order-history",
            id: "orderHistory"
          }
        ],
        profile: [
          {
            title: "message.Profile",
            icon: "account_circle",
            path: "/account/profile",
            id: "profile"
          }
        ],
        editNames: [
          {
            title: "message.EditNames",
            icon: "account_circle",
            path: "/account/profile-edit/name",
            id: "addresses"
          }
        ],
        editEmails: [
          {
            title: "message.EditEmails",
            icon: "account_circle",
            path: "/account/profile-edit/email",
            id: "addresses"
          }
        ],
        editPassword: [
          {
            title: "message.EditPassword",
            icon: "account_circle",
            path: "/account/profile-edit/password",
            id: "addresses"
          }
        ],
        command: [
          {
            title: "message.MyCommand",
            icon: "account_circle",
            path: "/account/command",
          }
        ],
        wallet: [
          {
            title: "message.Wallet",
            icon: "account_circle",
            path: "/account/my-wallet",
            id: "addresses"
          }
        ]
        // cards:[
        // 	{
        // 		title:"Saved Cards",
        // 		icon:"credit_card",
        // 		path:"/account/cards",
        // 		id:"cards"
        // 	},
        // ]
      },
      selectedTab: 0
    };
  },
  methods: {
    onTabChange(key) {
      this.selectedTab = key;
      // this.$store.state.lastName = 'hello'
      // console.log(this.lastName, this.firstName, this.email, this.role, this.assignedDepartments)
    }
  },
  computed: {
    ...mapGetters([
      "firstName",
      "lastName",
      "email",
      "role",
      "assignedDepartments",
      "refund"
    ])
  },
  created() {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      this.firstName = data.firstName;
      this.email = data.email;
    }
  }
};
</script>
