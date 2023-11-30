import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Users {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    userUrl = `${BASE_API}/${API_ROUTES.USERS}`

    // http://localhost:3100/api/v1/users/new
    createUser = async (data) => {
        const url = `${this.userUrl}/new`;
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

    // http://localhost:3100/api/v1/users/mail
    updateUser = async (email, data) => {
        const url = `${this.userUrl}/${email}`;
        const params = {
            method: "PATCH",
            body: data,
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZDhkYTdjOTgzODQ2MjE1ZDZiYiIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxMzYzMDkyLCJleHAiOjE3MDE0NDk0OTJ9.x7ig1T-BbFHYTUIIznlu5FGuaI4MM2IxHdlGonyXl-Y`,
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
        const url = `${this.userUrl}/${mail}`;
        const params = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZDhkYTdjOTgzODQ2MjE1ZDZiYiIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxMzYzMDkyLCJleHAiOjE3MDE0NDk0OTJ9.x7ig1T-BbFHYTUIIznlu5FGuaI4MM2IxHdlGonyXl-Y`,
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

    // http://localhost:3100/api/v1/users
    showUsers = async () => {
        const url = `${this.userUrl}`;
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