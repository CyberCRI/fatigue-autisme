<template>
  <section>
    <Header
      :title="`C. Répercussions sur le fonctionnement physique`"
      :valueProgress="percentageCompletion"
    />

    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row class="ma-5" sm="12">
        <h3>
          1. Lorsque vous vivez des périodes de fatigue mentale, diriez-vous que
          cela a des répercussions sur votre état physique :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C1">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantC11">
        <v-row class="ma-5" sm="12">
          <h4>
            1.1 Pouvez-vous préciser de quelle(s) façon(s) la fatigue cognitive
            impacte votre état physique :
          </h4>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col sm="10">
            <v-row>
              <v-col sm="8"><strong>Manifestations physiques :</strong></v-col>
              <v-col sm="4" class="text-center"
                ><strong>Cet aspect est-il impacté :</strong></v-col
              >
              <!-- <v-col sm="4" class="text-center"
                ><strong>Précisez si vous le souhaitez</strong></v-col
              > -->
            </v-row>
            <v-divider class="ma-4"></v-divider>
            <v-row
              align="center"
              justify="center"
              v-for="q in questionsC11"
              :key="q.question"
            >
              <v-col sm="8">{{ q.question }}</v-col>
              <v-col sm="4"
                >
              <v-layout row wrap justify-center>
                <v-switch v-model="q.modelBool">
                  <template v-slot:label>{{
                    q.modelBool ? " Oui" : " Non"
                  }}</template>
                </v-switch>
              </v-layout>
                </v-col>
                <v-col sm="12" v-if="q.modelBool">
                  <section v-if="q.modelT === 'C11hText'">
                    <p><strong>La question 2 explore plus en détails les particularités sensorielles</strong></p>
                  </section>
                  <section v-else>
                    <strong>Précisez si vous le souhaitez:</strong>
                  <TextArea v-model="q.modelText"/>
                  </section>
                  
                </v-col>
            <v-divider class="ma-4"></v-divider>
            </v-row>
            <v-row align="top">
              <v-col sm="4">Autres, précisez :</v-col>
              <v-col sm="8"
                >
                <TextArea v-model="C11lText" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          2. Pouvez-vous évaluer, à l’aide de la jauge, <strong :class="this.$store.state.settings.accentTextClass"
              >la gêne</strong> liée aux
          différents stimuli sensoriels, en temps normal et lors des périodes de
          fatigue cognitive :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="8">
          
      <v-card color="blue lighten-5" class="py-4 px-10">
        Utilisez les jauges pour indiquer votre niveau de gêne
        <v-row justify="center" class="mt-8">
          <v-col sm="10">
        <v-slider
            v-model="dummySlider"
                thumb-label="always"
                min="0"
                max="100"
              ><template v-slot:prepend>Aucune gêne</template>
              <template v-slot:append>
                Gêne aussi forte que possible
              </template></v-slider>
          </v-col>
        </v-row>
      </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-6">
        <v-col sm="10">
          <v-row align="center">
            <v-col sm="4"><strong>Sensibilité sensorielle</strong></v-col>
            <v-col sm="4" class="text-center"
              ><strong>Hors période de fatigue mentale</strong></v-col
            >
            <v-col sm="4" class="text-center"
              ><strong>En période de fatigue mentale</strong></v-col
            >
          </v-row>
          <v-divider class="mt-4 mb-8"></v-divider>
          <v-row v-for="q in questionsC2" :key="q.question" class="ma-4" align="top">
            <v-col sm="4" v-html="q.question"></v-col>
            <v-col sm="4"
              ><v-slider
                v-model="q.modelW"
                thumb-label="always"
                min="0"
                max="100"
              ></v-slider
            ></v-col>
            <v-col sm="4"
              ><v-slider
                v-model="q.modelWo"
                thumb-label="always"
                min="0"
                max="100"
              ></v-slider
            ></v-col>
          </v-row>
          <v-row class="ma-4" align="center">
            <v-col sm="4">Système vestibulaire et proprioceptif<v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="grey lighten-1">mdi-help-circle</v-icon>
              </v-btn>
            </template>
            <span
              >(équilibre, mouvements, perception du corps dans l’espace, etc.)</span
            >
          </v-tooltip></v-col>
            <v-col sm="4"
              ><v-slider
                v-model="C2VestWith"
                thumb-label="always"
                min="0"
                max="100"
              ></v-slider
            ></v-col>
            <v-col sm="4"
              ><v-slider
                v-model="C2VestWithout"
                thumb-label="always"
                min="0"
                max="100"
              ></v-slider
            ></v-col>
          </v-row>
          <v-row class="ma-4" align="center">
            <v-col sm="4"
              >Autre(s)<v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="grey lighten-1">mdi-help-circle</v-icon>
              </v-btn>
            </template>
            <span
              >Si certaines sensibilités particulières non mentionnées
                ci-dessus sont modifiées en périodes de fatigue, vous pouvez nous
                en faire part ici</span
            >
          </v-tooltip>
            </v-col>
            <v-col
              >
              <!-- <TextArea v-model="C2OtherWith"/> -->
              <v-textarea
                v-model="C2OtherWith"
                prepend-inner-icon="mdi-pencil"
                name="context"
                solo
                label=""
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              ><v-textarea
                v-model="C2OtherWithout"
                prepend-inner-icon="mdi-pencil"
                name="context"
                solo
                filled
                label=""
                rows="2"
              ></v-textarea
            ></v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          3. Lors de périodes de fatigue mentale, avez-vous constaté des
          changements au niveau du sommeil :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C3">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
            <v-radio label="Je ne sais pas" value="Je ne sais pas"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <transition name="fade">
        <section v-if="relevantC31">
          <v-row class="ma-5" sm="12">
            <h4>C.3.1 Pouvez-vous préciser :</h4>
          </v-row>

          <Indications>
            <ul>
              <li v-for="p in ratingLabelsC31a" :key="p">{{ p }}</li>
            </ul>
          </Indications>
          <v-row justify="center">
            <v-col sm="10">
              <v-row
                align="center"
                v-for="q in questionsC31a"
                :key="q.question"
              >
                <v-col sm="7"><span v-html="q.question"></span></v-col>
                <v-col sm="5">
                  <v-radio-group v-model="$data[q.model]" row>
                    <v-radio
                      v-for="i in valuesC3a"
                      :key="i"
                      :label="i"
                      :value="i"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <br />
          <br />

          <Indications>
            <ul>
              <li v-for="p in ratingLabelsC31b" :key="p">{{ p }}</li>
            </ul>
          </Indications>
          <v-row justify="center">
            <v-col sm="10">
              <v-row
                align="center"
                v-for="q in questionsC31b"
                :key="q.question"
              >
                <v-col sm="7"><span v-html="q.question"></span></v-col>
                <v-col sm="5">
                  <v-radio-group v-model="$data[q.model]" row>
                    <v-radio
                      v-for="i in valuesC3a"
                      :key="i"
                      :label="i"
                      :value="i"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </section>
      </transition>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          4.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue mentale importante</strong
          >, avez-vous constaté des variations de cette fatigue
          <strong :class="this.$store.state.settings.accentTextClass"
            >en fonction de l’heure</strong
          >
          de la journée :
        </h3>
      </v-row>
      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C4">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantC41">
        <v-row class="ma-5" sm="12">
          <h4>
            4.1 À quel moment de la journée vous sentez-vous généralement <strong :class="this.$store.state.settings.accentTextClass"
              >le
            plus en forme</strong> :
          </h4>
        </v-row>
        <v-row justify="center">
          <v-col sm="10">
            <v-radio-group v-model="C41">
              <v-radio label="Avant 8h" value="Avant 8h"></v-radio>
              <v-radio
                label="Entre 8h et 12h"
                value="Entre 8h et 12h"
              ></v-radio>
              <v-radio
                label="Entre 12h et 14h"
                value="Entre 12h et 14h"
              ></v-radio>
              <v-radio
                label="Entre 14h et 18h"
                value="Entre 14h et 18h"
              ></v-radio>
              <v-radio
                label="Entre 18h et 20h"
                value="Entre 18h et 20h"
              ></v-radio>
              <v-radio label="Après 20h" value="Après 20h"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          5.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue cognitive importante</strong
          >, faire une sieste ou vous octroyer un temps de repos vous permet-il
          de récupérer de l’énergie :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C5">
            <v-radio
              label="Beaucoup (je suis de nouveau en forme)"
              value="Beaucoup"
            ></v-radio>
            <v-radio
              label="Moyennement (je peux reprendre mes activités mais je reste fatigué.e)"
              value="Moyennement"
            ></v-radio>
            <v-radio
              label="Pas du tout (je ne suis pas en mesure de continuer mes activités)"
              value="Pas du tout"
            ></v-radio>
            <v-radio
              label="Je ne fais jamais de sieste / je ne m’octroie jamais de temps de repos"
              value="Je ne fais jamais de sieste / je ne m’octroie jamais de temps de repos"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          6. Vous arrive-t-il de consommer des aliments, des boissons ou des
          médicaments (sur ordonnance ou hors ordonnance) pour avoir davantage
          d’énergie :
        </h3>
      </v-row>
      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C6">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantC61">
        <v-row class="ma-5" sm="12">
          <h4>C.6.1 Pouvez-vous préciser :</h4>
        </v-row>
        <TextArea v-model="C61" />
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          7. Identifier les signaux physiques et psychologiques de fatigue que
          vous envoie votre corps, cela vous paraît :
        </h3>
      </v-row>
      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="C7">
            <v-radio
              label="Facile ou relativement facile"
              value="Facile ou relativement facile"
            ></v-radio>
            <v-radio
              label="Plutôt difficile ou difficile"
              value="Plutôt difficile ou difficile"
            ></v-radio>
            <v-radio
              label="Cela m’est impossible ou presque"
              value="Cela m’est impossible ou presque"
            ></v-radio>
            <v-radio
              label="C’est très variable"
              value="C’est très variable"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partD')"
        >
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partD')"
        >
          Accéder à la partie D
        </v-btn>
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
  name: "SurveyChildPartC",
  data() {
    return {
      dummySlider: 0,
      C1: "",
      C11aBool: false,
      C11aText: "",
      C11bBool: false,
      C11bText: "",
      C11cBool: false,
      C11cText: "",
      C11dBool: false,
      C11dText: "",
      C11eBool: false,
      C11eText: "",
      C11fBool: false,
      C11fText: "",
      C11gBool: false,
      C11gText: "",
      C11hBool: false,
      C11hText: "",
      C11iBool: false,
      C11iText: "",
      C11jBool: false,
      C11jText: "",
      C11kBool: false,
      C11kText: "",
      C11lText: "",
      C31a: "",
      C31b: "",
      C31c: "",
      C31d: "",
      C31e: "",
      C31f: "",
      C2HearingWith: "",
      C2HearingWithout: "",
      C2SightWith: "",
      C2SightWithout: "",
      C2TasteWith: "",
      C2TasteWithout: "",
      C2TouchWith: "",
      C2TouchWithout: "",
      C2SmellWith: "",
      C2SmellWithout: "",
      C2VestWith: "",
      C2VestWithout: "",
      C2OtherWith: "",
      C2OtherWithout: "",
      C3: "",
      C3a: 0,
      C3b: 0,
      C3c: 0,
      C3d: 0,
      C3e: 0,
      C3f: 0,
      C4: "",
      C41: "",
      C5: "",
      C6: "",
      C61: "",
      C7: "",
      ratingLabelsC31a: [
        "1- Plus que d’habitude",
        "2- Autant que d’habitude",
        "3- Moins que d’habitude",
        "4- Je ne sais pas",
      ],
      ratingLabelsC31b: [
        "1- Plus facile que d’habitude",
        "2- Ni plus facile, ni plus difficile que d’habitude",
        "3- Plus difficile que d’habitude",
        "4- Je ne sais pas",
      ],
      // valuesC3a: ["1", "2", "3", "Je ne sais pas"],
      valuesC3a: ["1", "2", "3", "4"],
      questionsC11: [
        {
          question:
            "Sentiment d’épuisement physique, d’apathie (pas d’énergie)",
          modelB: "C11aBool",
          modelT: "C11aText",
        },
        {
          question:
            "Maladresse physique (se cogner, bousculer, faire tomber des objets, etc.)",
          modelB: "C11bBool",
          modelT: "C11bText",
        },
        {
          question: "Douleurs musculaires",
          modelB: "C11cBool",
          modelT: "C11cText",
        },
        {
          question: "Migraines, maux de tête, vertiges",
          modelB: "C11dBool",
          modelT: "C11dText",
        },
        {
          question: "Agitation mentale ou motrice, hyperactivité",
          modelB: "C11eBool",
          modelT: "C11eText",
        },
        {
          question:
            "Difficultés à se mouvoir (se lever, marcher, changer de position, etc.)",
          modelB: "C11fBool",
          modelT: "C11fText",
        },
        {
          question: "Faiblesses dans les jambes ou les bras",
          modelB: "C11gBool",
          modelT: "C11gText",
        },
        {
          question:
            "Modifications des sensibilités sensorielles (tactiles, auditives, visuelles, etc.)",
          modelB: "C11hBool",
          modelT: "C11hText",
        },
        {
          question:
            "Problèmes digestifs, maux de ventre, nausées ou vomissements",
          modelB: "C11iBool",
          modelT: "C11iText",
        },
        {
          question:
            "Sentiment d’avoir l’envie ou le besoin de dormir (même en journée)",
          modelB: "C11jBool",
          modelT: "C11jText",
        },
        {
          question:
            "Tensions générales dans le corps, inconfort physique diffus",
          modelB: "C11kBool",
          modelT: "C11kText",
        },
      ],
      questionsC2: [
        {
          question: "Ouïe",
          modelW: "C2HearingWith",
          modelWo: "C2HearingWithout",
        },
        {
          question: "Vision / Luminosité",
          modelW: "C2SightWith",
          modelWo: "C2SightWithout",
        },
        { question: "Goût", modelW: "C2TasteWith", modelWo: "C2TasteWithout" },
        {
          question: "Toucher",
          modelW: "C2TouchWith",
          modelWo: "C2TouchWithout",
        },
        {
          question: "Odorat",
          modelW: "C2SmellWith",
          modelWo: "C2SmellWithout",
        },
        // {
        //   question: `Système vestibulaire et proprioceptif`,
        //   modelW: "C2VestWith",
        //   modelWo: "C2VestWithout",
        // },
      ],
      questionsC31a: [
        { question: "La nuit, je dors :", model: "C31a" },
        { question: "La nuit, je me réveille :", model: "C31b" },
        {
          question:
            "La nuit, je fais des rêves désagréables ou des cauchemars :",
          model: "C31c",
        },
        {
          question: "Dans la journée, j’ai besoin de faire des siestes :",
          model: "C31d",
        },
      ],
      questionsC31b: [
        { question: "Le soir, l’endormissement est :", model: "C31e" },
        { question: "Le matin, le réveil est :", model: "C31f" },
      ],
    };
  },
  computed: {
    relevantC11() {
      return this.C1 === "Oui";
    },
    relevantC31() {
      return this.C3 === "Oui";
    },
    relevantC41() {
      return this.C4 === "Oui";
    },
    relevantC61() {
      return this.C6 === "Oui";
    },
    completions() {
      return {
        C1: this.C1 != "",
        A4: this.A4 != "",
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter(a => a);
      console.log(areOk);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      console.log("TODO");
      return {
        C1: this.C1,
      };
    },
  },
  methods: {
    ...mapActions(["saveChildQuestionnaire"]),
    save() {
      this.saveChildQuestionnaire(this.answers);
    },
  },
  components: {
    Indications,
    Header,
    TextArea,
  },
  mounted() {
    console.log("part C mounted");
    window.scrollTo(0, 0);
    this.C1 = this.$store.state.childQuestionnaire.C1 || "";
    console.log("TODO");
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>