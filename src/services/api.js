import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.3:3001',
});

const upscale = async (imageUrl) => await api.post('/upscale', { imageUrl });

export {
    upscale
}