import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://tyul2rorl0.execute-api.us-east-1.amazonaws.com'
})