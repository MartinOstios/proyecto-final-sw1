import { DB_USER, DB_PASSWORD, DB_HOST } from './config.js';
import 'dotenv/config';
const PORT = process.env.PORT || 3000;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority`;


export {
    PORT,
	DB_URI
}