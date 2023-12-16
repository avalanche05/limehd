export interface IChannel {
    id: number;
    name: string;
    rating: number;
    description: string;
    image: string;
    is_favorite: boolean;
    stream_link: string;
    schedule: IStream[];
}

export interface IStream {
    id: number;
    channelId: number;
    start: string;
    finish: string;
    program: IProgram;
}

export interface IProgram {
    id: number;
    name: string;
    rating: number;
    is_favorite: boolean;
    genre: string;
    category: string;
    image: string;
    streams: IStream[];
}

export interface IChannelsParams {
    start: string;
    finish: string;
    name?: string;
}

export interface IProgramsParams {
    start: string;
    finish: string;
    name?: string;
    genre?: string;
    category?: string;
}
