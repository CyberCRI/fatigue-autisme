<template>
  <div class="container--fluid justify">
    <Questionnaire0 v-if="questionnaire === 0"></Questionnaire0>
    <Questionnaire1
      v-else-if="questionnaire == 1"
      @next="next"
    ></Questionnaire1>
    <Questionnaire2
      v-else-if="questionnaire == 2"
      @next="next"
    ></Questionnaire2>
    <Questionnaire3
      v-else-if="questionnaire == 3"
      @next="next"
    ></Questionnaire3>
    <Questionnaire4
      v-else-if="questionnaire == 4"
      @next="next"
    ></Questionnaire4>
    <Questionnaire5
      v-else-if="questionnaire == 5"
      @next="next"
    ></Questionnaire5>
    <Questionnaire6
      v-else-if="questionnaire == 6"
      @next="next"
    ></Questionnaire6>
    <div class="offset-1 col-10">
      <v-btn
        v-if="questionnaire == 0"
        class="btn primary boutons"
        @click="start"
        >Commencer</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Questionnaire0 from "@/components/Questionnaire-0";
import Questionnaire1 from "@/components/Questionnaire-1";
import Questionnaire2 from "@/components/Questionnaire-2";
import Questionnaire3 from "@/components/Questionnaire-3";
import Questionnaire4 from "@/components/Questionnaire-4";
import Questionnaire5 from "@/components/Questionnaire-5";
import Questionnaire6 from "@/components/Questionnaire-6";
export default {
  components: {
    Questionnaire0,
    Questionnaire1,
    Questionnaire2,
    Questionnaire3,
    Questionnaire4,
    Questionnaire5,
    Questionnaire6
  },
  data() {
    return {
      questionnaire: 0
    };
  },
  mixins: [],
  methods: {
    start() {
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            "/questionnaire/" +
            this.$store.state.auth.user.userId,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + this.$store.state.auth.user.token
            }
          }
        )
        .then(response => {
          if (response.data[0] && response.data[0].questionnaire5) {
            this.questionnaire = 6;
          }
          else if (response.data[0] && response.data[0].questionnaire4) {
            this.questionnaire = 5;
          } else if (response.data[0] && response.data[0].questionnaire3) {
            this.questionnaire = 4;
          } else if (response.data[0] && response.data[0].questionnaire2) {
            this.questionnaire = 3;
          } else if (response.data[0] && response.data[0].questionnaire1) {
            this.questionnaire = 2;
          } else {
            this.questionnaire = 1;
          }
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    },
    next(e) {
      this.questionnaire = e;
    }
  },
  computed: {}
};
</script>

<style scoped>
.boutons {
  margin-right: 30px;
}
.justify {
  text-align: justify ;
}
</style>
