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

    async fetchProgram(id: number) {
        const program = await ProgramsApiServiceInstanse.getProgram(id);

        return program;
    }

    todayStart = '2023-12-17T00:00:00.668Z';
    todayFinish = '2023-12-17T23:59:59.668Z';
    async fetchChannels(
        params: IChannelsParams = {
            start: this.todayStart,
            finish: this.todayFinish,
        }
    ) {
        const channels = await ProgramsApiServiceInstanse.getChannels(params);

        // this.setChannels(channels);

        return channels;
    }

    async fetchChannel(id: number) {
        const channel = await ProgramsApiServiceInstanse.getChannel(id);

        return channel;
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
