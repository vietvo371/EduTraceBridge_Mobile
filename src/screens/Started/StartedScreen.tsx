import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { COLORS } from '../../styles/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type StartedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Started'>;

const StartedScreen = () => {
  const navigation = useNavigation<StartedScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>EduBridgeTrace</Text>
        <Text style={styles.subtitle}>Quản lý văn bằng và cơ hội việc làm</Text>
        <Text style={styles.description}>
          Nền tảng blockchain giúp bạn lưu trữ và chia sẻ văn bằng, chứng chỉ một cách an toàn và minh bạch
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp('70%'),
    height: hp('30%'),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('10%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  description: {
    fontSize: wp('4%'),
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: hp('3%'),
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('10%'),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
});

export default StartedScreen; 