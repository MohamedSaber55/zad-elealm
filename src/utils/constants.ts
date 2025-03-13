import Cookies from 'js-cookie';

export const baseUrl: string = 'https://zadelealm.runasp.net/api';
export const getAuthToken = () => (Cookies.get("token"));
