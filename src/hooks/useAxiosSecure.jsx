import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth';


const axiosInstance = axios.create({
    baseURL: 'https://book-my-seat-server.vercel.app/',
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { user, setUser, logOut, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const requestInterceptor = axiosInstance.interceptors.request.use(config => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            });


            const responseInterceptor = axiosInstance.interceptors.response.use(
                res => res,
                async err => {
                    const originalRequest = err.config;

                    if (err.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        try {
                            const { data } = await axios.post(
                                'https://book-my-seat-server.vercel.app/refresh-token',
                                {},
                                { withCredentials: true }
                            );

                            setUser(prev => ({ ...prev, accessToken: data.accessToken }));
                            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                            return axiosInstance(originalRequest);
                        } catch (refreshErr) {
                            await logOut();
                            navigate('/auth/login');
                            return Promise.reject(refreshErr);
                        }
                    }

                    if (err.response?.status === 403) {
                        await logOut();
                        navigate('/auth/login');
                    }

                    return Promise.reject(err);
                }
            );

            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, loading, logOut, navigate, setUser]);

    return axiosInstance;
};

export default useAxiosSecure;
