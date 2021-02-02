<template>
  <div class="container--fluid justify">
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <ProgressionBar :progression="progression"></ProgressionBar>
    </div>
    <div class="row">
      <div class="offset-1 col-10">
        <br /><br /><br /><br />
        <h1>Fiche de renseignements</h1>
        <h4>Important :</h4>
        Vous pouvez vous arrêter à tout moment : en cliquant sur le bouton «
        enregistrer et terminer plus tard » en bas de page, vos données seront
        conservées et vous pourrez terminer plus tard. N’hésitez pas à consulter
        le guide du participant pour connaître la marche à suivre lorsque vous
        voudrez vous reconnecter. En cas de question, n’hésitez pas à nous
        contacter à l’adresse suivante : etude.autisme@protonmail.com.
        <br /><br />
        <h2>1. Informations sur la famille</h2>
        <v-row>
          <v-col class="col-12"> N° Identifiant : {{ identifiant }} </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            Âge de l’enfant participant à l’étude, en années et mois (exemple :
            16 ans et 4 mois) :
          </v-col>
          <v-col class="col-6">
            <v-text-field
              v-model="ficheRenseignements.Q1AA"
              label="Années"
              type="text"
              :error-messages="Q1AAErrors"
              @input="$v.ficheRenseignements.Q1AA.$touch()"
              @blur="$v.ficheRenseignements.Q1AA.$touch()"
            />
          </v-col>
          <v-col class="col-6">
            <v-text-field
              v-model="ficheRenseignements.Q1AB"
              label="Mois"
              type="text"
              :error-messages="Q1ABErrors"
              @input="$v.ficheRenseignements.Q1AB.$touch()"
              @blur="$v.ficheRenseignements.Q1AB.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>Genre de l’enfant participant à l’étude :</p>
            <v-radio-group
              v-model="ficheRenseignements.Q1B"
              row
              :error-messages="Q1BErrors"
              @input="$v.ficheRenseignements.Q1B.$touch()"
              @blur="$v.ficheRenseignements.Q1B.$touch()"
            >
              <v-radio label="Garcon" value="garcon"></v-radio>
              <v-radio label="Fille" value="fille"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Votre enfant a-t-il des (demi-) frères ou (demi-) sœurs ?
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q1C"
              row
              :error-messages="Q1CErrors"
              @input="$v.ficheRenseignements.Q1C.$touch()"
              @blur="$v.ficheRenseignements.Q1C.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
            <v-row v-if="ficheRenseignements.Q1C === 'oui'">
              <v-col class="col-12">
                <p>Composition de la fratrie</p>
                <v-row
                  v-for="(item, index) in ficheRenseignements.Q1D"
                  :key="index"
                >
                  <v-col class="col-3">
                    <v-select
                      label="Genre"
                      name="frere-genre"
                      :items="genderList"
                      item-text="text"
                      item-value="value"
                      v-model="ficheRenseignements.Q1D[index].genre"
                    />
                  </v-col>
                  <v-col class="col-2">
                    <v-text-field
                      label="Nombre d'années"
                      name="frere-annee"
                      type="text"
                      v-model="ficheRenseignements.Q1D[index].annee"
                    />
                  </v-col>
                  <v-col class="col-2">
                    <v-text-field
                      label="Nombre de mois"
                      name="frere-mois"
                      type="text"
                      v-model="ficheRenseignements.Q1D[index].mois"
                    />
                  </v-col>
                  <v-col class="col-3">
                    <v-select
                      v-model="ficheRenseignements.Q1D[index].parente"
                      :items="parenteList"
                      item-text="text"
                      item-value="value"
                      label="Lien de parenté"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col class="col-2">
                    <v-icon class="minus" v-if="index !== 0" @click="removeQ1D(index)">mdi-minus-circle</v-icon>
                  </v-col>
                  <p
                    v-if="index + 1 === ficheRenseignements.Q1D.length"
                    class="font-italic"
                  >
                    Pour ajouter un autre membre cliquez sur
                    <v-icon @click="addQ1D()">mdi-plus-circle</v-icon>
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
        <v-row>
          <v-col class="col-12">
            Les personnes vivant dans le même domicile que votre enfant sont :
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="père"
              label="Père"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="Mère"
              label="Mère"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="Beau-père"
              label="Beau-père"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="Belle-mère"
              label="Belle-mère"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="(demi-) frère(s) / (demi-) sœur(s"
              label="(demi-) frère(s) / (demi-) sœur(s)"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="Grand-père"
              label="Grand-père"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-checkbox
              v-model="ficheRenseignements.Q1E"
              value="Grand-mère"
              label="Grand-mère"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-md-4">
            <v-text-field
              label="Autre, precisez"
              name="frere-mois"
              type="text"
              v-model="ficheRenseignements.Q1F"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Dans la famille nucléaire, d’autres personnes ont-elles une
              condition du spectre autistique ?
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q1G.reponse"
              row
              :error-messages="Q1GErrors"
              @input="$v.ficheRenseignements.Q1G.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q1G.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
            <v-text-field
              v-if="ficheRenseignements.Q1G.reponse === 'oui'"
              label="Précisez"
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <h2>2. Parcours diagnostique et accompagnements</h2>
        <v-textarea
          name="context"
          filled
          v-model="ficheRenseignements.Q2A"
          label="Quel diagnostic a reçu votre enfant ? Précisez si le diagnostic a été modifié par la suite (par exemple : «
        TSA » puis « Syndrome d’Asperger »)."
          auto-grow
          :error-messages="Q2AErrors"
          @input="$v.ficheRenseignements.Q2A.$touch()"
          @blur="$v.ficheRenseignements.Q2A.$touch()"
        ></v-textarea>
        <br />
        <v-text-field
          label="Date du diagnostic"
          v-model="ficheRenseignements.Q2B"
          :error-messages="Q2BErrors"
          @input="$v.ficheRenseignements.Q2B.$touch()"
          @blur="$v.ficheRenseignements.Q2B.$touch()"
        ></v-text-field>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="ficheRenseignements.Q2C"
              label="Par qui a été posé le diagnostic?"
              persistent-hint
              :error-messages="Q2CErrors"
              @input="$v.ficheRenseignements.Q2C.$touch()"
              @blur="$v.ficheRenseignements.Q2C.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>Votre enfant a-t-il reçu un ou plusieurs autres diagnostics ?</p>
            <v-radio-group
              v-model="ficheRenseignements.Q2D.reponse"
              row
              :error-messages="Q2DErrors"
              @input="$v.ficheRenseignements.Q2D.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q2D.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="ficheRenseignements.Q2D.reponse === 'oui'">
          <v-col class="col-12">Veuillez précisez :</v-col>
          <v-col class="col-12">
            <v-row
              v-for="(item, index) in ficheRenseignements.Q2D.diagnostic"
              :key="index"
            >
              <v-col class="col-3">
                <v-text-field
                  label="Diagnostic"
                  name="diagnostic"
                  type="text"
                  v-model="ficheRenseignements.Q2D.diagnostic[index].diagnostic"
                />
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  label="Date de diagnostic (année)"
                  name="datediagnostic"
                  type="text"
                  v-model="ficheRenseignements.Q2D.diagnostic[index].annee"
                />
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  label="Traitement médical éventuel"
                  name="traitementeventuel"
                  type="text"
                  v-model="ficheRenseignements.Q2D.diagnostic[index].traitement"
                />
              </v-col>
              <v-col class="col-3">
                <v-icon class="minus" v-if="index !== 0" @click="removeQ2D(index)">mdi-minus-circle</v-icon>
              </v-col>
            </v-row>
            <p class="font-italic">
              Pour ajouter un autre membre cliquez sur
              <v-icon @click="addQ2D()">mdi-plus-circle</v-icon>
            </p>
          </v-col>
        </v-row>
        <v-col class="col-12" v-if="ficheRenseignements.Q2D.reponse === 'oui'">
          <v-textarea
            name="context"
            v-model="ficheRenseignements.Q2D.contexte"
            filled
            label="Pouvez-vous préciser dans quel(s) contexte(s) votre enfant a-t-il reçu ce(s) diagnostic(s) ?"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-row>
          <v-col class="col-12">
            <p>
              Votre enfant bénéficie-t-il de services et d’accompagnement en
              dehors du temps scolaire :
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q2E.reponse"
              row
              :error-messages="ficheRenseignements.Q2EErrors"
              @input="$v.ficheRenseignements.Q2E.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q2E.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="ficheRenseignements.Q2E.reponse === 'oui'">
          <v-col class="col-12">Veuillez précisez :</v-col>
          <v-col class="col-12">
            <v-row
              v-for="(item, index) in ficheRenseignements.Q2E.accompagnement"
              :key="index"
            >
              <v-col class="col-3">
                <v-text-field
                  label="Accompagnement / service"
                  name="accompagnement"
                  type="text"
                  v-model="
                    ficheRenseignements.Q2E.accompagnement[index].accompagnement
                  "
                />
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  label="Structure le dispensant"
                  name="structure"
                  type="text"
                  v-model="
                    ficheRenseignements.Q2E.accompagnement[index].structure
                  "
                />
              </v-col>
              <v-col class="col-2">
                <v-text-field
                  label="Fréquence (ex : 3h/mois)"
                  name="frequence"
                  type="text"
                  v-model="
                    ficheRenseignements.Q2E.accompagnement[index].frequence
                  "
                />
              </v-col>
              <v-col class="col-2">
                <v-text-field
                  label="Date de début"
                  name="datedebut"
                  type="text"
                  v-model="ficheRenseignements.Q2E.accompagnement[index].debut"
                />
              </v-col>
              <v-col class="col-2">
                <v-icon class="minus" v-if="index !== 0" @click="removeQ2E(index)">mdi-minus-circle</v-icon>
              </v-col>
            </v-row>
          </v-col>
          <p class="font-italic">
            Pour ajouter un autre membre cliquez sur
            <v-icon @click="addQ2E()">mdi-plus-circle</v-icon>
          </p>
        </v-row>
        <br />
        <h2>3. Parcours scolaire</h2>
        <v-row>
          <v-col class="col-12">
            Indiquez en quelle classe est votre enfant, ainsi que la filière
            suivie
          </v-col>
          <v-col class="=col-6">
            <v-select
              v-model="ficheRenseignements.Q3A.reponse"
              :items="classeList"
              item-text="text"
              item-value="value"
              label="Classe"
              persistent-hint
              :error-messages="Q3AErrors"
              @input="$v.ficheRenseignements.Q3A.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3A.reponse.$touch()"
            ></v-select>
          </v-col>
          <v-col
            class="col-6"
            v-if="ficheRenseignements.Q3A.reponse === 'Autre'"
          >
            <v-text-field
              label="Précisez"
              name="autre"
              type="text"
              v-model="ficheRenseignements.Q3A.autre"
            />
          </v-col>
          <v-col
            class="col-12"
            v-if="
              ficheRenseignements.Q3A.reponse === 'Première' ||
                ficheRenseignements.Q3A.reponse === 'Terminale'
            "
          >
            <v-text-field
              label="Filière"
              name="filiere"
              type="text"
              v-model="ficheRenseignements.Q3B"
            />
          </v-col>
        </v-row>
        <v-textarea
          name="options"
          filled
          label="Mentionnez également si votre enfant est en section européenne, ou s’il suit certaines options ou cours en plus du programme scolaire général :"
          auto-grow
          v-model="ficheRenseignements.Q3C"
        ></v-textarea>
        <v-row>
          <v-col class="col-12">
            <p>Votre enfant est-il actuellement instruit à domicile ?</p>
            <v-radio-group
              v-model="ficheRenseignements.Q3C1.reponse"
              row
              :error-messages="Q3C1Errors"
              @input="$v.ficheRenseignements.Q3C1.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3C1.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
            <v-text-field
              label="Si vous le souhaitez, vous pouvez préciser depuis combien de temps et les raisons de votre choix"
              v-model="ficheRenseignements.Q3C1.precision"
              v-if="ficheRenseignements.Q3C1.reponse === 'oui'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="ficheRenseignements.Q3C1.reponse === 'non'">
          <v-col class="col-12">
            <p>L’établissement scolaire est-il :</p>
            <!-- <v-radio-group
              v-model="ficheRenseignements.Q3D"
              row
              :error-messages="Q3DErrors"
              @input="$v.ficheRenseignements.Q3D.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3D.reponse.$touch()"
            > -->
            <v-radio-group
              v-model="ficheRenseignements.Q3D"
              row
            >
              <v-radio label="Public" value="public"></v-radio>
              <v-radio label="Privé" value="prive"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Votre enfant est-il scolarisé à temps plein depuis son entrée au
              lycée :
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q3E.reponse"
              row
              :error-messages="Q3EErrors"
              @input="$v.ficheRenseignements.Q3E.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3E.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3E.reponse === 'non'"
          >
            <v-textarea
              name="raison"
              filled
              label="Si non, pouvez-vous précisez pour quelles raisons ?"
              auto-grow
              v-model="ficheRenseignements.Q3E.raisons"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Votre enfant reçoit t-il / elle le soutien d’un(e) accompagnant.e
              des élèves en situation de handicap (AESH, anciennement AVS) cette
              année :
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q3F.reponse"
              row
              :error-messages="Q3FErrors"
              @input="$v.ficheRenseignements.Q3F.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3F.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3F.reponse === 'oui'"
          >
            <v-text-field
              label="Précisez le nombre d’heures moyen par semaine : "
              name="nbheures"
              type="text"
              v-model="ficheRenseignements.Q3F.heures"
            />
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3F.reponse === 'oui'"
          >
            <v-textarea
              name="raison"
              filled
              label="Pouvez-vous préciser les raisons qui vous ont conduit, vous et votre enfant, à demander le soutien de l’AESH sur le temps scolaire ?"
              auto-grow
              v-model="ficheRenseignements.Q3F.raison"
            ></v-textarea>
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3F.reponse === 'non'"
          >
            <v-textarea
              name="raison"
              filled
              label="Pouvez-vous préciser les raisons qui vous ont conduit, vous et votre enfant, à ne pas demander le soutien de l’AESH sur le temps scolaire ?"
              auto-grow
              v-model="ficheRenseignements.Q3F.raison"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Depuis son entrée à l’école, votre enfant a-t-il déjà été
              déscolarisé temporairement :
            </p>
            <v-radio-group
              v-model="ficheRenseignements.Q3G.reponse"
              row
              :error-messages="Q3GErrors"
              @input="$v.ficheRenseignements.Q3G.reponse.$touch()"
              @blur="$v.ficheRenseignements.Q3G.reponse.$touch()"
            >
              <v-radio label="Oui" value="oui"></v-radio>
              <v-radio label="Non" value="non"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3G.reponse === 'oui'"
          >
            <v-textarea
              name="descolarise-duree-periode"
              filled
              label="Précisez la durée et la période"
              auto-grow
              v-model="ficheRenseignements.Q3G.duree"
            ></v-textarea>
          </v-col>
          <v-col
            class="col-12"
            v-if="ficheRenseignements.Q3G.reponse === 'oui'"
          >
            <v-textarea
              name="descolarise-motif"
              filled
              label="Si vous le souhaitez, vous pouvez préciser le motif de la déscolarisation : "
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
        <h2>
          4. Pour conclure
        </h2>
        <v-textarea
          name="autres-informations"
          filled
          label="Souhaitez-vous ajouter d’autres informations relatives au parcours scolaire, diagnostique ou d’accompagnement qu’il vous paraît utile de mentionner dans le cadre de cette étude sur la fatigue mentale des jeunes ayant une condition du spectre autistique ?Souhaitez-vous ajouter d’autres informations relatives au parcours scolaire, diagnostique ou d’accompagnement qu’il vous paraît utile de mentionner dans le cadre de cette étude sur la fatigue mentale des jeunes ayant une condition du spectre autistique ?"
          auto-grow
          v-model="ficheRenseignements.Q4A"
        ></v-textarea>
        <p>
          Nous vous remercions pour vos réponses !<br />
          Vous pouvez maintenant compléter le questionnaire concernant la
          fatigue mentale de votre enfant.
        </p>
        <p>
          Morgane Aubineau<br />
          Chercheuse postdoctorale<br />
          Centre de Recherches Interdisciplinaires :
          <a href="https://www.cri-paris.org/fr" target="_blank"
            >https://www.cri-paris.org/fr</a
          >
        </p>
        <p>
          Plus d’informations sur l’étude :
          <a href="https://cutt.ly/etude_fatigue" target="_blank"
            >https://cutt.ly/etude_fatigue</a
          >
        </p>
        <v-btn
          class="btn primary boutons"
          @click="saveForm()"
          >Enregistrer et terminer plus tard</v-btn
        >
        <v-btn
          class="btn primary"
          @click="sendForm()"
          >Envoyer le formulaire</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import ProgressionBar from "@/components/ProgressionBar";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  components: { ProgressionBar },
  data() {
    return {
      isLoading: false,
      menuDiagnostic: false,
      parenteList: [
        { text: "Frère / Soeur", value: "Non" },
        { text: "Demi frère / Demi Soeur", value: "Faible" }
      ],
      genderList: [
        { text: "Garcon", value: "Garcon" },
        { text: "Fille", value: "Fille" },
        { text: "Autre", value: "Autre" }
      ],
      ficheRenseignements: {
        Q1AA: this.$store.state.ficheRenseignements.Q1AA || "",
        Q1AB: this.$store.state.ficheRenseignements.Q1AB || "",
        Q1B: this.$store.state.ficheRenseignements.Q1B || "",
        Q1C: this.$store.state.ficheRenseignements.Q1C || "",
        Q1D: this.$store.state.ficheRenseignements.Q1D || [
          {
            genre: "",
            annee: "",
            mois: "",
            parente: ""
          }
        ],
        Q1E: this.$store.state.ficheRenseignements.Q1E || [],
        Q1F: this.$store.state.ficheRenseignements.Q1F || "",
        Q1G: this.$store.state.ficheRenseignements.Q1G || {
          reponse: "",
          precision: ""
        },
        Q2A: this.$store.state.ficheRenseignements.Q2A || "",
        Q2B: this.$store.state.ficheRenseignements.Q2B || "",
        Q2C: this.$store.state.ficheRenseignements.Q2C || "",
        Q2D: this.$store.state.ficheRenseignements.Q2D || {
          reponse: "",
          diagnostic: [
            {
              diagnostic: "",
              annee: "",
              traitement: "",
              contexte: ""
            }
          ],
          contexte: ""
        },
        Q2E: this.$store.state.ficheRenseignements.Q2E || {
          reponse: "",
          accompagnement: [
            {
              accompagnement: "",
              structure: "",
              frequence: "",
              debut: ""
            }
          ]
        },
        Q3A: this.$store.state.ficheRenseignements.Q3A || {
          reponse: "",
          autre: ""
        },
        Q3B: this.$store.state.ficheRenseignements.Q3B || "",
        Q3C: this.$store.state.ficheRenseignements.Q3C || "",
        Q3C1: this.$store.state.ficheRenseignements.Q3C1 || {
          reponse: "",
          precision: ""
        },
        Q3D: this.$store.state.ficheRenseignements.Q3D || "",
        Q3E: this.$store.state.ficheRenseignements.Q3E || {
          reponse: "",
          raisons: ""
        },
        Q3F: this.$store.state.ficheRenseignements.Q3F || {
          reponse: "",
          raisons: ""
        },
        Q3G: this.$store.state.ficheRenseignements.Q3G || {
          reponse: "",
          duree: ""
        },
        Q4A: this.$store.state.ficheRenseignements.Q4A || ""
      },
      diagnosticList: ["CRA", "Psychiatre en libéral"],
      classeList: ["Seconde", "Première", "Terminale", "Autre"]
    };
  },
  mixins: [validationMixin],
  validations: {
    ficheRenseignements: {
      Q1AA: {
        required,
        numeric
      },
      Q1AB: {
        required,
        numeric
      },
      Q1B: {
        required
      },
      Q1C: {
        required
      },
      Q1D: {
        genre: {},
        annee: { numeric },
        mois: { numeric },
        parente: {}
      },
      Q1G: {
        reponse: { required }
      },
      Q2A: {
        required
      },
      Q2B: {
        required
      },
      Q2C: {
        required
      },
      Q2D: {
        reponse: { required }
      },
      Q2E: {
        reponse: { required }
      },
      Q3A: {
        reponse: { required }
      },
      Q3C1: {
        reponse: { required }
      },
      Q3D: {},
      Q3E: {
        reponse: { required }
      },
      Q3F: {
        reponse: { required }
      },
      Q3G: {
        reponse: { required }
      }
    }
  },
  methods: {
    saveForm() {
      this.$store.commit("SAVE_FICHE_RENSEIGNEMENTS", this.ficheRenseignements);
      this.$router.push({ path: "/" });
    },
    sendForm() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        axios
          .put(
            process.env.VUE_APP_ROOT_API + "/renseignement",
            {
              content: this.ficheRenseignements,
              userId: this.$store.state.userId
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + this.$store.state.token
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            this.$router.push({ path: "/" });
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
            this.error = "Une erreur s'est produite";
          });
      }
    },
    addQ1D() {
      this.ficheRenseignements.Q1D.push({
        genre: "",
        annee: "",
        mois: "",
        parente: ""
      });
    },
    removeQ1D(index) {
      this.ficheRenseignements.Q1D.splice(index, 1);;
    },
    addQ2D() {
      this.ficheRenseignements.Q2D.diagnostic.push({
        diagnostic: "",
        annee: "",
        traitement: ""
      });
    },
    removeQ2D(index) {
      this.ficheRenseignements.Q2D.diagnostic.splice(index, 1);;
    },
    addQ2E() {
      this.ficheRenseignements.Q2E.accompagnement.push({
        accompagnement: "",
        structure: "",
        frequence: "",
        debut: ""
      });
    },
    removeQ2E(index) {
      this.ficheRenseignements.Q2E.accompagnement.splice(index, 1);;
    }
  },
  created() {
    console.log(this.progression);
    console.log(this.ficheRenseignements);
  },
  computed: {
    Q1AAErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q1AA.$dirty) return errors;
      !this.$v.ficheRenseignements.Q1AA.required &&
        errors.push("Champs requis");
      !this.$v.ficheRenseignements.Q1AA.numeric &&
        errors.push("Doit etre un nombre");
      return errors;
    },
    Q1ABErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q1AB.$dirty) return errors;
      !this.$v.ficheRenseignements.Q1AB.required &&
        errors.push("Champs requis");
      !this.$v.ficheRenseignements.Q1AB.numeric &&
        errors.push("Doit etre un nombre");
      return errors;
    },
    Q1BErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q1B.$dirty) return errors;
      !this.$v.ficheRenseignements.Q1B.required && errors.push("Champs requis");
      return errors;
    },
    Q1CErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q1C.$dirty) return errors;
      !this.$v.ficheRenseignements.Q1C.required && errors.push("Champs requis");
      return errors;
    },
    Q1GErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q1G.$dirty) return errors;
      !this.$v.ficheRenseignements.Q1G.required && errors.push("Champs requis");
      return errors;
    },
    Q2AErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q2A.$dirty) return errors;
      !this.$v.ficheRenseignements.Q2A.required && errors.push("Champs requis");
      return errors;
    },
    Q2BErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q2B.$dirty) return errors;
      !this.$v.ficheRenseignements.Q2B.required && errors.push("Champs requis");
      return errors;
    },
    Q2CErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q2C.$dirty) return errors;
      !this.$v.ficheRenseignements.Q2C.required && errors.push("Champs requis");
      return errors;
    },
    Q2DErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q2D.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q2D.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q2EErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q2E.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q2E.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3AErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3A.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3A.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3C1Errors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3C1.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3C1.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3DErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3D.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3D.required && errors.push("Champs requis");
      return errors;
    },
    Q3EErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3E.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3E.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3FErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3F.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3F.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    Q3GErrors() {
      const errors = [];
      if (!this.$v.ficheRenseignements.Q3G.reponse.$dirty) return errors;
      !this.$v.ficheRenseignements.Q3G.reponse.required &&
        errors.push("Champs requis");
      return errors;
    },
    progression() {
      let progression = 0;
      const fields = [
        this.ficheRenseignements.Q1AA,
        this.ficheRenseignements.Q1AB,
        this.ficheRenseignements.Q1B,
        this.ficheRenseignements.Q1C,
        this.ficheRenseignements.Q1G.reponse,
        this.ficheRenseignements.Q2A,
        this.ficheRenseignements.Q2B,
        this.ficheRenseignements.Q2C,
        this.ficheRenseignements.Q2D.reponse,
        this.ficheRenseignements.Q2E.reponse,
        this.ficheRenseignements.Q3A.reponse,
        this.ficheRenseignements.Q3C1.reponse,
        this.ficheRenseignements.Q3E.reponse,
        this.ficheRenseignements.Q3F.reponse,
        this.ficheRenseignements.Q3G.reponse
      ];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== "") {
          progression += 100 / fields.length;
        }
      }
      /*
      if (this.ficheRenseignements.Q1E.length > 0) {
        progression += 100 / fields.length;
      }
      */
      console.log(progression)
      return progression;
    },
    identifiant() {
      const str = this.$store.state.userId;
      return str.substring(str.length - 8, str.length);
    }
  }
};
</script>
<style scoped>
.boutons {
  margin-right: 30px;
}
.justify {
  text-align: justify;
}
.minus {
  margin-top: 20px;
}
</style>
