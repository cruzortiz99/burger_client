<template>
  <q-page>
    <q-banner class="col-3 bg-secondary text-white">
      <q-toolbar>
        <q-icon name="account_box" />
        <q-toolbar-title>User Info</q-toolbar-title>
      </q-toolbar>
    </q-banner>
    <div class="column justify-center">
      <div class="q-pa-md">
        <q-input :value="this['user/userName']" label="Name" readonly>
          <template v-slot:before>
            <q-icon name="text_fields" />
          </template>
          <q-popup-edit :value="this['user/userName']">
            <q-input :value="this['user/userName']" autofocus @change="saveUserIntoDb" />
          </q-popup-edit>
        </q-input>
        <q-input :value="this['user/email']" label="E-mail" readonly>
          <template v-slot:before>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        userName: "Cruz Ortiz",
        email: "cruzortiz099@gmail.com"
      }
    };
  },
  computed: {
    ...mapGetters(["user/userName", "user/email"])
  },
  created() {},
  methods: {
    saveUserIntoDb(event) {
      this["user/updateUserName"](event.target.value);
    },
    loadEventsFromDb() {
      throw Error("most communicae with backend");
    },
    ...mapActions(["user/updateUserName"])
  }
};
</script>

<style />
