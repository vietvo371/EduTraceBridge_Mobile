import { Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const COLORS = {
  primary: '#7F3DFF',
  white: '#fff',
  black: '#000',
  gray: '#757575',
  lightGray: '#ccc',
  background: '#f5f5f5',
  text: '#212121',
};

export const SIZES = {
  padding: {
    small: wp('2%'),
    medium: wp('4%'),
    large: wp('6%'),
  },
  margin: {
    small: hp('1%'),
    medium: hp('2%'),
    large: hp('3%'),
  },
  borderRadius: wp('2%'),
  fontSize: {
    small: wp('3%'),
    medium: wp('4%'),
    large: wp('5%'),
    xlarge: wp('6%'),
  },
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

export const PLATFORM = {
  ios: {
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  android: {
    paddingTop: hp('2%'),
    paddingBottom: hp('0.5%'),
  },
}; 