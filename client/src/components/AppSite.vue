<template>
  <v-app-bar app>

    <img src="../assets/wamewo-logo-dark-mode.png" style="max-height: 40px;" />

    <v-spacer></v-spacer>
    <v-toolbar-title class="text-center">Wamewo Manager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" color="primary" outlined>Logout</v-btn>
  </v-app-bar>

  <v-navigation-drawer app style="background-color: #303030 !important;">
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="Container list" value="menu1" @click="menuSelect(0)"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="Manage" value="menu2" @click="menuSelect(1)"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-if v-if="menu === 0">
    <ContainerListViewAsync />
  </v-if>
</template>

<script setup lang="ts">
//

import wamewoLogo from '@/assets/wamewo-logo-dark-mode.png';
import { defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { ref } from 'vue';

const ContainerListViewAsync = defineAsyncComponent(() => import('@/components/ContainerListView.vue'));
const authStore = useAuthStore();
const menu = ref(0);

function menuSelect(index: number) {
  menu.value = index;
}

function logout() {
  authStore.logout();
}


</script>
