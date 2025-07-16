import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, PLATFORM } from '../../styles/theme';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onMenuPress, 
  onSearchPress 
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon} onPress={onMenuPress}>
        <Icon name="menu" size={SIZES.fontSize.xlarge} color={COLORS.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.headerIcon} onPress={onSearchPress}>
        <Icon name="search" size={SIZES.fontSize.xlarge} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.medium,
    paddingTop: Platform.select({
      ios: PLATFORM.ios.paddingTop,
      android: PLATFORM.android.paddingTop,
    }),
  },
  headerTitle: {
    fontSize: SIZES.fontSize.large,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerIcon: {
    padding: SIZES.padding.small,
  },
});

export default Header; 