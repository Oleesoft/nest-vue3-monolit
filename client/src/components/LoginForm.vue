<template>
  <v-container class="fill-height">
    <v-responsive class="align-top text-center fill-height">
      <v-sheet width="340px" class="mx-auto mb-6 mysheet">
        <v-img class="align-center mb-6" width="340px" src="../assets/wamewo-logo-dark-mode.png"></v-img>
        <h2 class="mb-6">Wamewo manager</h2>
        <v-form Form fast-fail @submit.prevent="onSubmit" class="myform" :validation-schema="schema">
          <v-text-field Field name="username" v-model="username" label="Username" required outlined class="mb-6"></v-text-field>

          <v-text-field Field name="password" v-model="password" label="Password" required outlined type="password"
            class="mb-6"></v-text-field>

          <div class="text-danger my-2">{{ authStore.error }}</div>
          <v-btn color="primary" outlined class="mb-6" type="submit" :active="isSubmitting">Login</v-btn>
        </v-form>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>


<script lang="ts" setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/store/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

// values: any, { setErrors }: { setErrors: any }

const isSubmitting = ref(false);

const username = ref('');
const password = ref('');

function onSubmit() {
  isSubmitting.value = true;
  authStore.login(username.value, password.value).then(() => {
    isSubmitting.value = false;
  }).catch(() => {
    isSubmitting.value = true;
  });
  //return authStore.login(form.username, form.password);
}
</script>

<style>
.myform {
  margin: 25px !important;
}

.mysheet {
  background-color: var(--background-color) !important;
}
</style>
