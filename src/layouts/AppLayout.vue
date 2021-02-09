<template>
  <v-app id="inspire">
    <v-app-bar app color="grey lighten-4">
      <v-spacer></v-spacer>
      <img :src="logoInserm" class="logo-inserm">
      <img :src="logoCri" class="logo-cri">
      <img :src="logoUdp" class="logo-udp">
      <v-spacer></v-spacer>
      <a href="#" @click="$router.push('/logout')">Se déconnecter</a>
    </v-app-bar>
    <v-main>
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-container class="main-container grey lighten-4">
            <router-view></router-view>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
    <v-footer color="grey lighten-4" app>
      <v-row>
        <v-col sm-6>
          <span class="white--text"></span>
        </v-col>
        <v-col sm-6 class="text-right">
          <span>&copy; CRI - Fatigue Mentale - 2020</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "AppLayout",
  data: () => ({
    accountItems: [
      {
        icon: "mdi-logout",
        text: "Déconnexion",
        link: "/logout"
      }
    ]
  }),
  methods: {
    logout() {
      this.$router.push({ path: "/logout" });
    }
  },
  computed: {
    logoCri() {
      return require("@/assets/logo-cri.png");
    },
    logoInserm() {
      return require("@/assets/logo-inserm.png");
    },
    logoUdp() {
      return require("@/assets/logo-udp.png");
    }
  }
};
</script>

<style scoped>
.logo-cri {
  height: 80px !important;
  margin: 0 30px;
}
.logo-inserm {
  height: 60px !important;
}
.logo-udp {
  height: 65px !important;
}
.main-container{
  max-width: 1000px;
}
</style>
