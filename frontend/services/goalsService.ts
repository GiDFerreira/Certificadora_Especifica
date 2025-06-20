import { Goal } from "@/interfaces/Goal";
import axiosService from "./AxiosService";

export const goalsService = {
    
    getGoals: async (): Promise<Goal[]> =>{
        const response = await axiosService.get<Goal[]>("/api/goals");
        return response.data;
    },

    deleteGoal: async (id: string): Promise<void> => {
        await axiosService.delete(`/api/goals/${id}`);
    }
}