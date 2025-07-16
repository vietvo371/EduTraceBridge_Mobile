import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../styles/theme';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';

const HomeScreen: React.FC = () => {
  const footerButtons = [
    { icon: 'home', label: 'Trang chủ' },
    { icon: 'person', label: 'Hồ sơ' },
    { icon: 'settings', label: 'Cài đặt' },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Ứng dụng mẫu"
          onMenuPress={() => console.log('Menu pressed')}
          onSearchPress={() => console.log('Search pressed')}
        />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Card
            title="Chào mừng bạn!"
            content="Đây là layout responsive, tương thích với mọi thiết bị iOS và Android. Nội dung sẽ tự động điều chỉnh theo kích thước màn hình."
          />
          
          {[...Array(5)].map((_, index) => (
            <Card
              key={index}
              title={`Card ${index + 1}`}
              content="Nội dung mẫu cho card."
            />
          ))}
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SIZES.padding.medium,
    paddingBottom: SIZES.padding.large,
  },
});

export default HomeScreen; 