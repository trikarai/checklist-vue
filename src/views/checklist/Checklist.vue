<template>
  <v-container fluid fill-height id="loginpage">
    <v-row align="center" justify="center">
      <v-progress-linear
        v-if="loading"
        color="primary"
        indeterminate
      ></v-progress-linear>
      <v-col cols="12" xs="12" sm="8" md="6" lg="4" class="text-xs-center">
        <v-row>
          <v-col>
            <v-text-field
              outlined
              v-model="params.name"
              name="name"
              label="Add Check List"
              id="id"
            ></v-text-field>
            <v-btn color="success" @click="addChecklist">add</v-btn>
          </v-col>
          <v-col v-for="check in checklists" cols="12" lg="12" :key="check.id">
            <v-card>
              <v-card-title primary-title>
                {{ check.name }}
              </v-card-title>
              <v-card-text>
                <ItemField :checklistId="check.id" @refresh="refresh" />
              </v-card-text>
              <v-card-text>
                <v-list subheader>
                  <v-subheader>Check Items</v-subheader>

                  <v-list-item v-for="item in check.items" :key="item.id">
                    <v-list-item-action>
                      <!-- <v-btn
                        x-small
                        color="success"
                        :to="{
                          name: 'checklist-item',
                          params: {
                            checklistId: check.id,
                            itemId: item.id
                          }
                        }"
                        >view</v-btn
                      > -->
                      <v-btn
                        class="ma-1"
                        color="error"
                        x-small
                        @click="deleteCheklistItem(item.id)"
                      >
                        <v-icon x-small>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn
                        class="ma-1"
                        color="success"
                        x-small
                        @click="openEdit(item, check.id)"
                      >
                        <v-icon x-small>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn small depressed @click="updateItemStatus(item.id)">
                        <v-icon color="green" v-if="item.itemCompletionStatus">
                          mdi-check
                        </v-icon>
                        <v-icon color="error" v-else>
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card-text>
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

    <dialog-edit
      v-if="dialogEdit"
      :dialog.sync="dialogEdit"
      :item="dialogItem"
      :checklistId="checklistId"
      @refresh="refresh"
    />
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

import ItemField from "@/components/AddItem";
import DialogEdit from "@/components/DialogEdit";

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
      },
      dialogEdit: false,
      dialogItem: "",
      checklistId: 0
    };
  },
  components: {
    ItemField,
    DialogEdit
  },
  mounted() {
    this.getChecklist();
  },
  methods: {
    openEdit(item, checklistId) {
      this.dialogItem = item;
      this.dialogEdit = true;
      this.checklistId = checklistId;
    },
    refresh() {
      this.dialogEdit = false;
      this.getChecklist();
    },
    getChecklist() {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .get(config.baseUri.api + "checklist", {
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
    },
    updateItemStatus(id) {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .put(
          config.baseUri.api + "item/" + id,
          {},
          {
            headers: auth.getAuthHeader()
          }
        )
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
    },
    deleteCheklistItem(id) {
      this.isError = false;
      this.httpError = false;
      this.loading = true;
      this.$http
        .delete(config.baseUri.api + "item/" + id, {
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
