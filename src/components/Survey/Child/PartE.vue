<template>
  <section>
    <Header
      :title="`E. Questions finales`"
      :valueProgress="percentageCompletion"
    />

    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row class="ma-5" sm="12">
        <h3>
          1. À l’heure actuelle, diriez-vous que la fatigue cognitive constitue
          un motif d’inquiétude pour vous, concernant les aspects suivants :
        </h3>
      </v-row>

      <Indications :items="ratingLabelsE1" />


      <v-row justify="center" align="center" class="mb-8">
        <v-col sm="7">
          Votre motivation à poursuivre vos études, une formation
          professionnelle ou à vous projeter dans le monde du travail
        </v-col>
        <v-col sm="4">
          <v-radio-group v-model="E1a" row>
                <v-radio
                  v-for="i in valuesE1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
          <!-- <v-slider :tick-labels="['1', '2', '3', '4']" :max="3" step="1">
          </v-slider> -->
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mb-8">
        <v-col sm="3">
          Votre confiance en vos capacités
        </v-col>
        <v-col sm="4">
          <div class="rounded-lg text-center green lighten-4 pa-4 text-caption">
              « confiance »: Évaluation réaliste et ponctuelle des
ressources nécessaires pour affronter une situation particulière
            </div>
        </v-col>
        <v-col sm="4">
          <v-radio-group v-model="E1b" row>
                <v-radio
                  v-for="i in valuesE1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mb-8">
        <v-col sm="3">
          Votre estime de vous
        </v-col>
        <v-col sm="4">
          <div class="rounded-lg text-center green lighten-4 pa-4 text-caption">
              « estime de soi »: Perception et auto-évaluation de ses points
              forts et de ses points faibles quand on les compare à nos
              valeur
            </div>
              
        </v-col>
        <v-col sm="4">
          <v-radio-group v-model="E1c" row>
                <v-radio
                  v-for="i in valuesE1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mb-8">
        <v-col sm="7">
          Votre indépendance à venir (logement, gestion du quotidien,
          transports, etc.)
        </v-col>
        <v-col sm="4">
          <v-radio-group v-model="E1d" row>
                <v-radio
                  v-for="i in valuesE1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>
      <v-row class="ma-5" sm="12">
        <h3>
          2. Il y a-t-il des aides ou soutiens particuliers qui vous
          paraitraient utiles et dont vous aimeriez nous faire part (dont vous
          avez déjà connaissance ou qui vous semblent manquer) ?
        </h3>
      </v-row>
      <TextArea v-model="E2" />

      <v-divider class="ma-4"></v-divider>
      <v-row class="ma-5" sm="12">
        <h3>
          3. Souhaiteriez-vous ajouter certains éléments concernant votre
          expérience de la fatigue cognitive ?
        </h3>
      </v-row>
      <TextArea v-model="E3" />
    </v-card>
  </section>
</template>


<script>
import Indications from "../../Indications.vue";
import Header from "../Header.vue";
import TextArea from "../TextArea.vue";
import { mapActions } from 'vuex'
export default {
  name: "SurveyChildPartE",
  data() {
    return {
      E1a: "",
      E1b: "",
      E1c: "",
      E1d: "",
      E2: "",
      E3: "",
      ratingLabelsE1: [
        "1- Non, ce n’est pas une source d’inquiétude",
        "2- C’est une source d’inquiétude peu importante",
        "3- C’est une source d’inquiétude importante",
        "4- Je n’y réfléchis pas "
      ],
      valuesE1: ['1', '2', '3', '4']
    };
  },
  computed: {
    completions() {
      return {
        E1a: this.E1a != "",
        E1b: this.E1b != "",
        E1c: this.E1c != "",
        E1d: this.E1d != "",
        E2: this.E2 != "",
        E3: this.E3 != "",
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter((a) => a);
      console.log(areOk);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      console.log('TODO');
      return {
        E1a: this.E1a,
        E1b: this.E1b,
        E1c: this.E1c,
        E1d: this.E1d,
        E2: this.E2,
        E3: this.E3,
      }
    }
  },
  methods: {
    ...mapActions([
      'saveChildQuestionnaire'
    ]),
    save() {
      this.saveChildQuestionnaire(this.answers)
    }
  },
  components: {
    Indications,
    Header,
    TextArea
  },
  mounted() {
    console.log('part E mounted')
    window.scrollTo(0, 0);
    this.E1a = this.$store.state.childQuestionnaire.E1a || ''
    this.E1b = this.$store.state.childQuestionnaire.E1b || ''
    this.E1c = this.$store.state.childQuestionnaire.E1c || ''
    this.E1d = this.$store.state.childQuestionnaire.E1d || ''
    this.E2 = this.$store.state.childQuestionnaire.E2 || ''
    this.E3 = this.$store.state.childQuestionnaire.E3 || ''
  }
};
</script>