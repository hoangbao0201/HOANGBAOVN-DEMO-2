import { API_BASE_URL } from "@/constants";
import axios from "axios";

export interface GetTagsProps {
    tagId: number;
    name: string;
    slug: string;
    _count: {
        blogTags: number;
    };
}
class TagService {
    async findAll(query?: string): Promise<any> {
        try {
            const tagsRes = await axios.get(`${API_BASE_URL}/api/tags?${query}`);
            return tagsRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async test(): Promise<any> {
        try {
            return {
                success: true,
                message: "successful",
            };
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const tagService = new TagService();

export default tagService;
