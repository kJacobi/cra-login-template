import { observable, computed, action, reaction } from 'mobx';
import { createContext } from 'react'
import Http from "../services/http-service";
import { GetCookie, SetTokenCookie, RemoveCookies } from '../services/cookie-service'
import jwtDecode from "jwt-decode";


export interface IUserLogin {
    username: string,
    password: string
}

interface IUser {
    token: string,
    refreshToken: string,
    expires: 0
    userDetails: IUserDetails
}

interface IUserDetails {
    sub: string,
    role: string
}

interface IUserRefresh {
    token?: string,
    refreshToken?: string
}

const TOKEN_COOKIE_NAME = process.env.REACT_APP_TOKEN_COOKIE_NAME ? process.env.REACT_APP_TOKEN_COOKIE_NAME : '';

class AuthStore {

    constructor() {

        reaction(
            () => this.user,
            user => {
                if (user) {
                    if (!!this.user) {
                        this.user.userDetails = jwtDecode(this.user.token);
                    }
                    SetTokenCookie(user);
                } else {
                    RemoveCookies(TOKEN_COOKIE_NAME);
                }
            }
        )
    }

    @observable user: IUser | null = GetCookie(TOKEN_COOKIE_NAME);

    @action private loggingIn = async (values: IUserLogin) => {
        try {
            const res: any = await Http.post('/api/v1/login', values)
            if (res.error) {
                return res.error;
            } else if (!res.data || !res.data.token) {
                return "Something went wrong!";
            }

            const { data: user } = res;
            this.user = user;

        } catch (error) {
            console.log(error)
        }

    }

    @action private isAuthenticated = async () => {
        if (!!this.user && this.user?.expires !== undefined) {
            const expired = this.isExpired();
            if (expired === true) {
                return await this.refreshLogin();
            }
            else {
                return true;
            }
        }

        return false;
    }

    @action private refreshLogin = async () => {

        const userRefresh: IUserRefresh = {
            token: this.user?.token,
            refreshToken: this.user?.refreshToken
        }

        try {
            const res: any = await Http.post('/api/v1/refresh', userRefresh)
            if (res.error) {
                console.log(res.error);
                return false;
            } else if (!res.data || !res.data.token) {
                console.log(res.error);
                return false;
            }

            const { data: user } = res;
            this.user = user;
            return true;

        } catch (error) {
            console.log(error)
            return false;
        }
    }

    @action private isExpired(): boolean {
        if (!!this.user) {
            return new Date() > new Date(this.user?.expires);
        } else {
            return true
        }
    }

    @computed private get userName() {
        return this.user?.userDetails.sub;
    }

    @computed private get role() {
        return this.user?.userDetails.role;
    }

    async isLoggedIn() {
        const result = await this.isAuthenticated();
        return result;
    }

    async login(values: IUserLogin) {
        return await this.loggingIn(values);
    }

    logoutUser() {
        RemoveCookies(TOKEN_COOKIE_NAME);
        this.user = null;
    }

    getUsername() {
        return this.user?.userDetails.sub;
    }

}

export default createContext(new AuthStore());