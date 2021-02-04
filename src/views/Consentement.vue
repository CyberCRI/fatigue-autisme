<template>
  <div class="container--fluid">
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <div class="offset-1 col-10">
        <v-row>
          <v-col class="col-12">
            <h2>
              Formulaire de consentement de participation au projet de recherche
            </h2>
            <p>
              Intitulé de l’étude : Examination of mental fatigue in autistic
              students in high school [Évaluation de la fatigue mentale chez les
              lycéens présentant une condition du spectre autistique]
            </p>
            <p>
              Responsable du projet et coordonnées : Dr Morgane Aubineau,
              chercheuse postdoctorale Centre de Recherche Interdisciplinaires,
              8 rue Charles V, 75004 Paris Emails :
              morgane.aubineau@cri-paris.org ; etude.autisme@protonmail.com
            </p>
            <p>
              Afin de participer à cette étude de recherche, il est nécessaire
              que vous donniez votre consentement éclairé. En signant ce
              document, vous reconnaissez que vous comprenez la nature de
              l’étude et votre rôle dans la recherche, et que vous acceptez d’y
              prendre part.
            </p>
            <p>
              Veuillez s’il vous plaît lire attentivement les points suivants
              avant de signer :
            </p>
            <v-checkbox
              v-model="check1"
              label="Je comprends que l’objectif principal de cette recherche est de concevoir un questionnaire portant sur l’évaluation de la fatigue mentale chez les élèves de secondaire présentant une
            condition du spectre autistique, afin de mieux la prendre en compte et la prévenir."
              :error-messages="check1Errors"
              @change="$v.check1.$touch()"
              @blur="$v.check1.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="check2"
              label="Je comprends que ma participation consiste en 1) la complétion d’un document en ligne
            concernant le parcours diagnostique, scolaire et de services de mon enfant et 2) la
            complétion d’un questionnaire en ligne portant sur la fatigue mentale perçue chez mon
            enfant et sur son rythme de vie."
              :error-messages="check2Errors"
              @change="$v.check2.$touch()"
              @blur="$v.check2.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="check3"
              label="A la fin remplacer nom prenom par : Je comprends qu’en signant ce document, je consens à ce que mon (mes) enfant(s)  puisse(nt) également participer à cette
recherche, selon les termes précisés dans le consentement qu’il(s) / elle(s) aura (auront) signé."
              :error-messages="check3Errors"
              @change="$v.check3.$touch()"
              @blur="$v.check3.$touch()"
            ></v-checkbox>
            <p>
              Je comprends que mon identité ne sera pas liée à mes données, et
              que toute information que
            </p>
            <p>
              je fournirai restera confidentielle. Je comprends que mes données
              seront chiffrées et stockées de manière sécurisée, uniquement
              accessibles aux chercheurs de l’étude et qu’elles seront détruites
              deux ans après la dernière publication des résultats.
            </p>
            <v-checkbox
              v-model="check4"
              label="Je comprends que les données découlant de cette étude pourront faire l'objet de publications
            ou de présentations scientifiques. En tout temps, mon anonymat y sera préservé."
              :error-messages="check4Errors"
              @change="$v.check4.$touch()"
              @blur="$v.check4.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="check5"
              label="Je comprends que ma participation à cette étude est volontaire et que je peux me retirer du
            projet de recherche en tout temps, sans préjudice ni obligation de quelque sorte de ma part."
              :error-messages="check5Errors"
              @change="$v.check5.$touch()"
              @blur="$v.check5.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="check6"
              label="Je comprends que je serai informé.e des objectifs de la recherche à laquelle je participe et
            que j’aurai accès au nom et aux coordonnées du chercheur responsable, si j’ai des questions
            concernant la recherche."
              :error-messages="check6Errors"
              @change="$v.check6.$touch()"
              @blur="$v.check6.$touch()"
            ></v-checkbox>
            <p>
              En signant ce formulaire, je confirme que j’ai bien plus de 18
              ans, que j’ai compris les informations ci-dessus et que je consens
              à participer à cette étude conduite au Centre de Recherche
              Interdisciplinaires, à Paris.
            </p>
            <br />
            <v-text-field
              v-model="date"
              label="Date du jour"
              readonly
            ></v-text-field
            ><br />
            <v-btn @click.prevent="save" color="primary">Valider</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { sameAs } from "vuelidate/lib/validators";
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      check6: false,
      date: moment()
        .locale("fr")
        .format("LL")
    };
  },
  mixins: [validationMixin],
  validations: {
    check1: { sameAs: sameAs(() => true) },
    check2: { sameAs: sameAs(() => true) },
    check3: { sameAs: sameAs(() => true) },
    check4: { sameAs: sameAs(() => true) },
    check5: { sameAs: sameAs(() => true) },
    check6: { sameAs: sameAs(() => true) }
  },
  methods: {
    save() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        axios
          .patch(
            process.env.VUE_APP_ROOT_API + "/users",
            {
              // id: this.$store.state.auth.user.userId,
              consent: true
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
            this.$store.commit("CONSENT")
            this.$router.push({ path: "/" });
          })
          .catch(error => {
            this.isLoading = false;
            this.error = true;
          });
      }
    }
  },
  computed: {
    check1Errors() {
      const errors = [];
      !this.$v.check1.sameAs && errors.push("Consentement requis");
      return errors;
    },
    check2Errors() {
      const errors = [];
      !this.$v.check2.sameAs && errors.push("Consentement requis");
      return errors;
    },
    check3Errors() {
      const errors = [];
      !this.$v.check3.sameAs && errors.push("Consentement requis");
      return errors;
    },
    check4Errors() {
      const errors = [];
      !this.$v.check4.sameAs && errors.push("Consentement requis");
      return errors;
    },
    check5Errors() {
      const errors = [];
      !this.$v.check5.sameAs && errors.push("Consentement requis");
      return errors;
    },
    check6Errors() {
      const errors = [];
      !this.$v.check6.sameAs && errors.push("Consentement requis");
      return errors;
    }
  }
};
</script>
<style scoped>
.center {
  text-align: center;
}
.bouton {
  width: 300px;
}
</style>
