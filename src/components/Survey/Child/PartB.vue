<template>
  <section>
    <Header
      :title="`B. Répercussions dans la vie quotidienne`"
      :valueProgress="percentageCompletion"
    />

    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row class="ma-5" sm="12">
        <h3>1. Comment décririez-vous votre emploi du temps :</h3>
      </v-row>

      <Indications :items="ratingLabels1" />

      <v-row justify="center" v-for="q in questionsB1" :key="q.question">
        <v-col sm="10">
          <v-row align="center">
            <v-col sm="7"><span v-html="q.question"></span></v-col>
            <v-col sm="5">
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
          <strong :class="this.$store.state.settings.accentTextClass">5 plus fatigantes</strong>, de 1 (la plus fatigante de toute) à 5 :
        </h3>
      </v-row>

      <!-- <v-row justify="center">
        <v-col sm="10">
          <v-row align="center" v-for="q in questionsB2" :key="q.question">
            <v-col sm="10" class="text-body-2">{{ q.question }}</v-col>
            <v-col sm="2">
              {{ ['1','2','3','4','5'].includes(q.model) }}
              <v-select solo :items="availableAnswersB2" v-model="q.model" autofill>
              </v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->

      <v-row justify="center">
        <v-col sm="10">
          <v-row align="center" v-for="i in ['1', '2', '3', '4', '5']" :key="i">
            <v-col sm="3">{{ labelsB2[i] }}</v-col>
            <v-col sm="9">
              <section v-if="getRankB2(i)">
                <v-row justify="center" align="center">
                  <v-col sm="9"> {{ getRankB2(i).question }}</v-col>
                  <v-col sm="3"
                    ><v-btn @click="removeB2(i)">Enlever</v-btn></v-col
                  >
                </v-row>
              </section>
              <section v-else>
                <v-select
                  solo
                  :items="availableB2"
                  @input="selectB2($event, i)"
                ></v-select>
              </section>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          3. À l’heure actuelle, il y-a-t-il une ou plusieurs conséquences de
          la fatigue cognitive qui vous paraissent particulièrement difficiles à
          supporter ?
        </h3>
      </v-row>

      <Indications
        :items="[
          'S’il y en a plusieurs, vous pouvez les lister par ordre d’importance : la plus importante, la 2ième plus importante, la 3ième, etc.',
        ]"
      />

      <v-row justify="center">
        <v-col sm="10">
          <v-textarea
            v-model="B3"
            name="context"
            filled
            label=""
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partC')"
        >
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partC')"
        >
          Accéder à la partie C
        </v-btn>
      </v-row>
    </v-card>
  </section>
</template>

