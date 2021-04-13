<template>
  <v-container fluid fill-height id="loginpage">
    <v-row align="center" justify="center">
      <v-progress-linear
        v-if="loading"
        color="primary"
        indeterminate
      ></v-progress-linear>
      <v-col cols="12" xs="12" sm="8" md="6" lg="4" class="text-xs-center">
        <!-- <pre>{{ checklists }}</pre> -->
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              outlined
              v-model="params.name"
              name="name"
              label="label"
              id="id"
            ></v-text-field>
            <v-btn color="success" @click="addChecklist">add</v-btn>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" lg="12">
            <v-card>
              <v-card-title primary-title> {{ checklists.name }} </v-card-title>

              <v-card-actions>
                <v-btn color="error" small @click="deleteCheklist(check.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      errorRes: {},
      isError: false,
      httpError: false,
      loading: false,
      checklists: [],
      params: {
        name: ""
      }
    };
  },
  mounted() {
    this.getChecklist();
  },
  methods: {
    getChecklist() {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .get(config.baseUri.api + "item/" + this.$route.params.itemId, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.checklists = res.data.data;
        })
        .catch(error => {
          this.errorRes = error;
          this.httpError = true;
          this.isError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addChecklist() {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .post(config.baseUri.api + "checklist", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.getChecklist();
        })
        .catch(error => {
          this.errorRes = error;
          this.httpError = true;
          this.isError = true;
        })
        .finally(() => {
          this.loading = false;
          this.params.name = "";
        });
    },
    deleteCheklist(id) {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .delete(config.baseUri.api + "checklist/" + id, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          this.getChecklist();
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
