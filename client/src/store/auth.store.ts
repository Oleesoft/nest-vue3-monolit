import { defineStore } from 'pinia';

import router from '@/router';
import * as BackendApi from '@/utils/apihandler';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        token: JSON.parse(localStorage.getItem('token') as string),
        returnUrl: '',
        error: ''
    }),
    actions: {
        async login(username: string, password: string) {
            const token = await BackendApi.login(username, password);

            if (!token) {
                this.error = 'Username or password is incorrect';
                return;
            }

            // update pinia state
            this.token = token;
            this.error = '';

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(token));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.token = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});