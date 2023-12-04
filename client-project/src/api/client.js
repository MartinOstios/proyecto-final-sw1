import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Client {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    clientUrl = `${BASE_API}/${API_ROUTES.CLIENTS}`

    // http://localhost:3100/api/v1/clients/new
    createClient = async (data) => {
        const url = `${this.clientUrl}/new`;
        const params = {
            method: "POST",
            body: data,
            headers: {
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
            return error;
        }
    }

    // http://localhost:3100/api/v1/clients/id
    updateClient = async (id, data) => {
        const url = `${this.clientUrl}/${id}`;
        const params = {
            method: "PATCH",
            body: data,
            headers: {
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

    // http://localhost:3100/api/v1/clients/id
    deleteClient = async (id) => {
        const url = `${this.clientUrl}/${id}`;
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

    // http://localhost:3100/api/v1/clients
    showClients = async () => {
        const url = `${this.clientUrl}`;
        const params = {
            method: "GET",
            headers: {
                'content-Type': 'application/json'
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

    getAccessToken = () => {
        return localStorage.getItem("access");
    };
}