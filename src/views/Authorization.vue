<template>
  <div class="col-12">
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
                <h1 class="titre">Étude sur la fatigabilité cognitive dans l’autisme</h1>
              </v-row>
              <v-card-text>
                <v-form v-on:submit.prevent="authorize">
                  <v-text-field
                    label="Code Authorization"
                    name="authorizationCode"
                    prepend-icon="mdi-lock"
                    type="text"
                    v-model="authorizationCode"
                    required
                    :error-messages="authorizationCodeErrors"
                    @input="$v.authorizationCode.$touch()"
                    @blur="$v.authorizationCode.$touch()"
                  />
                </v-form>
                <br />
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click.prevent="authorize" color="primary"
                  >Accéder au site</v-btn
                  >
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  components: { },
  data() {
    return {
      error: "",
      authorizationCode: ""
    };
  },
  mixins: [validationMixin],
  validations: {
    authorizationCode: {
      required
    }
  },
  methods: {
    authorize() {
      this.$store.dispatch('authorize', this.authorizationCode).then(
        () => {
          this.$router.push('/login');
        },
        () => {
          this.error = "Code incorrect";
        }
      );
      // }
      // this.error = "";
      // if(this.authorizationCode === "3189") {
      //   this.$store.commit("AUTHORIZE", this.authorizationCode);
      //   this.$router.push("/login");
      // } else {
      //   this.error = "Code incorrect";
      // }
    },
    setLayout(layout) {
      this.$store.commit("SET_LAYOUT", layout);
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
    authorizationCodeErrors() {
      const errors = [];
      if (!this.$v.authorizationCode.$dirty) return errors;
      !this.$v.authorizationCode.required && errors.push("Code Authorization requis");
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
