import axios from 'axios';
import { API_URL } from '../config';
import authHeader from '../utils/authHeader';

export class CommonApiService {
    async getGenres(): Promise<string[]> {
        const response = await axios.get<string[]>(`${API_URL}/genres`, {
            headers: authHeader(),
        });

        return response.data;
    }

    async getCategories(): Promise<string[]> {
        const response = await axios.get<string[]>(`${API_URL}/categories`, {
            headers: authHeader(),
        });

        return response.data;
    }
}

export const CommonApiServiceInstanse = new CommonApiService();
