import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from './useAuth'

const useAxiosSecure = () => {
    const { user, logOut, loading } = useAuth()
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true,
    })

    useEffect(() => {
        if (!loading && user?.accessToken) {
            const requestInterceptor = axiosInstance.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user.accessToken}`
                return config
            })
            const responseInterceptor = axiosInstance.interceptors.response.use(
                res => res,
                async err => {
                    if (err?.response?.status === 401 || err?.response?.status === 403) {
                        await logOut()
                        navigate('/login')
                    }
                    return Promise.reject(err)
                }
            )

            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor)
                axiosInstance.interceptors.response.eject(responseInterceptor)
            }
        }
    }, [user, loading, logOut, navigate])

    return axiosInstance
}

export default useAxiosSecure
