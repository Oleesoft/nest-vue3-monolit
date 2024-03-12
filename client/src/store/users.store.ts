import { defineStore } from 'pinia';
import * as BackendApi from '@/utils/apihandler';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            await BackendApi.getUsers()
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        }
    }
});