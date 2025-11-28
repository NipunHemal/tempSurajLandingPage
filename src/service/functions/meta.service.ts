import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const getMeta = async () => {
  const response = await axiosClient.get(ENDPOINTS.meta.get);
  return response.data;
};
