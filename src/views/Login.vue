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
            <br />
            <v-card class="elevation-12">
              <v-row style="text-align: center">
                <img :src="logoInserm" class="logo-inserm" />
                <img :src="logoCri" class="logo-cri" />
                <img :src="logoUdp" class="logo-udp" />
              </v-row>
              <v-row class="center">
                <h1>Étude sur la fatigabilité cognitive dans l’autisme</h1>
              </v-row>
              <v-row class="center">
                <h2 class="titre">Se connecter</h2>
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
                </v-form>
                <br />
                <span
                  ><a @click="$router.push({ path: '/forgot' })"
                    >Mot de passe oublié?</a
                  ></span
                >
              </v-card-text>
              <v-card-actions>
                <v-row class="center">
                  <v-col xs="12" md="6">
                    <v-btn @click.prevent="signUp" color="primary"
                      >Créer un compte</v-btn
                    >
                  </v-col>
                  <v-col xs="12" md="6">
                    <v-btn @click.prevent="login" color="success"
                      >Se connecter</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
// import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      email: "",
      password: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    setLayout(layout) {
      this.$store.commit("SET_LAYOUT", layout);
    },
    signUp() {
      this.$router.push({ path: "/signup" });
    },
    login() {
      this.errorMessage = '';
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;

        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(
          () => {
            this.setLayout("app-layout");
            this.$router.push('/accueil');
          },
          error => {
            this.errorMessage = error.response.data.message || "Une erreur s'est produite";
            this.isLoading = false;

          }
        );

        // axios
        //   .post(
        //     process.env.VUE_APP_ROOT_API + "/users/login",
        //     {
        //       email: this.email,
        //       password: this.password,
        //     },
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     this.isLoading = false;
        //     // const data = {
        //     //   token: response.data.token,
        //     //   email: response.data.user.email,
        //     //   userId: response.data.user._id,
        //     //   consent: response.data.user.consent,
        //     // };
        //     this.$store.commit("LOGIN_SUCCESS", response.data);
        //     this.setLayout("app-layout");
        //     this.$router.push({ path: "/accueil" });
        //   })
        //   .catch((error) => {
        //     this.isLoading = false;
        //     this.error = error.response.data;
        //   });
      }
    },
  },
  computed: {
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
      !this.$v.email.email &&
        errors.push("Ceci n'est pas une adresse e-mail valide.");
      !this.$v.email.required &&
        errors.push("Veuillez renseigner votre adresse e-mail.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Doit contenir qu moins 8 caractères");
      !this.$v.password.required &&
        errors.push("Veuillez entrer un mot de passe.");
      return errors;
    },
  },
  mounted() {
    this.setLayout("simple-layout");
  },
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
  margin: 50px auto;
  font-size: 30px;
}
.center {
  text-align: center;
}
</style>
