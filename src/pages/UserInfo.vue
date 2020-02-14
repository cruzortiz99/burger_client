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
            <q-input
              :value="this['user/userName']"
              autofocus
              @change="saveUserIntoDb"
            />
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

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue'

export default Vue.extend({
  name: 'UserInfo',
  computed: {
    ...mapGetters(['user/userName', 'user/email'])
  },
  created() {},
  methods: {
    async saveUserIntoDb(event) {
      const success = this['user/updateUserName'](event.target.value);
      return success;
    },
    ...mapActions(['user/updateUserName'])
  }
});
</script>

<style />
