const SERVER_IP = 'http://localhost:3100';
const API_VERSION = 'api/v1';


export const ENV = {
    BASE_PATH : SERVER_IP,
    BASE_API : `${SERVER_IP}/${API_VERSION}`,
    API_ROUTES : {
        USERS: "users",
        AUTH: "auth",
        SERVICES: "services",
        ROLES: "roles"
    },
    JWT : {
        ACCESS: "access"
    }
};