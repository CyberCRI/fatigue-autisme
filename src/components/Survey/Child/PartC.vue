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
          C.1 Lorsque vous vivez des périodes de fatigue mentale, diriez-vous
          que cela a des répercussions sur votre état physique :
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
            C.1.1 Pouvez-vous préciser de quelle(s) façon(s) la fatigue
            cognitive impacte votre état physique :
          </h4>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col sm="10">
            <v-row class="text-subtitle-2">
              <v-col sm="6">Manifestations physiques :</v-col>
              <v-col sm="2" class="text-center"
                >Cet aspect est-il impacté :</v-col
              >
              <v-col sm="4" class="text-center"
                >Précisez si vous le souhaitez</v-col
              >
            </v-row>
            <v-divider class="ma-4"></v-divider>
            <v-row
              align="center"
              justify="center"
              v-for="q in questionsC11"
              :key="q.question"
            >
              <v-col sm="6">{{ q.question }}</v-col>
              <v-col sm="2"
                ><v-switch v-model="q.modelBool">
                  <template v-slot:label>{{
                    q.modelBool ? " Oui" : " Non"
                  }}</template>
                </v-switch></v-col
              >
              <v-col sm="4"
                ><v-textarea
                  v-model="q.modelText"
                  name="context"
                  filled
                  label=""
                  rows="1"
                ></v-textarea
              ></v-col>
            </v-row>
            <v-row align="center">
              <v-col sm="6">Autres, précisez :</v-col>
              <v-col sm="6"
                ><v-textarea
                  v-model="C11lText"
                  name="context"
                  filled
                  label=""
                  rows="2"
                ></v-textarea
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          C.2 Pouvez-vous évaluer, à l’aide de la jauge, la gêne liée aux
          différents stimuli sensoriels, en temps normal et lors des périodes de
          fatigue cognitive :
        </h3>
      </v-row>

      <v-row justify="center" class="mt-6">
        <v-col sm="10">
          <v-row class="text-subtitle-2 text-center" align="center">
            <v-col sm="4">Sensibilité sensorielle</v-col>
            <v-col sm="4" class="text-center"
              >Hors période de fatigue mentale</v-col
            >
            <v-col sm="4" class="text-center"
              >En période de fatigue mentale</v-col
            >
          </v-row>
          <v-divider class="mt-4 mb-8"></v-divider>
          <v-row v-for="q in questionsC2" :key="q.question" class="ma-4">
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
            <v-col sm="4"
              >Autre(s)
              <span class="text-caption"
                >Si certaines sensibilités particulières non mentionnées
                cidessus sont modifiées en périodes de fatigue, vous pouvez nous
                en faire part ici</span
              >
            </v-col>
            <v-col
              ><v-textarea
                v-model="C2OtherWith"
                name="context"
                filled
                label=""
                rows="2"
              ></v-textarea
            ></v-col>
            <v-col
              ><v-textarea
                v-model="C2OtherWithout"
                name="context"
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
          C.3 Lors de périodes de fatigue mentale, avez-vous constaté des
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

          <indications :items="ratingLabelsC31a" />
          <v-row justify="center" v-for="q in questionsC31a" :key="q.question">
            <v-col sm="10">
              <v-row align="center">
                <v-col sm="6"><span v-html="q.question"></span></v-col>
                <v-col sm="6">
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
          <indications :items="ratingLabelsC31b" />
          <v-row justify="center" v-for="q in questionsC31b" :key="q.question">
            <v-col sm="10">
              <v-row align="center">
                <v-col sm="6"><span v-html="q.question"></span></v-col>
                <v-col sm="6">
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
          C.4 <u>Lors de périodes de fatigue mentale importante</u>, avez-vous
          constaté des variations de cette fatigue
          <u>en fonction de l’heure</u> de la journée :
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
            C.4.1 À quel moment de la journée vous sentez-vous généralement le
            plus en forme :
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
          C.5 <u>Lors de périodes de fatigue cognitive importante</u>, faire une
          sieste ou vous octroyer un temps de repos vous permet-il de récupérer
          de l’énergie :
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
          C.6 Vous arrive-t-il de consommer des aliments, des boissons ou des
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
        <v-row justify="center">
          <v-col sm="10">
            <v-textarea
              v-model="C61"
              name="context"
              filled
              label=""
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          C.7 Identifier les signaux physiques et psychologiques de fatigue que
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
export default {
  name: "SurveyChildPartA",
  data() {
    return {
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
      valuesC3a: ["1", "2", "3", "Je ne sais pas"],
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
        {
          question: `Système vestibulaire et proprioceptif <span class="text-caption">(équilibre, mouvements, perception du corps dans l’espace, etc.)</span>`,
          modelW: "C2VestWith",
          modelWo: "C2VestWithout",
        },
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
      const areOk = Object.values(this.completions).filter((a) => a);
      console.log(areOk);
      return parseInt((areOk.length / size) * 100.0);
    },
  },
  components: {
    Indications,
    Header,
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>