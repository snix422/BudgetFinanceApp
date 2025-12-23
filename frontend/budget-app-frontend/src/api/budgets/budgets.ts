import { api } from "../../lib/axiosClient"
import type { Budget, CreateBudgetDto, UpdateBudgetDto } from "../../types/budget";

export const getBudgets = async () : Promise<Budget[]> => {
    return await api.get("budgets");
}

export const getBudgetById = async (id:number) : Promise<Budget> => {
    return await api.get(`budgets/${id}`)
}

export const createBudget = async (newBudgetData:CreateBudgetDto) : Promise<Budget> => {
    return await api.post(`budgets`, newBudgetData)
}

export const updateBudget = async ({id, ...data} :  {id:number} & UpdateBudgetDto) : Promise<Budget> => {
    return await api.put(`budgets/${id}`, data)
}

export const deleteBudget = async (id:number) : Promise<void> => {
    return await api.delete(`budgets/${id}`)
}