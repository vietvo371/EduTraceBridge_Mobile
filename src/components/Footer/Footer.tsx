import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, PLATFORM } from '../../styles/theme';

interface FooterButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

interface FooterProps {
  buttons: FooterButtonProps[];
}

const FooterButton: React.FC<FooterButtonProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Icon name={icon} size={SIZES.fontSize.xlarge} color={COLORS.white} />
    <Text style={styles.footerButtonText}>{label}</Text>
  </TouchableOpacity>
);

const Footer: React.FC<FooterProps> = ({ buttons }) => {
  return (
    <View style={styles.footer}>
      {buttons.map((button, index) => (
        <FooterButton
          key={index}
          icon={button.icon}
          label={button.label}
          onPress={button.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingBottom: Platform.select({
      ios: PLATFORM.ios.paddingBottom,
      android: PLATFORM.android.paddingBottom,
    }),
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.white,
    marginTop: SIZES.margin.small,
  },
});

export default Footer; 