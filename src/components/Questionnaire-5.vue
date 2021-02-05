<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <v-row>
        <v-col class="col-12">
          <h2>5. Informations complémentaires sur les parents</h2>
          <p class="font-italic">
            Ces données sont facultatives. Si vous ne souhaitez pas transmettre
            ces informations, cliquez directement sur le bouton « Suivant ».
          </p>
        </v-col>
        <v-col class="col-12">
          <h3>Mère</h3>
          <v-text-field
            label="Age de la mère (en années)"
            v-model="questionnaire5.Q5A"
          >
          </v-text-field>
        </v-col>
        <v-col class="col-12">
          <v-text-field
            label="Profession de la mère"
            v-model="questionnaire5.Q5B"
          >
          </v-text-field>
          <v-radio-group v-model="questionnaire5.Q5C.reponse">
            <v-row>
              <v-col class="col-3">
                <v-radio label="À temps plein" value="À temps plein"> </v-radio>
              </v-col>
              <v-col class="col-3">
                <v-radio label="À temps partiel" value="À temps partiel"> </v-radio>
              </v-col>
              <v-col class="col-3">
                <v-radio label="Autre" value="Autre"> </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-text-field
        label="Précisez"
        v-model="questionnaire5.Q5C.precision"
        v-if="questionnaire5.Q5C.reponse === 'Autre'"
      ></v-text-field>
      <br>
      <h3>Père</h3>
      <v-text-field
        label="Age du père (en années)"
        v-model="questionnaire5.Q5D"
      >
      </v-text-field>
      <v-text-field label="Profession du père" v-model="questionnaire5.Q5E">
      </v-text-field>
      <v-radio-group v-model="questionnaire5.Q5F.reponse">
        <v-row>
          <v-col class="col-3">
            <v-radio label="À temps plein" value="À temps plein"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="À temps partiel" value="À temps partiel"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Autre" value="Autre"> </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-text-field
        label="Précisez"
        v-model="questionnaire5.Q5F.precision"
        v-if="questionnaire5.Q5F.reponse === 'Autre'"
      ></v-text-field>
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
import ProgressionBar from "@/components/ProgressionBar";
export default {
  name: "Questionnaire5",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      questionnaire5: {
        Q5A: this.$store.state.questionnaire5.Q5A || "",
        Q5B: this.$store.state.questionnaire5.Q5B || "",
        Q5C: this.$store.state.questionnaire5.Q5C || {
          reponse: "",
          precision: ""
        },
        Q5D: this.$store.state.questionnaire5.Q5D || "",
        Q5E: this.$store.state.questionnaire5.Q5E || "",
        Q5F: this.$store.state.questionnaire5.Q5F || {
          reponse: "",
          precision: ""
        }
      }
    };
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE5", this.questionnaire5);
      this.$router.push({ path: "/" });
    },
    sendForm() {
      this.isLoading = true;
      axios
        .patch(
          process.env.VUE_APP_ROOT_API + "/questionnaire",
          {
            id: 5,
            content: this.questionnaire5,
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
          this.$emit("next", 6);
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    }
  },
  computed: {
    progression() {
      let progression = 4 * (100 / 6);
      const fields = [
        this.questionnaire5.Q5A,
        this.questionnaire5.Q5B,
        this.questionnaire5.Q5C.reponse,
        this.questionnaire5.Q5D,
        this.questionnaire5.Q5E,
        this.questionnaire5.Q5F.reponse
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += (100 / 6) / fields.length;
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
.boutons {
  margin: 30px 30px 30px 0;
}
</style>
