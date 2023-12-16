import { IChannel, IProgram, IStream } from '.';

export interface IUser {
    id: number;
    name: string;
    favorite_programs: IProgram[];
    favorite_channels: IChannel[];
}

export interface ISubscription {
    stream: IStream[];
}