<script>
import Indications from "../../Indications.vue";
import Header from "../Header.vue";
import { mapActions } from 'vuex'
export default {
  name: "SurveyChildPartB",
  data() {
    return {
      B1a: "",
      B1b: "",
      B1c: "",
      B1d: "",
      B2a: "",
      B2b: "",
      B2c: "",
      B2d: "",
      B2e: "",
      B2f: "",
      B2g: "",
      B2h: "",
      B2i: "",
      B2j: "",
      B2k: "",
      B2l: "",
      B3: "",
      ratingLabels1: [
        "1- Insuffisamment chargé",
        "2- Bien équilibré (ni trop chargé, ni trop peu chargé)",
        "3- Un peu trop chargé",
        "4- Trop chargé",
        "5- Beaucoup trop chargé",
      ],
      valuesB1: ["1", "2", "3", "4", "5"],
      questionsB1: [
        { question: "Au lycée", model: "B1a" },
        {
          question:
            "Après le lycée (impératifs divers, accompagnements, devoirs, etc.)",
          model: "B1b",
        },
        { question: "Durant le week-end", model: "B1c" },
        {
          question: "De façon générale (du lundi matin au dimanche soir)",
          model: "B1d",
        },
      ],
      optionsB2: [
        { id: "a", question: "Le trajet au quotidien", rank: "" },
        { id: "b", question: "La répartition des cours (dans la journée, dans la semaine)", rank: "" },
        { id: "c", question: "Le rythme des enseignements dispensés en classe (trop rapides, trop lents, etc.)", rank: "" },
        { id: "d", question: "Les interactions avec les élèves (comprendre le fonctionnement du groupe, les normes sociales implicites entre les adolescents, etc.)", rank: "" },
        { id: "e", question: "Les interactions avec les enseignants et les adultes de l’établissement", rank: "" },
        { id: "f", question: "La gestion de l’environnement sensoriel", rank: "" },
        { id: "g", question: "La charge de travail scolaire (au lycée et à la maison)", rank: "" },
        { id: "h", question: "Les activités après le lycée (loisirs, accompagnements divers, etc.)", rank: "" },
        { id: "i", question: "Le fait de devoir s’adapter aux autres, faire le caméléon, porter un masque", rank: "" },
        { id: "j", question: "Les attentes et exigences de votre entourage", rank: "" },
        { id: "k", question: "La pression que vous vous mettez pour réussir", rank: "" },
        { id: "l", question: "Le manque de sommeil / la mauvaise qualité de votre sommeil", rank: "" },
      ],
      labelsB2: {
        1: "La plus fatigante:",
        2: "La 2ème plus fatigante:",
        3: "La 3ème plus fatigante:",
        4: "La 4ème plus fatigante:",
        5: "La 5ème plus fatigante:",
      },
    };
  },
  computed: {
    availableB2() {
      return this.optionsB2
        .filter((op) => op.rank === "")
        .map((op) => op.question);
    },
    completions() {
      return {
        B1a: this.B1a != "",
        B1b: this.B1b != "",
        B1c: this.B1c != "",
        B1d: this.B1d != "",
        B2Rank1: this.getRankB2(1),
        B2Rank2: this.getRankB2(2),
        B2Rank3: this.getRankB2(3),
        B2Rank4: this.getRankB2(4),
        B2Rank5: this.getRankB2(5),
        B3: this.B3 != "",
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter((a) => a);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      return {
        B1a: this.B1a,
        B1b: this.B1b,
        B1c: this.B1c,
        B1d: this.B1d,
        B2a: this.B2a,
        B2b: this.B2b,
        B2c: this.B2c,
        B2d: this.B2d,
        B2e: this.B2e,
        B2f: this.B2f,
        B2g: this.B2g,
        B2h: this.B2h,
        B2i: this.B2i,
        B2j: this.B2j,
        B2k: this.B2k,
        B2l: this.B2l,
        B3: this.B3,

      }
    }
  },
  methods: {
    ...mapActions([
      'saveChildQuestionnaire'
    ]),
    getRankB2(rank) {
      const res = this.optionsB2.filter((it) => it.rank === rank);
      if (res.length === 1) {
        return res[0];
      }
      return false;
    },
    selectB2(val, rank) {
      this.optionsB2.filter((it) => it.question === val)[0].rank = rank;
    },
    removeB2(rank) {
      this.optionsB2.filter((it) => it.rank === rank)[0].rank = "";
    },
    save() {
      this.saveChildQuestionnaire(this.answers)
    }
  },
  components: {
    Indications,
    Header,
  },
  mounted() {
    console.log('part B mounted')
    window.scrollTo(0, 0);
    this.B1a = this.$store.state.childQuestionnaire.B1a || ''
    this.B1b = this.$store.state.childQuestionnaire.B1b || ''
    this.B1c = this.$store.state.childQuestionnaire.B1c || ''
    this.B1d = this.$store.state.childQuestionnaire.B1d || ''
    this.B2a = this.$store.state.childQuestionnaire.B2a || ''
    this.B2b = this.$store.state.childQuestionnaire.B2b || ''
    this.B2c = this.$store.state.childQuestionnaire.B2c || ''
    this.B2d = this.$store.state.childQuestionnaire.B2d || ''
    this.B2e = this.$store.state.childQuestionnaire.B2e || ''
    this.B2f = this.$store.state.childQuestionnaire.B2f || ''
    this.B2g = this.$store.state.childQuestionnaire.B2g || ''
    this.B2h = this.$store.state.childQuestionnaire.B2h || ''
    this.B2i = this.$store.state.childQuestionnaire.B2i || ''
    this.B2j = this.$store.state.childQuestionnaire.B2j || ''
    this.B2k = this.$store.state.childQuestionnaire.B2k || ''
    this.B2l = this.$store.state.childQuestionnaire.B2l || ''
    this.B3 = this.$store.state.childQuestionnaire.B3 || ''
  }
};
</script>