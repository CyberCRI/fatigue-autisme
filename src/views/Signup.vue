<template>
  <div class="col-12">
    <loading-overlay :active="isLoading" color="#1976d3" />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
            </v-alert>
            <v-alert v-if="success" type="success">
              Votre compte a bien été créé
            </v-alert>
            <br />
            <v-card class="elevation-12">
              <v-row style="text-align: center">
                <img :src="logoInserm" class="logo-inserm" />
                <img :src="logoCri" class="logo-cri" />
                <img :src="logoUdp" class="logo-udp" />
              </v-row>
              <v-row class="center">
                <h2 class="titre">Créer un compte</h2>
              </v-row>
              <v-row align="center" justify="center">
                <v-col sm="4">Je suis: </v-col>
                <v-col sm="4"><v-select
                  :items="['Un parent', 'Un.e lycéen.ne']"
                  v-model="whoAmI"
                ></v-select></v-col>
              </v-row>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Adresse e-mail"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    required
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                  <v-text-field
                    id="password"
                    label="Mot de passe"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                  <v-text-field
                    label="Vérification du mot de passe"
                    name="verifyPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="verifyPassword"
                    required
                    :error-messages="verifyPasswordErrors"
                    @input="$v.verifyPassword.$touch()"
                    @blur="$v.verifyPassword.$touch()"
                  />
                  <v-text-field
                    v-if="!this.isParent"
                    label="Identifiant du parent"
                    name="parentId"
                    prepend-icon="mdi-border-color"
                    type="text"
                    v-model="parentId"
                    required
                    :error-messages="parentIdErrors"
                    @input="$v.parentId.$touch()"
                    @blur="$v.parentId.$touch()"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click.prevent="login" color="primary">Retour</v-btn>
                <v-spacer />
                <v-btn @click.prevent="signUp" color="primary"
                  >Créer un compte</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs, requiredIf } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errorMessage: '',
      success: false,
      isLoading: false,
      email: "",
      password: "",
      verifyPassword: "",
      parentId: "",
      whoAmI: "Un parent"
    };
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    verifyPassword: {
      required,
      minLength: minLength(8),
      sameAs: sameAs("password")
    },
    parentId: {
      required: requiredIf(function () {
        return !this.isParent;
      })
    }

  },
  methods: {
    setLayout(layout) {
      this.$store.commit("SET_LAYOUT", layout);
    },
    login() {
      this.$router.go(-1);
    },
    signUp() {
      
      this.errorMessage = '';
      this.$v.$touch();
      console.log(this.$v);
      if (!this.$v.$anyError) {
        this.isLoading = true;
        console.log(process.env);
        axios
          .put(
            process.env.VUE_APP_ROOT_API + "/users",
            {
              email: this.email,
              password: this.password,
              isChild: !this.isParent,
              parentId: this.parentId
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            this.success = true;
          })
          .catch(error => {
            this.errorMessage = error.response.data.message || "Une erreur s'est produite";
            this.isLoading = false;
            this.success = false;
          });
      }
    }
  },
  computed: {
    isParent() {
      return this.whoAmI === 'Un parent';
    },
    logoCri() {
      return require("@/assets/logo-cri.png");
    },
    logoInserm() {
      return require("@/assets/logo-inserm.png");
    },
    logoUdp() {
      return require("@/assets/logo-udp.png");
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Ceci n'est pas une adresse e-mail valide.");
      !this.$v.email.required && errors.push("Veuillez renseigner votre adresse e-mail.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Le mot de passe doit avoir au moins 8 caractères.");
      !this.$v.password.required && errors.push("Veuillez entrer un mot de passe.");
      return errors;
    },
    verifyPasswordErrors() {
      const errors = [];
      if (!this.$v.verifyPassword.$dirty) return errors;
      !this.$v.verifyPassword.minLength &&
        errors.push("Le mot de passe doit avoir au moins 8 caractères.");
      !this.$v.verifyPassword.required &&
        errors.push("Veuillez recopier votre mot de passe.");
      !this.$v.verifyPassword.sameAs && errors.push("Les deux mots de passe doivent être identiques.");
      return errors;
    },
    parentIdErrors() {
      const errors = [];
      if (!this.$v.parentId.$dirty) return errors;
      !this.$v.parentId.required &&
        errors.push("Veuillez renseigner l'identifiant de votre parent.");
      return errors;
    }
  },
  mounted() {
    this.setLayout("simple-layout");
    if (this.$route.query.code) {
      this.getToken(this.$route.query.code);
    }
  }
};
</script>

<style scoped>
.logo-cri {
  height: 70px !important;
  margin: 0 30px;
}
.logo-inserm {
  height: 50px !important;
  margin-left: 20px;
  margin-top: 5px;
}
.logo-udp {
  height: 55px !important;
}
.titre {
  text-align: center;
  margin: 30px auto;
  font-size: 30px;
}
.center {
  text-align: center;
}
</style>
