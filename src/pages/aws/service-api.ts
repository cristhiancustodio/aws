import axios from "axios";
import { config } from "./lambda/config";

export const api_client = axios.create({
    baseURL: config.api,
    
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
})
