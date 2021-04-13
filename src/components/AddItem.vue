<template>
  <v-row>
    <v-col>
      <v-text-field
        :loading="loading"
        name="name"
        label="add item"
        v-model="params.itemName"
      ></v-text-field>
      <v-btn x-small color="success" @click="addChecklistItem">add</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  props: {
    checklistId: {
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      params: {
        checklistId: "",
        itemName: ""
      }
    };
  },
  created() {
    this.params.checklistId = this.checklistId;
  },
  methods: {
    addChecklistItem() {
      this.loading = true;
      this.$http
        .post(config.baseUri.api + "item", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          this.params.itemName = "";
          this.$emit("refresh");
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
          this.params.itemName = "";
        });
    }
  }
};
</script>

<style></style>
