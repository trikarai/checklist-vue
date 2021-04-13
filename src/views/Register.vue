<template>
  <v-container fluid fill-height id="loginpage">
    <v-row align="center" justify="center">
      <v-col
        v-if="regSucccess"
        cols="12"
        xs="12"
        sm="8"
        md="6"
        lg="4"
        class="text-xs-center mt-0"
      >
        <v-card class="elevation-0">
          <v-card-text class="pa-3 pt-0">
            {{ response.message }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="{ name: 'login' }">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-else
        cols="12"
        xs="12"
        sm="8"
        md="6"
        lg="4"
        class="text-xs-center mt-0"
      >
        <v-alert type="error" :value="isError" dismissible>
          {{ errorRes }}
        </v-alert>
        <v-toolbar class="pt-0" color="primary">
          <v-toolbar-title class="white--text ml-2">
            <h4>Register</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card
          style="padding:20px 30px 0px 30px;"
          class="text-center elevation-0"
        >
        </v-card>
        <v-card-text class="pa-3 pt-0">
          <div>
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-text-field
                  outlined
                  name="email"
                  label="email"
                  v-model="signup.email"
                  :rules="rulesEmail"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  outlined
                  name="username"
                  label="username"
                  v-model="signup.username"
                  :rules="rulesRequired"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  autocomplete="new-password"
                  label="Password"
                  outlined
                  v-model="signup.password"
                  min="8"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="e1 ? 'password' : 'text'"
                  :rules="rulesPassword"
                  counter
                  required
                  @click:append="e1 = !e1"
                  v-on:keyup.enter="submit"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  autocomplete="confirm-password"
                  label="Confirm Password"
                  outlined
                  v-model="cpassword"
                  min="8"
                  :append-icon="e2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="e2 ? 'password' : 'text'"
                  :rules="rulesPasswordConfirmation"
                  counter
                  required
                  @click:append="e2 = !e2"
                  v-on:keyup.enter="submit"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-btn
                  class="mt-5"
                  color="primary"
                  block
                  @click="submit"
                  :loading="loading"
                  large
                  >Register</v-btn
                >
              </v-row>
            </v-form>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      errorRes: {},
      regSucccess: false,
      e1: true,
      e2: true,
      httpError: false,
      isError: false,
      loading: false,
      valid: false,
      signup: {
        email: "",
        username: "",
        password: ""
      },
      cpassword: "",
      response: {
        message: "lorem ipsum"
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login() {
      this.httpError = false;
      this.isError = false;
      this.loading = true;
      this.$http
        .post(config.baseUri.api + "register", this.signup)
        .then(res => {
          this.response = res.data;
          this.regSucccess = true;
        })
        .catch(error => {
          console.log(error);
          this.errorRes = error;
          this.httpError = true;
          this.isError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
