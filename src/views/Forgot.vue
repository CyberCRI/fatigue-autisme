<template>
  <div class="col-12">
    <loading-overlay :active="isLoading" color="#1976d3" />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert v-if="error !== ''" type="error">
              {{ error }}
            </v-alert>
            <br />
            <v-card class="elevation-12">
              <v-row style="text-align: center">
                <img :src="logoInserm" class="logo-inserm" />
                <img :src="logoCri" class="logo-cri" />
                <img :src="logoUdp" class="logo-udp" />
              </v-row>
              <v-row class="center">
                <h1 class="titre">Récupérer mon compte</h1>
              </v-row>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    required
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.prevent="login" color="primary"
                  >Récupérer mon compte</v-btn
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
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      error: "",
      clientId: "8fDg6FeJSVKZpsI9aAT0NRq0esiQAWj6RAEsFmUJ",
      clientSecret:
        "fcxr6wAVa3i6fyvmoEPbKjNP6FBVTXpaxsYHTVqhHURanDNX5TJj75Rc1UlP1XDC2d1lVJv2eBYjC0CkBzozYtTOxtKN16QJ2xnkFUs90aekoHBwEvCNTXPl1m5lcIOc",
      isLoading: false,
      email: "",
      password: ""
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
    }
  },
  methods: {
    setLayout(layout) {
      this.$store.commit("SET_LAYOUT", layout);
    },
    signUp() {
      this.$router.push({ path: "/signup" });
    },
    login() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isLoading = true;
        axios
          .post(
            process.env.VUE_APP_ROOT_API + "/users/login",
            {
              email: this.email,
              password: this.password
            },
            {
              headers: {
                "content-type": "application/json"
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            const data = {
              token: response.data.token,
              email: response.data.user.email,
              userId: response.data.user._id,
              consent: response.data.user.consent
            };
            this.$store.commit("LOGIN_SUCCESS", data);
            this.setLayout("app-layout");
            this.$router.push({ path: "/" });
          })
          .catch(error => {
            this.isLoading = false;
            this.error = error.response.data;
          });
      }
    },
    authorize() {
      window.location =
        "https://www.openhumans.org/direct-sharing/projects/oauth2/authorize/?client_id=" +
        this.clientId +
        "&response_type=code";
      /*
      const authData = {
        token: "555555555555555"
      };
      this.$store.commit("LOGIN_SUCCESS", authData);
      this.setLayout("app-layout");
      this.$router.push({ path: "/" });
      */
    },
    getToken(code) {
      /*
      const data = new FormData();
      data.append("grant_type", "authorization_code");
      data.append("code", "GBl8upk5my3XrDMm6mxg89SywpLoWa");
      data.append("redirect_uri", "http://localhost:8080/login");

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://www.openhumans.org/oauth2/token/");
      xhr.setRequestHeader("Authorization", "Basic OGZEZzZGZUpTVktacHNJOWFBVDBOUnEwZXNpUUFXajZSQUVzRm1VSjpmY3hyNndBVmEzaTZmeXZtb0VQYktqTlA2RkJWVFhwYXhzWUhUVnFoSFVSYW5ETlg1VEpqNzVSYzFVbFAxWERDMmQxbFZKdjJlQllqQzBDa0J6b3pZdFRPeHRLTjE2UUoyeG5rRlVzOTBhZWtvSEJ3RXZDTlRYUGwxbTVsY0lPYw==");
      xhr.setRequestHeader("Cookie", "csrftoken=RFRRWOEBCMxTcH6kGDUMfwXKxR31Fcu6x84vHLTpJFKQgauq1vvzLumKtDPDBD26");

      xhr.send(data);
      */
      /* eslint-disable @typescript-eslint/camelcase */
      /*
      const data = new FormData();
      data.append("grant_type", "authorization_code");
      data.append("code", code);
      data.append("redirect_uri", "http://localhost:8080/login");

      console.log(data);
      const basicAuth =
        "Basic " + btoa(this.clientId + ":" + this.clientSecret);
      console.log(basicAuth);
      axios
        .post("https://www.openhumans.org/oauth2/token/", data, {
          headers: {
            Authorization:
              "Basic OGZEZzZGZUpTVktacHNJOWFBVDBOUnEwZXNpUUFXajZSQUVzRm1VSjpmY3hyNndBVmEzaTZmeXZtb0VQYktqTlA2RkJWVFhwYXhzWUhUVnFoSFVSYW5ETlg1VEpqNzVSYzFVbFAxWERDMmQxbFZKdjJlQllqQzBDa0J6b3pZdFRPeHRLTjE2UUoyeG5rRlVzOTBhZWtvSEJ3RXZDTlRYUGwxbTVsY0lPYw=="
          }
        })
        .then(response => {
          console.log(response);
          const authData = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token
          };
          console.log(authData);
          this.$store.commit("LOGIN_SUCCESS", authData);
          this.setLayout("app-layout");
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          console.log(error);
        });
      */
      /*
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic OGZEZzZGZUpTVktacHNJOWFBVDBOUnEwZXNpUUFXajZSQUVzRm1VSjpmY3hyNndBVmEzaTZmeXZtb0VQYktqTlA2RkJWVFhwYXhzWUhUVnFoSFVSYW5ETlg1VEpqNzVSYzFVbFAxWERDMmQxbFZKdjJlQllqQzBDa0J6b3pZdFRPeHRLTjE2UUoyeG5rRlVzOTBhZWtvSEJ3RXZDTlRYUGwxbTVsY0lPYw==");
      myHeaders.append("Cookie", "csrftoken=RFRRWOEBCMxTcH6kGDUMfwXKxR31Fcu6x84vHLTpJFKQgauq1vvzLumKtDPDBD26");

      const formdata = new FormData();
      formdata.append("grant_type", "authorization_code");
      formdata.append("code", this.code);
      formdata.append("redirect_uri", "https://www.fatigue-autisme.org/login");

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://www.openhumans.org/oauth2/token/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        */
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
  margin: 50px auto;
  font-size: 40px;
}
.center {
  text-align: center;
}
</style>
