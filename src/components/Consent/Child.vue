<template>
  <v-card class="pa-md-4 mb-4">
    <v-row justify="center">
      <v-col sm="10">
        <h1 class="text-center mb-4" id="title">
          Formulaire de consentement de participation au projet de recherche
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col sm="9">
        <p><strong>Intitulé de l’étude:</strong></p>
        <p class="font-italic pl-5">
          Examination of mental fatigue in autistic students in high school
        </p>
        <p class="pl-5">
          [Évaluation de la fatigue mentale chez les lycéens présentant une
          condition du spectre autistique]
        </p>

        <p><strong>Responsable du projet et coordonnées:</strong></p>
        <p class="pl-5">Dr Morgane Aubineau, chercheuse postdoctorale</p>
        <p class="pl-5">
          Centre de Recherche Interdisciplinaires, 8 rue Charles V, 75004 Paris
        </p>
        <p class="pl-5">
          Emails:
          <a href="mailto: morgane.aubineau@cri-paris.org"
            >morgane.aubineau@cri-paris.org</a
          >
          ou
          <a href="mailto: etude.autisme@protonmail.com "
            >etude.autisme@protonmail.com
          </a>
        </p>
        <br />
        <p>
          Afin de participer à cette étude de recherche, il est nécessaire que
          vous donniez votre consentement éclairé. En signant ce document, vous
          reconnaissez que vous comprenez la nature de l’étude et votre rôle
          dans la recherche, et que vous acceptez d’y prendre part.
        </p>
        <br />
        <p>
          <strong
            >Veuillez s’il vous plaît lire attentivement et valider les points
            suivants avant de soumettre le formulaire:</strong
          >
        </p>
      </v-col>
      <v-col sm="9">
        <v-row v-for="(b, index) in bullets" :key="index">
          <v-col sm="12"
            ><v-checkbox v-model="$data[b.model]" 
            color="primary" 
            hide-details>
            <template v-slot:label>
    <p>{{ b.question }}</p>
  </template>
            </v-checkbox></v-col>
        </v-row>
      </v-col>

      <v-col sm="9">
        <p>
          En soumettant ce formulaire, je confirme que j’ai compris les
          informations ci-dessus et que je consens à participer à cette étude
          conduite au Centre de Recherche Interdisciplinaires, à Paris.
        </p>
      </v-col>

    </v-row>
    <v-row justify="center" v-if="error">
        <v-alert
      icon="mdi-shield-lock-outline"
      prominent
      text
      type="info"
    >
      Veuillez consentir à tous les points ci-dessus avant de soumettre le formulaire
    </v-alert>
    </v-row>
        <v-row justify="center"> 
      <v-col sm="6">
        <v-row align="center">
          <v-col sm="6"><strong>Date du jour:</strong> {{ date }}</v-col>
          <v-col sm="6"
            ><v-btn @click.prevent="sendConsent" color="primary">Soumettre le formulaire</v-btn></v-col
          >
        </v-row>
      </v-col>
        
    </v-row>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { sameAs } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  data() {
    return {
      error: false,
      isLoading: false,
      bullets: [
        { question: `Je comprends que l’objectif principal de cette recherche est de concevoir un questionnaire portant sur l’évaluation de la fatigue mentale chez les élèves de secondaire présentant une condition du spectre autistique, afin de mieux la prendre en compte et la prévenir.`, model: 'b1', errors: 'errors1'},
        { question: `Je comprends que ma participation consiste en 1) la complétion d’un questionnaire en ligne concernant la fatigue mentale et 2) si je le souhaite, un échange par écrit ou par visionconférence avec les chercheurs pour leur faire part de mon avis concernant le questionnaire que j’ai rempli.`, model: 'b2', errors: 'errors2'},
        { question: `Je comprends qu’en signant ce document, je consens également à ce qu’au moins l’un de mes parents (ou représentants légaux) transmette des informations me concernant, selon les termes précisés dans le consentement qu’il.s / elle.s aura(-ont) signé.`, model: 'b3', errors: 'errors3'},
        { question: `Je comprends que mon identité ne sera pas liée à mes données, et que toute information que je fournirai restera confidentielle. Je comprends que mes données seront chiffrées et stockées de manière sécurisée, uniquement accessibles aux chercheurs de l’étude et qu’elles seront détruites deux ans après la dernière publication des résultats.`, model: 'b4', errors: 'errors4'},
        { question: `Je comprends que les données découlant de cette étude pourront faire l'objet de publications ou de présentations scientifiques. En tout temps, mon anonymat y sera préservé.`, model: 'b5', errors: 'errors5'},
        { question: `Je comprends que ma participation à cette étude est volontaire et que je peux me retirer du projet de recherche en tout temps, sans préjudice ni obligation de quelque sorte de ma part.`, model: 'b6', errors: 'errors6'},
        { question: `Je comprends que je serai informé.e des objectifs de la recherche à laquelle je participe et que j’aurai accès au nom et aux coordonnées du chercheur responsable, si j’ai des questions concernant la recherche.`, model: 'b7', errors: 'errors7'},
      ],
      b1: false,
      b2: false,
      b3: false,
      b4: false,
      b5: false,
      b6: false,
      b7: false,
      date: moment()
        .locale("fr")
        .format("LL")
    };
  },
  mixins: [validationMixin],
  validations: {
    b1: { sameAs: sameAs(() => true) },
    b2: { sameAs: sameAs(() => true) },
    b3: { sameAs: sameAs(() => true) },
    b4: { sameAs: sameAs(() => true) },
    b5: { sameAs: sameAs(() => true) },
    b6: { sameAs: sameAs(() => true) },
    b7: { sameAs: sameAs(() => true) }
  },
  computed: {
    errors1() {
      const errors = [];
      if (!this.$v.b1.sameAs) {
        errors.push('Consentement requis');
      }
      return errors
    }
  },
  methods: {
    sendConsent() {
      this.error = false;
      this.$v.$touch();

      if (!this.$v.$anyError) {
        this.isLoading = true;
        this.$store
          .dispatch("sendConsent")
          .then(() => {
            this.isLoading = false;
            this.$router.push({ path: "/" });
          })
          .catch((error) => {
            this.isLoading = false;
            this.error = true;
          });
      }
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 25px;
}
</style>