<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <h2>4. Vos impressions générales</h2>
      <h3>
        A. Selon vous, la fatigabilité mentale de votre enfant représente-t-elle
        un risque pour la poursuite de son parcours universitaire ou
        professionnel :
      </h3>
      <span class="font-italic">De 1 "très peu important" à 10 "très important"</span>
      <v-radio-group
        v-model="questionnaire4.Q4A"
        :error-messages="Q4AErrors"
        @input="$v.questionnaire3.Q4A.$touch()"
        @blur="$v.questionnaire3.Q4A.$touch()"
        row
      >
        <v-col class="col-3">
          <v-radio
            label="Très peu voire pas du tout"
            value="Très peu voire pas du tout"
          ></v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Un peu" value="Un peu"></v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Assez" value="Assez"></v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Beaucoup" value="Beaucoup"></v-radio>
        </v-col>
      </v-radio-group>
      <h3>
        B. L’impact de la fatigue mentale actuelle de votre enfant sur la vie de
        famille :
      </h3>
      <span class="font-italic">De 1 "très peu important" à 10 "très important"</span>
      <v-radio-group
        v-model="questionnaire4.Q4B"
        :error-messages="Q4BErrors"
        @input="$v.questionnaire4.Q4B.$touch()"
        @blur="$v.questionnaire4.Q4B.$touch()"
        row
      >
        <v-col class="col-1">
          <v-radio label="1" value="1"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="2" value="2"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="3" value="3"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="4" value="4"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="5" value="5"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="6" value="6"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="7" value="7"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="8" value="8"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="9" value="9"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="10" value="10"></v-radio>
        </v-col>
      </v-radio-group>
      <h3>
        C. Votre niveau d’inquiétude quant à l’impact de la fatigue mentale
        actuelle de votre enfant sur sa qualité de vie générale :
      </h3>
      <span class="font-italic">De 1 "peu inquiet" à 10 "très inquiet"</span>
      <v-radio-group
        v-model="questionnaire4.Q4C"
        :error-messages="Q4CErrors"
        @input="$v.questionnaire4.Q4C.$touch()"
        @blur="$v.questionnaire4.Q4C.$touch()"
        row
      >
        <v-col class="col-1">
          <v-radio label="1" value="1"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="2" value="2"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="3" value="3"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="4" value="4"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="5" value="5"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="6" value="6"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="7" value="7"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="8" value="8"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="9" value="9"></v-radio>
        </v-col>
        <v-col class="col-1">
          <v-radio label="10" value="10"></v-radio>
        </v-col>
      </v-radio-group>
      <v-btn
        class="btn primary boutons"
        @click="saveForm()"
        >Enregistrer et terminer plus tard</v-btn
      >
      <v-btn class="btn primary" @click="sendForm()">Suivant</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import ProgressionBar from "@/components/ProgressionBar";
export default {
  name: "Questionnaire4",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      questionnaire4: {
        Q4A: this.$store.state.questionnaire4.Q4A || "",
        Q4B: this.$store.state.questionnaire4.Q4B || "",
        Q4C: this.$store.state.questionnaire4.Q4C || ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    questionnaire4: {
      Q4A: { required },
      Q4B: { required },
      Q4C: { required }
    }
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE4", this.questionnaire4);
      this.$router.push({ path: "/" });
    },
    sendForm() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        axios
          .patch(
            process.env.VUE_APP_ROOT_API + "/questionnaire",
            {
              id: 4,
              content: this.questionnaire4,
              userId: this.$store.state.auth.user.userId
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + this.$store.state.auth.user.token
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            this.$emit("next", 5);
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
          });
      }
    }
  },
  computed: {
    Q4AErrors() {
      const errors = [];
      if (!this.$v.questionnaire4.Q4A.$dirty) return errors;
      !this.$v.questionnaire4.Q4A.required && errors.push("Champs requis");
      return errors;
    },
    Q4BErrors() {
      const errors = [];
      if (!this.$v.questionnaire4.Q4B.$dirty) return errors;
      !this.$v.questionnaire4.Q4B.required && errors.push("Champs requis");
      return errors;
    },
    Q4CErrors() {
      const errors = [];
      if (!this.$v.questionnaire4.Q4C.$dirty) return errors;
      !this.$v.questionnaire4.Q4C.required && errors.push("Champs requis");
      return errors;
    },
    progression() {
      let progression = 3 * (100 / 6);
      const fields = [
        this.questionnaire4.Q4A,
        this.questionnaire4.Q4B,
        this.questionnaire4.Q4C
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += 100 / 6 / fields.length;
        }
      }
      return Math.round(progression);
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
}
.boutons {
  margin: 30px 30px 30px 0;
}
</style>
