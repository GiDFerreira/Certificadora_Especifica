import { Mood } from "@/interfaces/Mood";
import axiosService from "./AxiosService";

export const moodService = {

    getMoods: async (): Promise<Mood[]> => {
        const response = await axiosService.get<Mood[]>("/api/moods");
        return response.data;
    },

    getTodayMood: async (): Promise<Mood | null> => {
        const response = await axiosService.get<Mood | null>("/api/moods/today");
        return response.data;
    },

    deleteMood: async (id: string): Promise<void> => {
        await axiosService.delete(`/api/moods/${id}`);
    }
}
