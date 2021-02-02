<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <h2>3. Le sommeil de votre enfant</h2>
      <h3>
        A. Diriez-vous que le sommeil de votre enfant s’est dégradé depuis son
        entrée au lycée :
      </h3>
      <v-radio-group
        v-model="questionnaire3.Q3A.reponse"
        :error-messages="Q3AErrors"
        @input="$v.questionnaire3.Q3A.$touch()"
        @blur="$v.questionnaire3.Q3A.$touch()"
        row
      >
        <v-col class="col-3">
          <v-radio label="Oui" value="Oui"></v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Non" value="Non"></v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Autre" value="Autre"></v-radio>
        </v-col>
        <v-col class="col-12" v-if="questionnaire3.Q3A.reponse === 'Autre'">
          <v-text-field
            v-model="questionnaire3.Q3A.precision"
            label="Précisez"
          />
        </v-col>
      </v-radio-group>
      <h3>
        B. Durée du sommeil
      </h3>
      <br />
      En moyenne, <span class="text-decoration-underline">en semaine</span>, combien d’<span class="text-decoration-underline">heures par nuit</span> votre enfant dort-il /
      elle :
      <v-text-field
        v-model="questionnaire3.Q3B1"
        :error-messages="Q3B1Errors"
        @input="$v.questionnaire3.Q3B1.$touch()"
        @blur="$v.questionnaire3.Q3B1.$touch()"
      ></v-text-field>
      <br />
      En moyenne,  <span class="text-decoration-underline">le week-end ou en période de vacances</span>, combien d’ <span class="text-decoration-underline">heures par
      nuit</span> votre enfant dort-il / elle :
      <v-text-field
        v-model="questionnaire3.Q3B2"
        :error-messages="Q3B2Errors"
        @input="$v.questionnaire3.Q3B2.$touch()"
        @blur="$v.questionnaire3.Q3B2.$touch()"
      ></v-text-field>
      <v-col class="col-12">
        <h3>
          C. Pouvez-vous noter, selon vous, la qualité générale du sommeil de
          votre enfant :
        </h3>
        <span class="font-italic">De 1 "très mauvaise" à 10 "excellente"</span>
        <v-radio-group
          v-model="questionnaire3.Q3C"
          :error-messages="Q3CErrors"
          @input="$v.questionnaire3.Q3C.$touch()"
          @blur="$v.questionnaire3.Q3C.$touch()"
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
      </v-col>
      <v-col class="col-12">
        <h3>
          D. Un médecin a-t-il déjà posé un ou plusieurs diagnostic(s) de
          troubles du sommeil chez votre enfant :
        </h3>
        <v-radio-group
          v-model="questionnaire3.Q3D.reponse"
          :error-messages="Q3DErrors"
          @input="$v.questionnaire3.Q3D.$touch()"
          @blur="$v.questionnaire3.Q3D.$touch()"
          row
        >
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"></v-radio>
          </v-col>
        </v-radio-group>
      </v-col>
      <v-col class="col-12" v-if="questionnaire3.Q3D.reponse === 'Oui'">
        <v-textarea
          v-model="questionnaire3.Q3D.precision"
          filled
          label=" Si oui, précisez la (les) période(s) et le(s) type(s) de troubles du sommeil rencontré(s) par votre enfant"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col class="col-12">
        <h3>
          E. Votre enfant a-t-il par le passé ou est-il actuellement traité pour
          des troubles du sommeil :
        </h3>
        <v-radio-group
          v-model="questionnaire3.Q3E.reponse"
          :error-messages="Q3EErrors"
          @input="$v.questionnaire3.Q3E.$touch()"
          @blur="$v.questionnaire3.Q3E.$touch()"
          row
        >
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"></v-radio>
          </v-col>
        </v-radio-group>
      </v-col>
      <v-col class="col-12" v-if="questionnaire3.Q3E.reponse === 'Oui'">
        <v-textarea
          v-model="questionnaire3.Q3E.precision"
          filled
          label="Si oui, souhaitez-vous précisez ?"
          auto-grow
        ></v-textarea>
      </v-col>
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
  name: "Questionnaire3",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      degradationList: [
        { text: "Oui", value: "Oui" },
        { text: "Non", value: "Non" },
        { text: "Autre", value: "Autre" }
      ],
      questionnaire3: {
        Q3A: this.$store.state.questionnaire3.Q3A || {
          reponse: "",
          precision: ""
        },
        Q3B1: this.$store.state.questionnaire3.Q3B1 || "",
        Q3B2: this.$store.state.questionnaire3.Q3B2 || "",
        Q3C: this.$store.state.questionnaire3.Q3C || "",
        Q3D: this.$store.state.questionnaire3.Q3D || {
          reponse: "",
          precision: ""
        },
        Q3E: this.$store.state.questionnaire3.Q3E || {
          reponse: "",
          precision: ""
        }
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    questionnaire3: {
      Q3A: {
        reponse: { required }
      },
      Q3B1: { required },
      Q3B2: { required },
      Q3C: { required },
      Q3D: {
        reponse: { required }
      },
      Q3E: {
        reponse: { required }
      }
    }
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE3", this.questionnaire3);
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
              id: 3,
              content: this.questionnaire3,
              userId: this.$store.state.userId
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + this.$store.state.token
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            this.$emit("next", 4);
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
          });
      }
    }
  },
  computed: {
    Q3AErrors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3A.reponse.$dirty) return errors;
      !this.$v.questionnaire3.Q3A.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3B1Errors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3B1.$dirty) return errors;
      !this.$v.questionnaire3.Q3B1.required && errors.push("Champs requis");
      return errors;
    },
    Q3B2Errors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3B2.$dirty) return errors;
      !this.$v.questionnaire3.Q3B2.required && errors.push("Champs requis");
      return errors;
    },
    Q3CErrors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3C.$dirty) return errors;
      !this.$v.questionnaire3.Q3C.required && errors.push("Champs requis");
      return errors;
    },
    Q3DErrors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3D.reponse.$dirty) return errors;
      !this.$v.questionnaire3.Q3D.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3EErrors() {
      const errors = [];
      if (!this.$v.questionnaire3.Q3E.reponse.$dirty) return errors;
      !this.$v.questionnaire3.Q3E.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    progression() {
      let progression = 2 * (100 / 6);
      const fields = [
        this.questionnaire3.Q3A,
        this.questionnaire3.Q3B1,
        this.questionnaire3.Q3B1,
        this.questionnaire3.Q3C,
        this.questionnaire3.Q3D.reponse,
        this.questionnaire3.Q3E.reponse
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
