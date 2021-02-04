<template>
  <v-app id="inspire"> </v-app>
</template>

<script>
// import axios from "axios";

export default {
  methods: {},
  created() {
    this.$store.dispatch('logout')
      .then( () => {
        this.isLoading = false;
        this.$router.push('/login');
      });
  }
    // axios
    //   .patch(
    //     process.env.VUE_APP_ROOT_API + "/users/logout",
    //     {
    //       id: this.$store.state.userId,
    //       consent: true
    //     },
    //     {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "Bearer " + this.$store.state.token
    //       }
    //     }
    //   )
    //   .then(response => {
    //     this.isLoading = false;
    //     this.$store.commit("LOGOUT");
    //     this.$router.push({ path: "/" });
    //   })
    //   .catch(error => {
    //     this.isLoading = false;
    //     this.error = true;
    //   });
  // }
};
</script>
