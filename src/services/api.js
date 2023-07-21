import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const upscale = async (imageUrl) => await api.post('/upscale', { imageUrl });

export {
    upscale
}