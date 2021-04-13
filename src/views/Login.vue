<template>
  <v-container fluid fill-height id="loginpage">
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="8" md="6" lg="4" class="text-xs-center mt-0">
        <v-alert type="error" :value="isError" dismissible>
          {{ errorRes }}
        </v-alert>
        <v-toolbar class="pt-0" color="primary">
          <v-toolbar-title class="white--text ml-2">
            <h4>Login</h4>
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
                  name="username"
                  label="username"
                  v-model="params.username"
                  :rules="rulesRequired"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  autocomplete="current-password"
                  label="Password"
                  outlined
                  v-model="params.password"
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
                <v-btn
                  class="mt-5"
                  color="primary"
                  block
                  @click="submit"
                  :loading="loading"
                  large
                  >Login</v-btn
                >
              </v-row>
              <v-row class="mt-3">
                <v-col md="6">
                  <v-btn
                    class="grey--text"
                    text
                    x-small
                    :to="{ name: 'register' }"
                    >register</v-btn
                  >
                </v-col>
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
      e1: true,
      errorRes: {},
      isError: false,
      httpError: false,
      loading: false,
      valid: false,
      params: {
        username: "",
        password: ""
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
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .post(config.baseUri.api + "login", this.params)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.$router.replace({ name: "checklist" });
        })
        .catch(error => {
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
