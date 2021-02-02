export default {
  created: function () {
    this.authorize();
  },
  methods: {
    authorize: function () {
      if(!this.$store.getters.isAuthorized && this.$route.name !== "Authorization") {
        this.$router.push('/authorization')
      }
      console.log("Now printing from a mixin function")
    }
  }
}