import { API_BASE_URL } from "@/constants";
import axios from "axios";

export interface GetUserDetailProps {
    userId: number,
    username: string,
    name: string,
    email: string,
    avatarUrl: string,
    createdAt: Date,
    description: string | null,
    rank: number,
    role: {
        roleId: number,
        roleName: "admin" | "user"
    },
    _count: {
        blogs: number,
        userSaves: number
    }
}
class UserService {

    async loginUser(accout: string, password: string) : Promise<any> {
        try {
            const userRes = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email: accout,
                password: password
            });
            return userRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async userDetail(username: string) : Promise<any> {
        try {
            const userRes = await axios.get(`${API_BASE_URL}/api/users/${username}`);
            return userRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async getUsersByAdmin(token: string) : Promise<any> {
        try {
            const usersRes = await axios.get(`${API_BASE_URL}/api/users/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return usersRes.data;
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

const userService = new UserService();

export default userService;