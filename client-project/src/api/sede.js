import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Sede {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    sedeUrl = `${BASE_API}/${API_ROUTES.SEDES}`

    // http://localhost:3100/api/v1/sedes/new
    createSede = async (data) => {
        const url = `${this.sedeUrl}/new`;
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NmJmMmU2MDFlOTcyNjhlYWMyMDVjZCIsIm5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImFkZHJlc3MiOm51bGwsInJvbGUiOiI2NTYyODUxN2FmYjMxNzQ3OGU2NTQ3MmYiLCJpYXQiOjE3MDE2MjE0ODcsImV4cCI6MTcwMTcwNzg4N30.46ZWFXS1jRDtJWyQuLaznGRQx6V9m2rNwQj6NAJMYZQ`,
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

    // http://localhost:3100/api/v1/sedes/id
    updateSede = async (id, data) => {
        const url = `${this.sedeUrl}/${id}`;
        const params = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NmJmMmU2MDFlOTcyNjhlYWMyMDVjZCIsIm5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImFkZHJlc3MiOm51bGwsInJvbGUiOiI2NTYyODUxN2FmYjMxNzQ3OGU2NTQ3MmYiLCJpYXQiOjE3MDE2MjE0ODcsImV4cCI6MTcwMTcwNzg4N30.46ZWFXS1jRDtJWyQuLaznGRQx6V9m2rNwQj6NAJMYZQ`,
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

    // http://localhost:3100/api/v1/sedes/id
    deleteSede = async (id) => {
        const url = `${this.sedeUrl}/${id}`;
        const params = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NmJmMmU2MDFlOTcyNjhlYWMyMDVjZCIsIm5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImFkZHJlc3MiOm51bGwsInJvbGUiOiI2NTYyODUxN2FmYjMxNzQ3OGU2NTQ3MmYiLCJpYXQiOjE3MDE2MjE0ODcsImV4cCI6MTcwMTcwNzg4N30.46ZWFXS1jRDtJWyQuLaznGRQx6V9m2rNwQj6NAJMYZQ`,
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

    // http://localhost:3100/api/v1/sedes
    showSedes = async () => {
        const url = `${this.sedeUrl}`;
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