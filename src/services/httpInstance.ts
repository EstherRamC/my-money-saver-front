
import Config from "../config";
import axios from "axios";
import { auth } from "../firebaseConfig";

const httpInstance = axios.create({
    baseURL: Config.API_URL,
});

httpInstance.interceptors.request.use(
    async (config) => {
        const newConfig = { ...config };
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            newConfig.headers.Authorization = `Bearer ${token}`;
        }
        return newConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpInstance;
