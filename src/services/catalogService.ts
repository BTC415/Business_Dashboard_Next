import axios from "axios";

import { config } from "../config";

export class catalogService {
    static url = `${config.apiUrl}/catalog`;
    static async find(data) {
        try {
            const response = await axios.get(this.url, data);
            return { data: response.data.data, isOK: response.status < 400 };
        } catch (error) {
            return error;
        }
    }
    static async findByPhone(phone: string) {
        try {
            const response = await axios.get(this.url + "/phone/" + phone);
            return { data: response.data.data, isOK: response.status < 400 };
        } catch (error) {
            return error;
        }
    }
    static async findById(id: string) {
        try {
            const response = await axios.get(this.url + "/id/" + id);
            return { data: response.data.data, isOK: response.status < 400 };
        } catch (error) {
            return error;
        }
    }
    static async add(data) {
        try {
            const response = await axios.post(this.url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return {
                data: response.data.data,
                isOK: response.status < 400,
            };
        } catch (error) {
            return error;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(this.url, data);
            return {
                data: response.data.data,
                isOK: response.status < 400,
            };
        } catch (error) {
            return error;
        }
    }

}
