import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Users {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    userUrl = `${this.BASE_API}/${API_ROUTES.USERS}`

    // http://localhost:3100/api/v1/users/new
    createUser = async (data) => {
        const url = `${userUrl}/new`;
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
            }
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return null;
        }
    }

    // http://localhost:3100/api/v1/users/mail
    updateUser = async (data) => {
        const url = `${userUrl}/${data.mail}`;
        const params = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
            }
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return null;
        }
    }

    // http://localhost:3100/api/v1/users/mail
    deleteUser = async (mail) => {
        const url = `${userUrl}/${mail}`;
        const params = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
            }
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return null;
        }
    }

    // http://localhost:3100/api/v1/users/mail
    showUser = async (mail) => {
        const url = `${userUrl}/${mail}`;
        const params = {
            method: "GET",
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
            }
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return null;
        }
    }
}