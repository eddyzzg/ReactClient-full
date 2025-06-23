import apiClient from './ServerConnector';
import apiClientJava from './ServerConnectorJava';
import { createApiClient } from './YouTubeApiConnector';

// ---- Subject dictionary ---- /
export interface Subject {
    id: string;
    value: string;
    label: string;
}
export const getSubjects = (): Promise<Subject[]> =>
    apiClient.get<Subject[]>('/subjects').then(res => res.data);

export const getSubjectsFromJava = (): Promise<Subject[]> => {
    return apiClientJava.get<Subject[]>('/api/subjects').then((res) => {
        return res.data;
    });
}



// ---- User dictionary ----/
export interface User {
    id: number;
    name: string;
    email: string;
}
export const getUsers = (): Promise<User[]> =>
    apiClient.get<User[]>('/users').then(res => res.data);

export const createUser = (user: Omit<User, 'id'>): Promise<User> =>
    apiClient.post<User>('/users', user).then(res => res.data);

export const getUsersById = (): Promise<User[]> =>
    apiClient.get<User[]>('/:id').then(res => res.data);


// ---- YouTube API ---- / 
export interface Video {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        thumbnails: { medium: { url: string } };
    };
}
export const getVideos = async (apiKey: string, channelId: string, maxResult: string): Promise<Video[]> => {
    const apiYT = createApiClient(apiKey, channelId, maxResult);
    const res = await apiYT.get<{ items: Video[] }>('');
    return res.data.items;
};


