import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from '@react-navigation/native';
import api from './api';
import { showToast } from '../utils/toast';

// import Toast from "react-native-toast-message";

export const saveToken = async (token: string) => {
    await AsyncStorage.setItem('token', token);
}

export const getUser = async () => {
    return await AsyncStorage.getItem('user');
}
export const getToken = async () => {
    return await AsyncStorage.getItem('token');
}

export const removeToken = async () => {
    await AsyncStorage.removeItem('token');
}

export const checkToken = async (navigation: NavigationProp<any>) => {
    try {
        const token = await getToken();
        if (token) {
            const res = await api.get('/check-login');
            if (res.data.status) {
                if (res.data.token && res.data.token !== null) {
                    await saveToken(res.data.token);
                }
                return true;
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
                showToast.error('Vui lòng đăng nhập hệ thống!');
                return false;
            }
        }
        return false;
    } catch (error) {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
        console.error('Error checking token:', error);
        showToast.error('Vui lòng đăng nhập hệ thống!');
        return false;
    }
}

export interface StudentUser {
    student_code: string;
    full_name: string;
    id_school: string;
    email: string;
    phone: string;
    is_open: string;
    wallet_address: string;
}

export const checkStudentLogin = async () => {
    try {
        const response = await api.get('/student/check-login');
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error checking student login:', error);
        return {
            success: false,
            message: 'Không thể kiểm tra trạng thái đăng nhập'
        };
    }
}