<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>
        Edit Item
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="params.itemName"
          name="name"
          label="label"
          id="id"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :loading="loading"
          color="primary"
          small
          class="ma-1"
          @click="renameItem"
          >rename</v-btn
        >
        <v-btn
          :loading="loading"
          @click="$emit('update:dialog', false)"
          color="cancel"
          small
          class="ma-1"
          >cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object
    },
    checklistId: {
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      params: {
        checklistId: 0,
        itemName: ""
      }
    };
  },
  mounted() {
    this.params.itemName = this.item.name;
    this.params.checklistId = this.checklistId;
  },
  methods: {
    renameItem() {
      this.loading = true;
      this.$http
        .put(config.baseUri.api + "item/rename/" + this.item.id, this.params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          this.$emit("refresh");
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
