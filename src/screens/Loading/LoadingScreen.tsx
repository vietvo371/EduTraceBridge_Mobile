import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { COLORS } from '../../styles/theme';
import { checkStudentLogin } from '../../services/TokenManager';

const LoadingScreen = ({ navigation }: { navigation: any }) => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const checkAndNavigate = async () => {
            try {
                const response = await checkStudentLogin();
                if (response.success) {
                    navigation.replace('MainTab');
                } else {
                    navigation.replace('Auth');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigation.replace('Auth');
            }
        };

        if (navigationState) {
            setTimeout(() => {
                checkAndNavigate();
            }, 1000); // Simulate loading time
        }
    }, [navigationState, navigation]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                    marginBottom: 20
                }}
            />
            <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

export default LoadingScreen;