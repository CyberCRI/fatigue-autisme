<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <h2>2. Le rythme de vie de votre enfant</h2>
      <p class="font-italic">
        L’emploi du temps des élèves, pendant et hors des périodes scolaires,
        peut avoir une influence sur la fatigue mentale observée par les
        parents.
      </p>
      <p>
        Afin d’examiner plus en détails ces aspects, pouvez-vous préciser
        approximativement :
      </p>
      <h3>A. Trajet scolaire</h3>
      <br />
      La durée moyenne
      <span class="text-decoration-underline">quotidienne</span> du trajet pour
      se rendre de l’école à la maison (aller-retour compris)
      <v-text-field
        v-model="questionnaire2.Q2A1"
        :error-messages="Q2A1Errors"
        @input="$v.questionnaire2.Q2A1.$touch()"
        @blur="$v.questionnaire2.Q2A1.$touch()"
      >
      </v-text-field>
      <v-row>
        <v-col class="col-6">
          <v-select
            v-model="questionnaire2.Q2A2.reponse"
            :items="transportList"
            item-text="text"
            item-value="value"
            label="Par quel moyen de transport principal votre enfant se rend-il à l’école chaque jour :"
            persistent-hint
            :error-messages="Q2A2Errors"
            @input="$v.questionnaire2.Q2A2.$touch()"
            @blur="$v.questionnaire2.Q2A2.$touch()"
          ></v-select>
        </v-col>
        <v-col class="col-6" v-if="questionnaire2.Q2A2.reponse === 'Autre'">
          <v-text-field label="Précisez" v-model="questionnaire2.Q2B.autre">
          </v-text-field>
        </v-col>
      </v-row>
      <h3>B. Devoirs scolaires</h3>
      <br />
      <p>
        La durée moyenne
        <span class="text-decoration-underline">quotidienne</span> que votre
        enfant consacre à ses devoirs scolaires ?
      </p>
      <v-text-field
        v-model="questionnaire2.Q2B"
        :error-messages="Q2BErrors"
        @input="$v.questionnaire2.Q2B.$touch()"
        @blur="$v.questionnaire2.Q2B.$touch()"
      >
      </v-text-field>
      <h3>C. Accompagnements</h3>
      <br />
      La durée moyenne
      <span class="text-decoration-underline">hebdomadaire</span> consacrée aux
      accompagnements (hors scolaire) dont bénéficie votre enfant, temps de
      trajet aller-retour inclus
      <v-text-field
        v-model="questionnaire2.Q2C"
        :error-messages="Q2CErrors"
        @input="$v.questionnaire2.Q2C.$touch()"
        @blur="$v.questionnaire2.Q2C.$touch()"
      >
      </v-text-field>
      <h3>D. Activités extrascolaires</h3>
      <br />
      La durée moyenne
      <span class="text-decoration-underline">hebdomadaire</span> que votre
      enfant consacre aux activités extrascolaires (club de sport, école de
      musique, théâtre, scoutisme, association, etc.), temps de trajet inclus :
      <v-text-field
        v-model="questionnaire2.Q2D"
        :error-messages="Q2DErrors"
        @input="$v.questionnaire2.Q2D.$touch()"
        @blur="$v.questionnaire2.Q2D.$touch()"
      >
      </v-text-field>
      <h3>E. Temps libre</h3>
      <br />
      La durée moyenne de « temps libre »
      <span class="text-decoration-underline">quotidienne</span> dont votre
      enfant dispose en période scolaire,
      <span class="text-decoration-underline">en semaine</span><br />
      <span class="font-italic"
        >Par « temps libre », nous entendons ici une période durant laquelle le
        jeune n’a aucun impératif (devoirs, sorties, participation à la vie
        famiale, etc.) et peut se retrouver seul (ou avec d’autres personnes,
        s’il l’a décidé, et en dehors des activités planifiées)"</span
      >
      <v-text-field
        v-model="questionnaire2.Q2E1"
        persistent-hint
        :error-messages="Q2E1Errors"
        @input="$v.questionnaire2.Q2E1.$touch()"
        @blur="$v.questionnaire2.Q2E1.$touch()"
      >
      </v-text-field
      ><br />
      La durée moyenne de « temps libre »
      <span class="text-decoration-underline">quotidienne</span> dont votre
      enfant dispose le week-end ou en période de vacances
      <v-text-field
        v-model="questionnaire2.Q2E2"
        :error-messages="Q2E2Errors"
        @input="$v.questionnaire2.Q2E2.$touch()"
        @blur="$v.questionnaire2.Q2E2.$touch()"
      >
      </v-text-field>
      <v-row>
        <v-col class="col-12">
          <h3>
            F. Votre enfant vous fait-il / elle part explicitement de son
            souhait d’avoir davantage de temps pour lui / elle :
          </h3>
          <v-radio-group
            v-model="questionnaire2.Q2F"
            :error-messages="Q2FErrors"
            @input="$v.questionnaire2.Q2F.$touch()"
            @blur="$v.questionnaire2.Q2F.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="Jamais" value="Jamais"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="Rarement" value="Rarement"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="Régulièrement" value="Régulièrement"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio
                label="Presque toujours"
                value="Presque toujours"
              ></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h3>
            G. Votre enfant rentre-t-il à la maison à l’heure du déjeuner :
          </h3>
          <v-radio-group
            v-model="questionnaire2.Q2G"
            :error-messages="Q2GErrors"
            @input="$v.questionnaire2.Q2G.$touch()"
            @blur="$v.questionnaire2.Q2G.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="Jamais" value="Jamais"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="Rarement " value="Rarement"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="Régulièrement" value="Régulièrement"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio
                label="Presque toujours"
                value="Presque toujours"
              ></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h3>H. Diriez-vous que l’alimentation de votre enfant est :</h3>
          <v-radio-group
            v-model="questionnaire2.Q2H.reponse"
            :error-messages="Q2HErrors"
            @input="$v.questionnaire2.Q2H.reponse.$touch()"
            @blur="$v.questionnaire2.Q2H.reponse.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="Satisfaisante" value="Satisfaisante"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio
                label="Moyennement satisfaisante"
                value="Moyennement satisfaisante"
              ></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio
                label="Quelque peu problématique"
                value="Quelque peu problématique"
              ></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio
                label="Très problématique"
                value="Très problématique"
              ></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
        <v-col class="col-12">
          <v-textarea
            v-model="questionnaire2.Q2H.precision"
            name="context"
            filled
            label="Souhaitez-vous préciser ?"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn class="btn primary boutons" @click="saveForm()"
        >Enregistrer et terminer plus tard</v-btn
      >
      <v-btn class="btn primary" @click="sendForm()">Suivant</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProgressionBar from "@/components/ProgressionBar";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Questionnaire2",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      transportList: [
        {
          text: "À pieds, à vélo ou à trotinette",
          value: "À pieds, à vélo ou à trotinette",
        },
        { text: "En voiture", value: "En voiture" },
        { text: "En taxi", value: "En taxi" },
        { text: "En transports en commun", value: "En transports en commun" },
        { text: "Autre", value: "Autre" },
      ],
      questionnaire2: {
        Q2A1: this.$store.state.questionnaire2.Q2A1 || "",
        Q2A2: this.$store.state.questionnaire2.Q2A2 || {
          reponse: "",
          autre: "",
        },
        Q2B: this.$store.state.questionnaire2.Q2B || "",
        Q2C: this.$store.state.questionnaire2.Q2C || "",
        Q2D: this.$store.state.questionnaire2.Q2D || "",
        Q2E1: this.$store.state.questionnaire2.Q2E1 || "",
        Q2E2: this.$store.state.questionnaire2.Q2E2 || "",
        Q2F: this.$store.state.questionnaire2.Q2F || "",
        Q2G: this.$store.state.questionnaire2.Q2G || "",
        Q2H: this.$store.state.questionnaire2.Q2H || {
          reponse: "",
          precision: "",
        },
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    questionnaire2: {
      Q2A1: { required },
      Q2A2: {
        reponse: { required },
        autre: "",
      },
      Q2B: { required },
      Q2C: { required },
      Q2D: { required },
      Q2E1: { required },
      Q2E2: { required },
      Q2F: { required },
      Q2G: { required },
      Q2H: {
        reponse: { required },
        precision: "",
      },
    },
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE2", this.questionnaire2);
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
              id: 2,
              content: this.questionnaire2,
              userId: this.$store.state.auth.user.userId,
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + this.$store.state.auth.user.token,
              },
            }
          )
          .then((response) => {
            this.isLoading = false;
            this.$emit("next", 3);
          })
          .catch((error) => {
            this.isLoading = false;
            console.log(error);
          });
      }
    },
  },
  computed: {
    Q2A1Errors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2A1.$dirty) return errors;
      !this.$v.questionnaire2.Q2A1.required && errors.push("Champs requis");
      return errors;
    },
    Q2A2Errors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2A2.reponse.$dirty) return errors;
      !this.$v.questionnaire2.Q2A2.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q2BErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2B.$dirty) return errors;
      !this.$v.questionnaire2.Q2B.required && errors.push("Champs requis");
      return errors;
    },
    Q2CErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2C.$dirty) return errors;
      !this.$v.questionnaire2.Q2C.required && errors.push("Champs requis");
      return errors;
    },
    Q2DErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2D.$dirty) return errors;
      !this.$v.questionnaire2.Q2D.required && errors.push("Champs requis");
      return errors;
    },
    Q2E1Errors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2E1.$dirty) return errors;
      !this.$v.questionnaire2.Q2E1.required && errors.push("Champs requis");
      return errors;
    },
    Q2E2Errors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2E2.$dirty) return errors;
      !this.$v.questionnaire2.Q2E2.required && errors.push("Champs requis");
      return errors;
    },
    Q2FErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2F.$dirty) return errors;
      !this.$v.questionnaire2.Q2F.required && errors.push("Champs requis");
      return errors;
    },
    Q2GErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2G.$dirty) return errors;
      !this.$v.questionnaire2.Q2G.required && errors.push("Champs requis");
      return errors;
    },
    Q2HErrors() {
      const errors = [];
      if (!this.$v.questionnaire2.Q2H.$dirty) return errors;
      !this.$v.questionnaire2.Q2H.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    progression() {
      let progression = 100 / 6;
      const fields = [
        this.questionnaire2.Q2A1,
        this.questionnaire2.Q2A2,
        this.questionnaire2.Q2B.reponse,
        this.questionnaire2.Q2C,
        this.questionnaire2.Q2D,
        this.questionnaire2.Q2E1,
        this.questionnaire2.Q2E2,
        this.questionnaire2.Q2F,
        this.questionnaire2.Q2G,
        this.questionnaire2.Q2H.reponse,
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += 100 / 6 / fields.length;
        }
      }
      return Math.round(progression);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
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
