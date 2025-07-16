import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../styles/theme';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding.medium,
    marginBottom: SIZES.margin.medium,
    ...SHADOWS.light,
  },
  cardTitle: {
    fontSize: SIZES.fontSize.medium,
    fontWeight: 'bold',
    marginBottom: SIZES.margin.small,
  },
  cardText: {
    fontSize: SIZES.fontSize.small,
    color: COLORS.gray,
  },
});

export default Card; 