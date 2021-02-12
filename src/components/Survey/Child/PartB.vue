<template>
  <section>
    <Header
      :title="`Partie B`"
      :valueProgress="percentageCompletion"
    />

    <br />
    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      
      <v-row cols="10" sm="10" justify="center">
        <h1>
          Répercussions dans la vie quotidienne
        </h1>
      </v-row>

      <v-row justify="center" class="ma-10" v-if="errors.length > 0">
        <v-col sm="9" class="error-borders pa-4">
          Certaines questions ci-dessous nécessitent une réponse afin de valider cette partie.
        </v-col>
      </v-row>

      <v-row class="ma-5" sm="12">
        <h3>1. Comment décririez-vous votre emploi du <span style="white-space: nowrap;">temps :</span></h3>
      </v-row>

      <Indications>
        <ul>
          <li v-for="p in ratingLabels1" :key="p">{{ p }}</li>
        </ul>
      </Indications>

      <v-row justify="center">
        <v-col sm="10">
          <v-row align="center" v-for="q in questionsB1" :key="q.question" v-bind:class="{ 'error-borders': errors.includes(q.model) }">
            <v-col cols="12" sm="7"><span v-html="q.question"></span></v-col>
            <v-col cols="12" sm="5">
              <v-radio-group v-model="$data[q.model]" row>
                <v-radio
                  v-for="i in valuesB1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          2. Parmi ces 12 propositions, pouvez-vous classer les
          <strong :class="this.$store.state.settings.accentTextClass"
            >5 plus fatigantes</strong
          >, de 1 (la plus fatigante de toute) <span style="white-space: nowrap;">à 5 :</span>
        </h3>
      </v-row>

      <v-row justify="center" class="ma-10" v-if="errorRanking">
        <v-col sm="9" class="error-borders pa-4">
          Veuillez choisir cinq réponses
        </v-col>
      </v-row>

      <Indications>Vous pouvez annuler une réponse en cliquant sur le numéro</Indications>

      <v-row justify="center">
        <v-col sm="10">
          <v-row
            v-for="o in optionsB2"
            :key="o.id"
            justify="center"
            align="center"
          >
            <v-col sm="2" align="center" justify="center">
              <section v-if="o.rank != ''">
                <v-btn
                  color="green lighten-2"
                  rounded
                  @click="removeRank(o.id)"
                  >{{ o.rank }}</v-btn
                >
              </section>

              <section v-else>
                <section v-if="availableRanksB2.length != 0">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Choisir
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in availableRanksB2"
                        :key="index"
                        @click="chooseRank(item, o.id)"
                      >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </section>
                <section v-else></section>
              </section>
            </v-col>
            <v-col sm="10">
              {{ o.question }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          3. À l’heure actuelle, il y-a-t-il une ou plusieurs conséquences de la
          fatigue cognitive qui vous paraissent particulièrement difficiles à
          supporter ?
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10" cols="6">
          <v-radio-group v-model="B3" v-bind:class="{ 'error-borders': errors.includes('B3') }">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section id="B31" v-if="relevantB31">
        <v-row class="ma-5" sm="12">
          <h4>3.1 Pouvez-vous <span style="white-space: nowrap;">préciser :</span></h4>
        </v-row>
        <TextArea v-model="B31" />
      </section>

      <v-row justify="center">
        <v-btn
          class="btn primary bouton ma-4"
          @click="save"
        >
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn
          class="btn primary bouton ma-4"
          @click="nextPart"
        >
          Accéder à la partie C
        </v-btn>
      </v-row>
      <v-row justify="center">
        <v-col sm="6">
          <v-alert
            outlined
            type="success"
            text
            v-if="showSuccess"
          >
            Vos réponses ont bien été enregistrées.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col sm="6">
          <v-alert
            outlined
            type="error"
            text
            v-if="alertErrorMessage"
          >
            {{ alertErrorMessage }}
          </v-alert>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
import Indications from "../../Indications.vue";
import Header from "../Header.vue";
import TextArea from "../TextArea.vue";
import { mapActions } from "vuex";
export default {
  name: "SurveyChildPartB",
  data() {
    return {
      activeErrors: false,
      showSuccess: false,
      alertErrorMessage: '',
      B1a: "",
      B1b: "",
      B1c: "",
      B1d: "",
      B3: "",
      B31: "",
      ratingLabels1: [
        "1- Insuffisamment chargé",
        "2- Bien équilibré (ni trop chargé, ni trop peu chargé)",
        "3- Un peu trop chargé",
        "4- Trop chargé",
        "5- Beaucoup trop chargé"
      ],
      valuesB1: ["1", "2", "3", "4", "5"],
      questionsB1: [
        { question: "Au lycée", model: "B1a" },
        {
          question:
            "Après le lycée (impératifs divers, accompagnements, devoirs, etc.)",
          model: "B1b"
        },
        { question: "Durant le week-end", model: "B1c" },
        {
          question: "De façon générale (du lundi matin au dimanche soir)",
          model: "B1d"
        },
      ],
      optionsB2: [
        { id: "a", question: "Le trajet au quotidien", rank: "" },
        {
          id: "b",
          question:
            "La répartition des cours (dans la journée, dans la semaine)",
          rank: ""
        },
        {
          id: "c",
          question:
            "Le rythme des enseignements dispensés en classe (trop rapides, trop lents, etc.)",
          rank: ""
        },
        {
          id: "d",
          question:
            "Les interactions avec les élèves (comprendre le fonctionnement du groupe, les normes sociales implicites entre les adolescents, etc.)",
          rank: ""
        },
        {
          id: "e",
          question:
            "Les interactions avec les enseignants et les adultes de l’établissement",
          rank: ""
        },
        {
          id: "f",
          question: "La gestion de l’environnement sensoriel",
          rank: ""
        },
        {
          id: "g",
          question: "La charge de travail scolaire (au lycée et à la maison)",
          rank: ""
        },
        {
          id: "h",
          question:
            "Les activités après le lycée (loisirs, accompagnements divers, etc.)",
          rank: ""
        },
        {
          id: "i",
          question:
            "Le fait de devoir s’adapter aux autres, faire le caméléon, porter un masque",
          rank: ""
        },
        {
          id: "j",
          question: "Les attentes et exigences de votre entourage",
          rank: ""
        },
        {
          id: "k",
          question: "La pression que vous vous mettez pour réussir",
          rank: ""
        },
        {
          id: "l",
          question:
            "Le manque de sommeil / la mauvaise qualité de votre sommeil",
          rank: ""
        },
      ],
    };
  },
  computed: {
    errors() {
      const errors = [];
      if (!this.activeErrors) {
        return errors;
      }
      for (const id in this.completions) {
        if (!this.completions[id]) {
          errors.push(id);
        }
      }
      return errors;
    },
    errorRanking() {
      return this.errors.includes('B2_1') ||
              this.errors.includes('B2_2') ||
              this.errors.includes('B2_3') ||
              this.errors.includes('B2_4') ||
              this.errors.includes('B2_5'); 
    },
    relevantB31() {
      return this.B3 === 'Oui';
    },
    availableRanksB2() {
      const rankTaken = this.optionsB2.map(o => o.rank);
      return ["1", "2", "3", "4", "5"].filter(i => !rankTaken.includes(i));
    },
    completions() {
      return {
        B1a: this.B1a != "",
        B1b: this.B1b != "",
        B1c: this.B1c != "",
        B1d: this.B1d != "",
        B2_1: this.getRankB2("1") != "",
        B2_2: this.getRankB2("2")!= "",
        B2_3: this.getRankB2("3")!= "",
        B2_4: this.getRankB2("4")!= "",
        B2_5: this.getRankB2("5")!= "",

        B3: this.B3 != ""
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length + 5;
      const areOk =
        Object.values(this.completions).filter(a => a).length +
        (5 - this.availableRanksB2.length);
      return parseInt((areOk / size) * 100.0);
    },
    answers() {
      return {
        B1a: this.B1a,
        B1b: this.B1b,
        B1c: this.B1c,
        B1d: this.B1d,
        B2_1: this.getRankB2("1"),
        B2_2: this.getRankB2("2"),
        B2_3: this.getRankB2("3"),
        B2_4: this.getRankB2("4"),
        B2_5: this.getRankB2("5"),
        B3: this.B3
      };
    },
  },
  methods: {
    ...mapActions(["saveChildQuestionnaire"]),
    getRankB2(rank) {
      const res = this.optionsB2.filter(it => it.rank === rank);
      if (res.length === 1) {
        return res[0].id;
      }
      return "";
    },
    chooseRank(rank, itemId) {
      this.optionsB2.filter(it => it.id === itemId)[0].rank = rank;
    },
    removeRank(itemId) {
      this.optionsB2.filter(it => it.id === itemId)[0].rank = "";
    },
    getRank(rank) {
      const res = this.optionsB2.filter(it => it.rank === rank);
      if (res) {
        return res.id;
      }
      return "";
    },
    save() {
      this.alertErrorMessage = '';
      this.showSuccess = false;

      this.saveChildQuestionnaire(this.answers).then(
        () => {
          this.showSuccess = true;
        },
        error => {
          this.alertErrorMessage = 'Une erreur est survenue'
          console.log(error)
        }
      )
    },
    nextPart() {
      this.activeErrors = true;
      this.alertErrorMessage = '';

      if (this.errors.length > 0) {
        window.scrollTo(0, 0);
      } else {
        this.saveChildQuestionnaire(this.answers).then(
          () => {
            this.$router.push('/enfants/questionnaire/partC');
          },
          error => {
            this.alertErrorMessage = 'Une erreur est survenue'
            console.log(error)
          }
        )
      }
    }
  },
  components: {
    Indications,
    Header,
    TextArea
  },
  mounted() {
    console.log("part B mounted");
    window.scrollTo(0, 0);
    this.B1a = this.$store.state.childQuestionnaire.B1a || "";
    this.B1b = this.$store.state.childQuestionnaire.B1b || "";
    this.B1c = this.$store.state.childQuestionnaire.B1c || "";
    this.B1d = this.$store.state.childQuestionnaire.B1d || "";

    if (this.$store.state.childQuestionnaire.B2_1) {
      this.chooseRank("1", this.$store.state.childQuestionnaire.B2_1);
    }
    if (this.$store.state.childQuestionnaire.B2_2) {
      this.chooseRank("2", this.$store.state.childQuestionnaire.B2_2);
    }
    if (this.$store.state.childQuestionnaire.B2_3) {
      this.chooseRank("3", this.$store.state.childQuestionnaire.B2_3);
    }
    if (this.$store.state.childQuestionnaire.B2_4) {
      this.chooseRank("4", this.$store.state.childQuestionnaire.B2_4);
    }
    if (this.$store.state.childQuestionnaire.B2_5) {
      this.chooseRank("5", this.$store.state.childQuestionnaire.B2_5);
    }

    this.B3 = this.$store.state.childQuestionnaire.B3 || "";
  }
};
</script>
