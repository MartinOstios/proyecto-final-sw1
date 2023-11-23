import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Auth {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    authUrl = `${this.BASE_API}/${API_ROUTES.AUTH}`

    // http://localhost:3100/api/v1/auth/register
    register = async (data) => {
        const url = `${authUrl}/signin`;
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
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

    // http://localhost:3100/api/v1/auth/login
    login = async (data) => {
        const url = `${authUrl}/login`;
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            };

            const result = await response.json();

            if (result && result.access) {
                this.setAccessToken(result.access);
            };

            return result;
        } catch (error) {
            return null;
        }
    };

    logout = () => {
        localStorage.removeItem("access");
    }

    setAccessToken = (access) => {
        localStorage.setItem("access", access)
    };

    getAccessToken = () => {
        return localStorage.getItem("access");
    };
}