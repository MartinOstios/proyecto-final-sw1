import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Product {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    productUrl = `${BASE_API}/${API_ROUTES.SERVICES}`

    // http://localhost:3100/api/v1/services/new
    createProduct = async (data) => {
        const url = `${this.productUrl}/new`;
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNTU4NDYyLCJleHAiOjE3MDE2NDQ4NjJ9.OvMVPBhGga5xKoCwjy8vL8tQWvJt65TL9yO7YZLmt9M`,
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

    // http://localhost:3100/api/v1/services/id
    updateProduct = async (id, data) => {
        const url = `${this.productUrl}/${id}`;
        const params = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNTU4NDYyLCJleHAiOjE3MDE2NDQ4NjJ9.OvMVPBhGga5xKoCwjy8vL8tQWvJt65TL9yO7YZLmt9M`,
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

    // http://localhost:3100/api/v1/services/id
    deleteProduct = async (id) => {
        const url = `${this.productUrl}/${id}`;
        const params = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NjhiZGNhYTdjOTgzODQ2MjE1ZDZlNyIsIm5hbWUiOiJNYXJ0aW4iLCJsYXN0bmFtZSI6Ik9zdGlvcyIsImVtYWlsIjoibWFydGluLm9zdGlvc2FAYXV0b25vbWEuZWR1LmNvIiwiYWRkcmVzcyI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzAxNTU4NDYyLCJleHAiOjE3MDE2NDQ4NjJ9.OvMVPBhGga5xKoCwjy8vL8tQWvJt65TL9yO7YZLmt9M`,
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

    // http://localhost:3100/api/v1/services
    showProduct = async () => {
        const url = `${this.productUrl}`;
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