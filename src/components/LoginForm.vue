<template>
  <div>
    <q-form v-on="listeners" class="q-gutter-md">
      <div>
        <q-input
          v-model="userName"
          outlined
          placeholder="Insert User"
          lazy-rules
          :rules="computedRules.userName"
        />
        <q-input
          v-model="password"
          :type="passwordVisibility.type"
          outlined
          placeholder="Insert Password"
          :rules="computedRules.password"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordVisibility.icon"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            ></q-icon>
          </template>
        </q-input>
      </div>
      <div class="row justify-center">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="warning" flat />
      </div>
    </q-form>
    <div class="column">
      <q-btn
        class="self-center"
        to="/sign-in"
        label="Sign In"
        color="info"
        flat
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginForm',
  props: {
    customRules: {
      type: Object,
      required: false,
      default() {
        return {
          userName: [],
          password: []
        };
      },
      validator(value) {
        const keys = Object.keys(value);
        if (keys.length > 0) {
          const containsUserName = keys.includes('userName');
          const containsPassword = keys.includes('password');
          return (
            (containsUserName && Array.isArray(value.userName)) ||
            (containsPassword && Array.isArray(value.password))
          );
        }
        return true;
      }
    }
  },
  data() {
    return {
      userName: undefined,
      password: undefined,
      isPassword: true
    };
  },
  computed: {
    passwordVisibility() {
      return this.isPassword
        ? { type: 'password', icon: 'visibility_off' }
        : { type: 'text', icon: 'visibility' };
    },
    listeners() {
      return {
        ...this.$listeners,
        reset: this.resetForm,
        submit: this.submitForm
      };
    },
    computedRules() {
      return {
        userName: [
          ...this.customRules.userName,
          val => (val && val.length > 0) || 'Please write a valid user'
        ],
        password: [
          ...this.customRules.password,
          val => (val && val.length > 0) || 'Please write a valid password'
        ]
      };
    }
  },
  methods: {
    resetForm() {
      this.userName = null;
      this.password = null;
    },
    submitForm() {
      this.$emit('submit', {
        userName: this.userName,
        password: this.password
      });
    }
  }
});
</script>

<style></style>
