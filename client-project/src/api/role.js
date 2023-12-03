import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Role {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    roleUrl = `${BASE_API}/${API_ROUTES.ROLES}`

    // http://localhost:3100/api/v1/roles/new
    createRole = async (data) => {
        const url = `${this.roleUrl}/new`;
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
            return error;
        }
    }

    // http://localhost:3100/api/v1/roles/id
    updateRole = async (id, data) => {
        const url = `${this.roleUrl}/${id}`;
        const params = {
            method: "PATCH",
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

    // http://localhost:3100/api/v1/roles/id
    deleteRole = async (id) => {
        const url = `${this.roleUrl}/${id}`;
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

    // http://localhost:3100/api/v1/roles
    showRoles = async () => {
        const url = `${this.roleUrl}`;
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