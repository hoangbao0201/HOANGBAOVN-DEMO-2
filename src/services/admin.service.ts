import { API_BASE_URL } from "@/constants";
// import axios from "axios";

export interface GetUsersProps {
    userId: number,
    name: string,
    username: string,
    email: string,
    password: string,
    description: string | null,
    rank: number,
    candy: number,
    createdAt: Date
}

class AdminService {

    async getAllUser(token: string) : Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async test() : Promise<any> {
        try {
            return {
                success: true,
                message: "successful",
            };
        } catch (error) {
            return {
                success: false,
                message: "error users successful",
                error: error
            };
        }
    
    }

}

const adminService = new AdminService();

export default adminService;