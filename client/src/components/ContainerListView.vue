<template>
    <v-container class="fill-height">
        <v-responsive class="align-top text-center fill-height">
            <v-sheet width="100%" class="mx-auto mb-6 mysheet flex">

                <h1 class="display-1 font-weight-bold mb-4">
                    Container List
                </h1>

                <v-divider class="mx-auto mb-6"></v-divider>
                <p class="mb-6">
                    This is a list of all containers running on the server.
                </p>


                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Image
                                </th>
                                <th class="text-left">
                                    Tag
                                </th>
                                <th class="text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in containerList" :key="item.name">
                                <td class="text-left rowColor">{{ item.name }}</td>
                                <td class="text-left rowColor">{{ item.image }}</td>
                                <td class="text-left rowColor">{{ item.tag }}</td>
                                <td class="text-left rowColor">
                                    <v-if v-if="item.state === 'running'">
                                        <v-icon color="success">mdi-check</v-icon>
                                    </v-if>
                                    <v-if v-else>
                                        <v-icon color="error">mdi-close</v-icon>
                                    </v-if>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>

            </v-sheet>
        </v-responsive>
    </v-container>
</template>

<script lang="ts" setup>

import { getContainerList } from '@/utils/apihandler';
import { ContainerInfo } from '@/utils/data.types';
import { ref } from 'vue';

const containerList = ref<ContainerInfo[]>([]);

getContainerList().then((response) => {
    containerList.value = response.payload;

    console.log('containerList', containerList.value);
});

</script>

<style scoped>

.rowColor {
    background-color: #303030;
}

</style>
