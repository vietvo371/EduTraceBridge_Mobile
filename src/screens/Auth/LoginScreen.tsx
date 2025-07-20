import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { COLORS } from '../../styles/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { showToast } from '../../utils/toast';
import { checkStudentLogin } from '../../services/TokenManager';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: any;
}

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }
        setLoading(true);
        setError('');

        try {
           
            const response = await api.post<LoginResponse>('/student/login', {
                email,
                password
            });
            console.log('Login response:', response);
            if (response.data.success) {
                await AsyncStorage.setItem('token', response.data.token ? response.data.token : '');
                const token = await AsyncStorage.getItem('token');
                const user = response.data.user;
                await AsyncStorage.setItem('user', JSON.stringify(user));
                console.log('User data saved:', user);
                console.log(token);
                showToast.success('Đăng nhập thành công!')
                navigation.replace('MainTab');
            } else {
                setError(response.data.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (error: any) {
            console.log('Error response:', error);
            const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const verifyExistingLogin = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const verifyResponse = await checkStudentLogin();
            if (verifyResponse.success) {
                navigation.replace('MainTab');
            }
        }
    };
    useEffect(() => {
        verifyExistingLogin();
        console.log('LoginScreen mounted');
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={styles.subtitle}>
                        Chào mừng bạn quay trở lại với EduBridgeTrace
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Icon name="email" size={20} color={COLORS.gray} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color={COLORS.gray} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Icon
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={20}
                                color={COLORS.gray}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: wp('5%'),
    },
    header: {
        marginTop: hp('10%'),
        marginBottom: hp('5%'),
    },
    title: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: hp('2%'),
    },
    subtitle: {
        fontSize: wp('4%'),
        color: COLORS.gray,
    },
    form: {
        marginTop: hp('5%'),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: wp('3%'),
        marginBottom: hp('2%'),
        paddingHorizontal: wp('4%'),
        height: hp('7%'),
    },
    inputIcon: {
        marginRight: wp('2%'),
    },
    input: {
        flex: 1,
        fontSize: wp('4%'),
        color: COLORS.text,
    },
    eyeIcon: {
        padding: wp('2%'),
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: hp('3%'),
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: wp('3.5%'),
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        borderRadius: wp('3%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    loginButtonText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '600',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    registerText: {
        color: COLORS.gray,
        fontSize: wp('4%'),
    },
    registerLink: {
        color: COLORS.primary,
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
});

export default LoginScreen;