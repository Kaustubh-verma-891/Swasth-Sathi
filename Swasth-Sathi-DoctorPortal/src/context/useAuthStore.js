import { create } from 'zustand'
// import { io } from 'socket.io-client'
import axiosInstance from '../utils/axiosInstance'
// const baseURL = 'http://localhost:3000'

export const useAuthStore = create((set, get) => ({
    authDoctor: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    // socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/doctor/checkauth')
            set({ authDoctor: res.data })
            // get().connectSocket();
        } catch (error) {
            console.log(error);
            set({ authDoctor: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true })
        try {
            const response = await axiosInstance.post("/doctor/signup",
                formData
            );
            set({ authDoctor: response.data.doctor })
            // get().connectSocket();
        } catch (error) {
            console.error("Error creating account:", error.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('/doctor/login', {
                email: formData.email,
                password: formData.password
            })
            set({ authDoctor: response.data })
            // get().connectSocket();
        } catch (error) {
            console.error(error.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/doctor/logout')
            set({ authDoctor: null })
            // get().disconnectSocket()
        } catch (error) {
            console.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.patch('/doctor/update', data)
            set({ authDoctor: res.data })
        } catch (error) {
            console.log("Error", error);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    // connectSocket: () => {
    //     const { authDoctor } = get();
    //     if (!authDoctor || get().socket?.connected) return;

    //     const socket = io(baseURL, {
    //         query: {
    //             doctorId: authDoctor._id
    //         }
    //     })
    //     socket.connect();
    //     set({ socket: socket })
    // },
    // disconnectSocket: () => {
    //     if (get().socket?.connected) {
    //         get().socket.disconnect();
    //     }
    // }
}))