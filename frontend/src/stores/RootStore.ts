import { makeAutoObservable } from 'mobx';
import { IChannel, IChannelsParams, IProgram, IProgramsParams, IUser } from '../api/models';
import { UserApiServiceInstanse } from '../api/UserApiServise';
import { ProgramsApiServiceInstanse } from '../api/ProgrammsApiService';

export class RootStore {
    programs: IProgram[] = [];
    channels: IChannel[] = [];
    filteredPrograms: IProgram[] = [];
    filteredChanneles: IChannel[] = [];
    user: IUser | null = null;

    date = new Date();

    constructor() {
        makeAutoObservable(this);
    }

    setPrograms(programs: IProgram[]) {
        this.programs = programs;
    }

    setChannels(channels: IChannel[]) {
        this.channels = channels;
    }

    setUser(user: IUser | null) {
        this.user = user;
    }

    async fetchPrograms(
        params: IProgramsParams = {
            start: new Date(this.date.getDate() - 7).toISOString(),
            finish: new Date(this.date.getDate() + 7).toISOString(),
        }
    ) {
        const programs = await ProgramsApiServiceInstanse.getPrograms(params);

        this.setPrograms(programs);
    }

    async fetchChannels(
        params: IChannelsParams = {
            start: new Date(this.date.getDate() - 7).toISOString(),
            finish: new Date(this.date.getDate() + 7).toISOString(),
        }
    ) {
        const channels = await ProgramsApiServiceInstanse.getChannels(params);

        this.setChannels(channels);
    }

    async fetchUser() {
        const user = await UserApiServiceInstanse.getUser();

        this.setUser(user);
    }

    async postChannelRating(id: number, rating: number) {
        await UserApiServiceInstanse.postChannelRating(id, rating);
    }

    async postProgramRating(id: number, rating: number) {
        await UserApiServiceInstanse.postProgramRating(id, rating);
    }

    async postChannelLike(id: number) {
        await UserApiServiceInstanse.postChannelLike(id);
    }

    async postProgramLike(id: number) {
        await UserApiServiceInstanse.postProgramLike(id);
    }
}
