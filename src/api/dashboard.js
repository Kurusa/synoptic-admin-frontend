import axios from "axios";

const BASE_URL = process.env.VUE_APP_BACKEND_URL;

export const fetchUsersStats = async () => {
    const response = await axios.get(`${BASE_URL}/stats/users`);

    return {
        labels: response.data.labels,
        data: response.data.values,
        total: response.data.total,
    };
};

export const fetchMessagesStats = async () => {
    const response = await axios.get(`${BASE_URL}/stats/messages`);
    return {
        labels: response.data.labels,
        data: response.data.values,
        total: response.data.total,
    };
};
