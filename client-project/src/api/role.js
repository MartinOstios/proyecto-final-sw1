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
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNTUwMzU0LCJleHAiOjE3MDE2MzY3NTR9.al36iDamyZPANXftqX_nXH9hOP5vvpGq0ziamqVjNuQ`,
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
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNTQ1NjEyLCJleHAiOjE3MDE2MzIwMTJ9.L-KxQw_zohtWAAYFx7X2kZcgP0T8eG_-PGFmQC-u-xY`,
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
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNDg5Njk3LCJleHAiOjE3MDE1NzYwOTd9.g8ASf6lRPmSPdXzionIcCWeCZIEbJs40LdHtHSuK4Gg`,
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