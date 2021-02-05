<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <h2>
        Contacts et futures recherches
      </h2>
      <p>
        Souhaitez-vous être informé.e.s des résultats de la recherche
        (publication d’articles et conférences présentant les résultats de
        l’étude)
      </p>
      <v-radio-group
        v-model="questionnaire6.Q6A.reponse"
        :error-messages="Q6AReponseErrors"
        @input="$v.questionnaire6.Q6A.reponse.$touch()"
        @blur="$v.questionnaire6.Q6A.reponse.$touch()"
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-text-field
        v-model="questionnaire6.Q6A.precision"
        label="Précisez l’adresse email à laquelle nous pourrons vous communiquer ces informations :"
        v-if="questionnaire6.Q6A.reponse === 'Oui'"
        :error-messages="Q6APrecisionErrors"
        @input="$v.questionnaire6.Q6A.precision.$touch()"
        @blur="$v.questionnaire6.Q6A.precision.$touch()"
      ></v-text-field>
      <br /><br />
      <p>
        Cette étude exploratoire pourrait donner lieu à d’autres études et
        projets de recherche en vue de valider un questionnaire en français sur
        la fatigue mentale des lycéen.ne.s avec autisme et de développer, à
        moyen-terme, une application pour téléphone permettant aux
        adolescent.e.s et jeunes adultes autistes de monitorer leur propre
        fatigabilité pour la repérer et la minimiser.
      </p>
      <p>
        Souhaitez-vous en être informé.e.s et pouvoir éventuellement y prendre
        part :
      </p>
      <v-radio-group
        v-model="questionnaire6.Q6B.reponse"
        :error-messages="Q6BReponseErrors"
        @input="$v.questionnaire6.Q6A.reponse.$touch()"
        @blur="$v.questionnaire6.Q6A.reponse.$touch()"
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-text-field
        v-model="questionnaire6.Q6B.precision"
        label="Précisez l’adresse email à laquelle nous pourrons vous communiquer ces informations :"
        v-if="questionnaire6.Q6B.reponse === 'Oui'"
        :error-messages="Q6BPrecisionErrors"
        @input="$v.questionnaire6.Q6B.precision.$touch()"
        @blur="$v.questionnaire6.Q6B.precision.$touch()"
      ></v-text-field>
      <br />
      <v-textarea
        name="context"
        filled
        v-model="questionnaire6.Q6C"
        label="Souhaitez-vous ajouter quelque chose :"
        auto-grow
      ></v-textarea>
      <p>
        Nous vous remercions beaucoup pour votre participation et nous tenons à
        votre disposition pour toute question ou commentaire, à l’adresse
        suivante : etude.autisme@protonmail.com
      </p>
      <p>
        Morgane Aubineau<br />
        Chercheuse postdoctorale<br />
        Centre de Recherches Interdisciplinaires :
        <a href="https://www.cri-paris.org/fr" target="_blank"
          >https://www.cri-paris.org/fr</a
        >
      </p>
      <p>
        Plus d’informations sur l’étude :
        <a href="https://cutt.ly/etude_fatigue" target="_blank"
          >https://cutt.ly/etude_fatigue</a
        >
      </p>
      <v-btn class="btn primary boutons" @click="saveForm()"
        >Enregistrer et terminer plus tard</v-btn
      >
      <v-btn class="btn primary" @click="sendForm()">Terminer</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import ProgressionBar from "@/components/ProgressionBar";
export default {
  name: "Questionnaire6",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      questionnaire6: {
        Q6A: this.$store.state.questionnaire6.Q6A || {
          reponse: "",
          precision: ""
        },
        Q6B: this.$store.state.questionnaire6.Q6B || {
          reponse: "",
          precision: ""
        },
        Q6C: this.$store.state.questionnaire6.Q6C || ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    questionnaire6: {
      Q6A: {
        reponse: { required },
        precision: { email }
      },
      Q6B: {
        reponse: { required },
        precision: { email }
      }
    }
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE6", this.questionnaire6);
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
              id: 6,
              content: this.questionnaire6,
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
            this.$router.push("/");
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
          });
      }
    }
  },
  computed: {
    Q6AReponseErrors() {
      const errors = [];
      if (!this.$v.questionnaire6.Q6A.reponse.$dirty) return errors;
      !this.$v.questionnaire6.Q6A.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q6APrecisionErrors() {
      const errors = [];
      if (!this.$v.questionnaire6.Q6A.precision.$dirty) return errors;
      !this.$v.questionnaire6.Q6A.precision.email &&
        errors.push("Doit être une adresse Email");
      return errors;
    },
    Q6BReponseErrors() {
      const errors = [];
      if (!this.$v.questionnaire6.Q6B.reponse.$dirty) return errors;
      !this.$v.questionnaire6.Q6B.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q6BPrecisionErrors() {
      const errors = [];
      if (!this.$v.questionnaire6.Q6B.precision.$dirty) return errors;
      !this.$v.questionnaire6.Q6B.precision.email &&
        errors.push("Doit être une adresse Email");
      return errors;
    },
    progression() {
      let progression = Math.round(5 * (100 / 6));
      const fields = [
        this.questionnaire6.Q6A.reponse,
        this.questionnaire6.Q6B.reponse
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += 100 / 6 / fields.length;
        }
      }
      return Math.round(progression);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.boutons {
  margin: 30px 30px 30px 0;
}
</style>
