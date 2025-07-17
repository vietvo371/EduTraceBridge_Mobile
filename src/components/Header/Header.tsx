import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, SIZES } from '../../styles/theme';

interface HeaderProps {
  onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNotificationPress 
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>EduBridgeTrace</Text>
        <TouchableOpacity 
          style={styles.notificationButton} 
          onPress={onNotificationPress}
        >
          <View style={styles.iconContainer}>
            <Icon name="notifications" size={22} color={COLORS.primary} />
          </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('2%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 61, 255, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  notificationButton: {
    padding: wp('1%'),
  },
  iconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header; 