import axios from 'axios';
import { API_URL } from '../config';
import authHeader from '../utils/authHeader';
import { ISubscription, IUser } from './models';

export class UserApiService {
    async getUser(): Promise<IUser> {
        const response = await axios.get<IUser>(`${API_URL}/user`, {
            headers: authHeader(),
        });

        return response.data;
    }

    async postChannelRating(id: number, rating: number) {
        await axios.post(
            `${API_URL}/channel/${id}/rating`,
            {},
            {
                headers: authHeader(),
                params: {
                    mark: rating,
                },
            }
        );
    }

    async postProgramRating(id: number, rating: number) {
        await axios.post(
            `${API_URL}/program/${id}/rating`,
            {},
            {
                headers: authHeader(),
                params: {
                    mark: rating,
                },
            }
        );
    }

    async postChannelLike(id: number) {
        await axios.post(
            `${API_URL}/channel/${id}/like`,
            {},
            {
                headers: authHeader(),
            }
        );
    }

    async postProgramLike(id: number) {
        await axios.post(
            `${API_URL}/program/${id}/like`,
            {},
            {
                headers: authHeader(),
            }
        );
    }

    async getSubscriptions(): Promise<ISubscription> {
        const response = await axios.get<ISubscription>(`${API_URL}/user/subscriptions`, {
            headers: authHeader(),
        });

        return response.data;
    }
}

export const UserApiServiceInstanse = new UserApiService();
