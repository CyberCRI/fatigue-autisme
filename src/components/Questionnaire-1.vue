<template>
  <div>
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="offset-1 col-10">
      <br /><br /><br /><br />
      <h2>
        1. Votre perception de la fatigue mentale et ses manifestations chez
        votre enfant
      </h2>
      <div class="bluebox">
        <p>
          Avant de démarrer, voici quelques explications sur ce que nous
          appelons la fatigue mentale.
        </p>
        <p>
          La fatigue mentale (aussi appelée fatigue cognitive, ou fatigabilité
          mentale) est relativement peu étudiée en recherche et en médecine. Or,
          nous savons qu’elle peut avoir des répercussions importantes sur le
          quotidien des personnes, tant au niveau personnel que scolaire,
          professionnel ou social.
        </p>
        <p>
          Elle peut être définie comme une diminution progressive des ressources
          cognitives lors de tâches cognitives soutenues, et ce indépendamment
          du fait d’avoir sommeil. Elle peut s’observer dans des contextes
          variés, où l’attention et les fonctions exécutives (planification,
          anticipation, mémoire de travail, etc.) sont sollicitées. Les
          personnes peuvent par exemple avoir davantage de difficultés pour
          planifier une tâche, traiter l’information ou faire abstraction
          d’informations non pertinentes.
        </p>
      </div>
      <h3>
        A. De façon générale, avez-vous l’impression que votre enfant est
        mentalement plus fatigable que la plupart des jeunes de son âge ?
      </h3>
      <v-radio-group
        v-model="questionnaire1.Q1A"
        :error-messages="Q1AErrors"
        @input="$v.questionnaire1.Q1A.$touch()"
        @blur="$v.questionnaire1.Q1A.$touch()"
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Oui, un peu" value="Oui, un peu"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non, ou assez" value="Non, ou assez"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non, pas du tout" value="Non, pas du tout">
            </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <h3>
        B. Diriez-vous que depuis son entrée au lycée, votre enfant semble
        mentalement plus fatigué qu’auparavant ?
      </h3>
      <v-radio-group
        v-model="questionnaire1.Q1B.reponse"
        :error-messages="Q1BErrors"
        @input="$v.questionnaire1.Q1B.reponse.$touch()"
        @blur="$v.questionnaire1.Q1B.reponse.$touch()"
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-row v-if="questionnaire1.Q1B.reponse === 'Oui'">
        <v-col class="col-12">
          Si oui, quelles raisons peuvent, selon vous, expliquer cette
          fatigabilité accrue ?
        </v-col>
        <v-col class="col-12">
          <v-textarea
            name="context"
            v-model="questionnaire1.Q1B.raisons"
            filled
            label="Si oui, quelles raisons peuvent, selon vous, expliquer cette fatigabilité accrue ?"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col class="col-12">
          <v-textarea
            name="context"
            v-model="questionnaire1.Q1B.manifestation"
            filled
            label="Si oui, comment cela se manifeste-t-il chez votre enfant ?"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <h3>
        C. Votre enfant vous en parle-t-il ouvertement, ou se plaint-il du fait
        d’être particulièrement fatigué (mentalement, ou plus généralement) ?
      </h3>
      <v-radio-group
        v-model="questionnaire1.Q1C.reponse"
        :error-messages="Q1CErrors"
        @input="$v.questionnaire1.Q1C.reponse.$touch()"
        @blur="$v.questionnaire1.Q1C.reponse.$touch()"
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-row v-if="questionnaire1.Q1C.reponse === 'Oui'">
        <v-col class="col-12">
          <v-textarea
            name="context"
            v-model="questionnaire1.Q1C.precision"
            filled
            label="Si oui, pouvez-vous préciser ?"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h3>
            D. À l’heure actuelle, diriez-vous que cette fatigue mentale accrue
            a des répercussions sur:
          </h3>
        </v-col>
      </v-row>
      <p>Ses apprentissages :</p>
      <v-radio-group
        v-model="questionnaire1.Q1D1"
        :error-messages="Q1D1Errors"
        @input="$v.questionnaire1.Q1D1.$touch()"
        @blur="$v.questionnaire1.Q1D1.$touch()"
        row
      >
        <v-row>
          <v-col class="col-3">
            <v-radio label="pas du tout" value="pas du tout"></v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="un peu" value="un peu"></v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="assez" value="assez"></v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="beaucoup" value="beaucoup"></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-row>
        <v-col class="col-12">
          <p>Ses relations avec la famille proche :</p>
          <v-radio-group
            v-model="questionnaire1.Q1D2"
            :error-messages="Q1D2Errors"
            @input="$v.questionnaire1.Q1D2.$touch()"
            @blur="$v.questionnaire1.Q1D2.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>
            Ses relations avec les personnes extérieures (incluant
            l’environnement scolaire) :
          </p>
          <v-radio-group
            v-model="questionnaire1.Q1D3"
            :error-messages="Q1D3Errors"
            @input="$v.questionnaire1.Q1D3.$touch()"
            @blur="$v.questionnaire1.Q1D3.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>Sa capacité à tisser et à garder des relations amicales :</p>
          <v-radio-group
            v-model="questionnaire1.Q1D4"
            :error-messages="Q1D4Errors"
            @input="$v.questionnaire1.Q1D4.$touch()"
            @blur="$v.questionnaire1.Q1D4.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>Ses loisirs, intérêts et passions :</p>
          <v-radio-group
            v-model="questionnaire1.Q1D5"
            :error-messages="Q1D5Errors"
            @input="$v.questionnaire1.Q1D5.$touch()"
            @blur="$v.questionnaire1.Q1D5.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>
            Son fonctionnement cognitif général (mémoire, attention,
            raisonnement, planification, etc.) :
          </p>
          <v-radio-group
            v-model="questionnaire1.Q1D6"
            :error-messages="Q1D6Errors"
            @input="$v.questionnaire1.Q1D6.$touch()"
            @blur="$v.questionnaire1.Q1D6.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>
            Sa motivation à s’investir scolairement, dans des projets, etc. :
          </p>
          <v-radio-group
            v-model="questionnaire1.Q1D7"
            :error-messages="Q1D7Errors"
            @input="$v.questionnaire1.Q1D7.$touch()"
            @blur="$v.questionnaire1.Q1D7.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <p>
            Son fonctionnement émotionnel (impulsivité, stress, pleurs, etc.) :
          </p>
          <v-radio-group
            v-model="questionnaire1.Q1D8"
            :error-messages="Q1D8Errors"
            @input="$v.questionnaire1.Q1D8.$touch()"
            @blur="$v.questionnaire1.Q1D8.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
        <v-col class="col-12">
          <p>
            Sa gestion de l’environnement sensoriel :
          </p>
          <v-radio-group
            v-model="questionnaire1.Q1D9.reponse"
            :error-messages="Q1D9Errors"
            @input="$v.questionnaire1.Q1D9.reponse.$touch()"
            @blur="$v.questionnaire1.Q1D9.reponse.$touch()"
            row
          >
            <v-col class="col-3">
              <v-radio label="pas du tout" value="pas du tout"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="un peu" value="un peu"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="assez" value="assez"></v-radio>
            </v-col>
            <v-col class="col-3">
              <v-radio label="beaucoup" value="beaucoup"></v-radio>
            </v-col>
          </v-radio-group>
        </v-col>
        <v-col
          class="col-12"
          v-if="
            questionnaire1.Q1D9.reponse === 'un peu' ||
              questionnaire1.Q1D9.reponse === 'assez' ||
              questionnaire1.Q1D9.reponse === 'beaucoup'
          "
        >
          <p>
            Pouvez-vous évaluer, à l’aide du curseur, l’intensité des
            répercussions de la fatigue sur les différentes sensibilités
            sensorielles :
          </p>
          Exemple :
          <v-img src="../assets/slider.jpg" width="250px" />
          <table>
            <thead>
              <tr class="table-title">
                <th>
                  Sensibilité sensorielle
                </th>
                <th>
                  « Aucune répercussion » à « Répercussions majeures ».
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-color">
                <td class="table-first">Ouie</td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.ouie"
                  ></v-slider>
                </td>
              </tr>
              <tr>
                <td>Vision / Luminosité</td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.vision"
                  ></v-slider>
                </td>
              </tr>
              <tr class="table-color">
                <td>Toucher</td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.toucher"
                  ></v-slider>
                </td>
              </tr>
              <tr>
                <td>Gout</td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.gout"
                  ></v-slider>
                </td>
              </tr>
              <tr class="table-color">
                <td>Odorat</td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.odorat"
                  ></v-slider>
                </td>
              </tr>
              <tr>
                <td>
                  Système vestibulaire et proprioceptif<br />
                  (Equilibre, mouvements, perception du corps dans l'espace,
                  etc.)
                </td>
                <td class="table-second">
                  <v-slider
                    max="100"
                    min="0"
                    v-model="questionnaire1.Q1D9.systemevestibulaire"
                  ></v-slider>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col class="col-12">
          <v-text-field
            label="Autre, veuillez préciser"
            v-model="questionnaire1.Q1D9.autre.reponse"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <h3>
        E. Considérez-vous que l’emploi du temps scolaire actuel de votre enfant
        est trop chargé ?
      </h3>
      <v-radio-group
        v-model="questionnaire1.Q1E"
        :error-messages="Q1EErrors"
        @input="$v.questionnaire1.Q1E.$touch()"
        @blur="$v.questionnaire1.Q1E.$touch()"
      >
        <v-col class="col-3">
          <v-radio label="Oui, beaucoup" value="Oui, beaucoup"> </v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Oui, un peu" value="Oui, un peu"> </v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Non, ou assez" value="Non, ou assez"> </v-radio>
        </v-col>
        <v-col class="col-3">
          <v-radio label="Non, pas du tout" value="Non, pas du tout"> </v-radio>
        </v-col>
      </v-radio-group>
      <v-row>
        <v-col class="col-12">
          <h3>
            F. Avez-vous déjà eu des échanges avec le lycée concernant l’impact
            de cette fatigue mentale accrue chez votre enfant ?
          </h3>
        </v-col>
        <v-radio-group
          v-model="questionnaire1.Q1F.reponse"
          :error-messages="Q1FErrors"
          @input="$v.questionnaire1.Q1F.reponse.$touch()"
          @blur="$v.questionnaire1.Q1F.reponse.$touch()"
        >
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-radio-group>
      </v-row>
      <v-row v-if="questionnaire1.Q1F.reponse === 'Oui'">
        <v-col class="col-12">
          <v-textarea
            v-model="questionnaire1.Q1F.precision"
            filled
            label="Si oui, pouvez-vous préciser : Contexte, aménagements éventuels, adaptation du personnel enseignant, etc."
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h3>
            G. Avez-vous constaté l’apparition de symptômes physiques vous
            semblant liés à la fatigue mentale (maux de tête, de ventre,
            problèmes de dos, aggravation de symptômes déjà existants, etc.) :
          </h3>
        </v-col>
        <v-radio-group
          v-model="questionnaire1.Q1G.reponse"
          :error-messages="Q1GErrors"
          @input="$v.questionnaire1.Q1G.reponse.$touch()"
          @blur="$v.questionnaire1.Q1G.reponse.$touch()"
        >
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-radio-group>
      </v-row>
      <v-row v-if="questionnaire1.Q1G.reponse === 'Oui'">
        <v-col class="col-12">
          <v-textarea
            name="context"
            filled
            v-model="questionnaire1.Q1G.precision"
            label="Si oui, pouvez-vous préciser"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h3>
            H. Avez-vous fait part à votre médecin traitant ou d’autres
            professionnels de santé de la fatigue mentale observée chez votre
            enfant :
          </h3>
        </v-col>
        <v-radio-group
          v-model="questionnaire1.Q1H.reponse"
          :error-messages="Q1HErrors"
          @input="$v.questionnaire1.Q1H.reponse.$touch()"
          @blur="$v.questionnaire1.Q1H.reponse.$touch()"
        >
          <v-col class="col-3">
            <v-radio label="Oui" value="Oui"> </v-radio>
          </v-col>
          <v-col class="col-3">
            <v-radio label="Non" value="Non"> </v-radio>
          </v-col>
        </v-radio-group>
      </v-row>
      <v-row v-if="questionnaire1.Q1H.reponse === 'Oui'">
        <v-col class="col-12">
          <v-textarea
            v-model="questionnaire1.Q1H.precision"
            filled
            label="Si oui, pouvez-vous préciser ce qu’il vous a été conseillé ou proposé (modifications d’habitudes de vie, traitements éventuels, orientation vers des spécialistes, etc.) ? "
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
import { required, numeric } from "vuelidate/lib/validators";
export default {
  name: "questionnaire1",
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      questionnaire1: {
        Q1A: this.$store.state.questionnaire1.Q1A || "",
        Q1B: this.$store.state.questionnaire1.Q1B || {
          reponse: "",
          raisons: "",
          manifestation: ""
        },
        Q1C: this.$store.state.questionnaire1.Q1C || {
          reponse: "",
          precision: ""
        },
        Q1D1: this.$store.state.questionnaire1.Q1D1 || "",
        Q1D2: this.$store.state.questionnaire1.Q1D2 || "",
        Q1D3: this.$store.state.questionnaire1.Q1D3 || "",
        Q1D4: this.$store.state.questionnaire1.Q1D4 || "",
        Q1D5: this.$store.state.questionnaire1.Q1D5 || "",
        Q1D6: this.$store.state.questionnaire1.Q1D6 || "",
        Q1D7: this.$store.state.questionnaire1.Q1D7 || "",
        Q1D8: this.$store.state.questionnaire1.Q1D8 || "",
        Q1D9: this.$store.state.questionnaire1.Q1D9 || {
          reponse: "",
          ouie: "",
          vision: "",
          toucher: "",
          gout: "",
          odorat: "",
          systemevestibulaire: "",
          autre: {
            reponse: "",
            valeur: ""
          }
        },
        Q1E: this.$store.state.questionnaire1.Q1E || "",
        Q1F: this.$store.state.questionnaire1.Q1F || {
          reponse: "",
          precision: ""
        },
        Q1G: this.$store.state.questionnaire1.Q1G || {
          reponse: "",
          precision: ""
        },
        Q1H: this.$store.state.questionnaire1.Q1C || {
          reponse: "",
          precision: "",
          autre: ""
        }
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    questionnaire1: {
      Q1A: {
        required
      },
      Q1B: {
        reponse: { required }
      },
      Q1C: {
        reponse: { required }
      },
      Q1D1: { required },
      Q1D2: { required },
      Q1D3: { required },
      Q1D4: { required },
      Q1D5: { required },
      Q1D6: { required },
      Q1D7: { required },
      Q1D8: { required },
      Q1D9: {
        reponse: { required }
      },
      Q1E: { required },
      Q1F: {
        reponse: { required }
      },
      Q1G: {
        reponse: { required }
      },
      Q1H: {
        reponse: { required }
      }
    }
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_QUESTIONNAIRE1", this.questionnaire1);
      this.$router.push({ path: "/" });
    },
    sendForm() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        axios
          .put(
            process.env.VUE_APP_ROOT_API + "/questionnaire",
            {
              content: this.questionnaire1,
              userId: this.$store.state.userId
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
            this.$emit("next", 2);
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
          });
      }
    }
  },
  computed: {
    Q1AErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1A.$dirty) return errors;
      !this.$v.questionnaire1.Q1A.required && errors.push("Champs requis");
      return errors;
    },
    Q1BErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1B.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1B.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q1CErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1C.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1C.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q1D1Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D1.$dirty) return errors;
      !this.$v.questionnaire1.Q1D1.required && errors.push("Champs requis");
      return errors;
    },
    Q1D2Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D2.$dirty) return errors;
      !this.$v.questionnaire1.Q1D2.required && errors.push("Champs requis");
      return errors;
    },
    Q1D3Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D3.$dirty) return errors;
      !this.$v.questionnaire1.Q1D3.required && errors.push("Champs requis");
      return errors;
    },
    Q1D4Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D4.$dirty) return errors;
      !this.$v.questionnaire1.Q1D4.required && errors.push("Champs requis");
      return errors;
    },
    Q1D5Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D5.$dirty) return errors;
      !this.$v.questionnaire1.Q1D5.required && errors.push("Champs requis");
      return errors;
    },
    Q1D6Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D6.$dirty) return errors;
      !this.$v.questionnaire1.Q1D6.required && errors.push("Champs requis");
      return errors;
    },
    Q1D7Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D7.$dirty) return errors;
      !this.$v.questionnaire1.Q1D7.required && errors.push("Champs requis");
      return errors;
    },
    Q1D8Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D8.$dirty) return errors;
      !this.$v.questionnaire1.Q1D8.required && errors.push("Champs requis");
      return errors;
    },
    Q1D9Errors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1D9.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1D9.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q1EErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1E.$dirty) return errors;
      !this.$v.questionnaire1.Q1E.required && errors.push("Champs requis");
      return errors;
    },
    Q1FErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1F.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1F.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q1GErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1G.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1G.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q1HErrors() {
      const errors = [];
      if (!this.$v.questionnaire1.Q1H.reponse.$dirty) return errors;
      !this.$v.questionnaire1.Q1H.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    progression() {
      let progression = 0;
      const fields = [
        this.questionnaire1.Q1A,
        this.questionnaire1.Q1B.reponse,
        this.questionnaire1.Q1C.reponse,
        this.questionnaire1.Q1D1,
        this.questionnaire1.Q1D2,
        this.questionnaire1.Q1D3,
        this.questionnaire1.Q1D4,
        this.questionnaire1.Q1D5,
        this.questionnaire1.Q1D6,
        this.questionnaire1.Q1D7,
        this.questionnaire1.Q1D8,
        this.questionnaire1.Q1D9.reponse,
        this.questionnaire1.Q1E,
        this.questionnaire1.Q1F.reponse,
        this.questionnaire1.Q1G.reponse,
        this.questionnaire1.Q1H.reponse
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += 100 / 6 / fields.length;
        }
      }
      return Math.round(progression);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
}
.bluebox {
  background-color: #cadfe8;
  margin: 20px 0;
  padding: 20px;
}
table {
  width: 100%;
  text-align: center;
}
.table-title {
  background-color: #9999cc;
  color: #fff;
  height: 50px;
}
.table-color {
  background-color: #e6e6ff;
}
.table-first {
  width: 30%;
}
.table-second {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.boutons {
  margin: 30px 30px 30px 0;
}
</style>
