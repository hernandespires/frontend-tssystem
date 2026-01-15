import api from "@/lib/api"
import { Login, User } from "@/types/services/user"

const defaultRoute: string = "/users/"

export const getAllUsers = async (): Promise<User[]> => {
    return (await api.get(defaultRoute + "allUsers")).data
}

export const getUserById = async (id: string): Promise<User> => {
    return (await api.get(defaultRoute + `getUser/${id}`)).data
}

export const login = async (payload: Login): Promise<User> => {
    return (await api.post<User>(defaultRoute + "login", payload)).data
}