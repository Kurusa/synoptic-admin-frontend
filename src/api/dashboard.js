import axios from "axios";

const BASE_URL = process.env.VUE_APP_BACKEND_URL;

export const fetchUsersStats = async () => {
    const response = await axios.get(`${BASE_URL}/stats/users`);

    return {
        labels: response.data.labels,
        data: response.data.values,
        total: response.data.total,
        today: response.data.values.slice(-1),
    };
};

export const fetchMessagesStats = async () => {
    const response = await axios.get(`${BASE_URL}/stats/messages`);
    return {
        labels: response.data.labels,
        data: response.data.values,
        total: response.data.total,
        today: response.data.values.slice(-1),
    };
};

export const fetchCitiesStats = async () => {
    const response = await axios.get(`${BASE_URL}/stats/cities`);

    return response.data.map(city => ({
        id: city.id,
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        userCount: city.user_count,
    }));
};
