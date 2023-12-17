import axios from 'axios';
import { API_URL } from '../config';
import authHeader from '../utils/authHeader';
import { IChannel, IChannelsParams, IProgram, IProgramsParams } from './models';

export class ProgramsApiService {
    async getPrograms(params: IProgramsParams): Promise<IProgram[]> {
        const response = await axios.get<IProgram[]>(`${API_URL}/programs`, {
            headers: authHeader(),
            params,
        });

        return response.data;
    }

    async getProgram(id: number) {
        const response = await axios.get<IProgram>(`${API_URL}/programs/${id}`, {
            headers: authHeader(),
        });

        return response.data;
    }

    async getChannels(params: IChannelsParams): Promise<IChannel[]> {
        const response = await axios.get<IChannel[]>(`${API_URL}/channel`, {
            headers: authHeader(),
            params,
        });

        return response.data;
    }

    async getChannel(id: number) {
        const response = await axios.get<IChannel>(`${API_URL}/channels/${id}`, {
            headers: authHeader(),
        });

        return response.data;
    }
}

export const ProgramsApiServiceInstanse = new ProgramsApiService();
