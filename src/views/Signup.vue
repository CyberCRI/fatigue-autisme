<template>
  <div class="col-12">
    <loading-overlay :active="isLoading" color="#1976d3" />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
              <!-- Une erreur s'est produite -->
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
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
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
                    label="Password"
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
                    label="Verify Password"
                    name="verifyPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="verifyPassword"
                    required
                    :error-messages="verifyPasswordErrors"
                    @input="$v.verifyPassword.$touch()"
                    @blur="$v.verifyPassword.$touch()"
                  />
                  <v-row>
                    <v-col class="col-6">
                      <v-checkbox
                        label="En tant que Lycéen.ne"
                        v-model="enfant"
                      ></v-checkbox>
                    </v-col>
                    <v-col class="col-6" v-if="this.enfant">
                      <v-text-field
                        label="Identifiant du parent"
                        v-model="parentId"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errorMessage: '',
      // error: false,
      success: false,
      isLoading: false,
      email: "",
      password: "",
      verifyPassword: "",
      enfant: false,
      parentId: ""
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
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        console.log(process.env);
        axios
          .put(
            process.env.VUE_APP_ROOT_API + "/users",
            {
              email: this.email,
              password: this.password,
              isChild: this.enfant,
              parentId: this.parentId
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(response => {
            this.errorMessage = '';
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
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    verifyPasswordErrors() {
      const errors = [];
      if (!this.$v.verifyPassword.$dirty) return errors;
      !this.$v.verifyPassword.minLength &&
        errors.push("Verify password must be at least 8 characters long");
      !this.$v.verifyPassword.required &&
        errors.push("Verify password is required.");
      !this.$v.verifyPassword.sameAs && errors.push("Must be same as password");
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
