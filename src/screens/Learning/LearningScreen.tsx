import React, { useState } from 'react';
import {
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header/Header';
import { COLORS } from '../../styles/theme';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  reward: number;
  level: string;
  duration: string;
}

const DUMMY_COURSES: Course[] = [
  {
    id: '1',
    title: 'Blockchain Cơ bản',
    description: 'Khóa học về nền tảng công nghệ blockchain, phù hợp cho người mới bắt đầu',
    price: 100,
    reward: 50,
    level: 'Cơ bản',
    duration: '8 giờ',
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    description: 'Học phát triển hợp đồng thông minh với Solidity',
    price: 150,
    reward: 75,
    level: 'Trung bình',
    duration: '12 giờ',
  },
];

const LearningScreen = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filters = ['Tất cả', 'Cơ bản', 'Trung bình', 'Nâng cao'];

  const handleBuyCourse = (course: Course) => {
    console.log(`Buying course: ${course.title}`);
  };

  const renderCourseItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Icon name="bookmark-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.courseInfo}>
        <View style={styles.infoItem}>
          <Icon name="school" size={16} color="#666666" />
          <Text style={styles.infoText}>{item.level}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="access-time" size={16} color="#666666" />
          <Text style={styles.infoText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.courseFooter}>
        <View style={styles.priceSection}>
          <Text style={styles.coursePrice}>{item.price} Token</Text>
          <Text style={styles.courseReward}>+{item.reward} Token</Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleBuyCourse(item)}
        >
          <Text style={styles.buyButtonText}>Đăng ký học</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onNotificationPress={() => {}} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm khóa học..."
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={DUMMY_COURSES}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  searchContainer: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('3%'),
    fontSize: wp('4%'),
    color: '#2D2D2D',
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1%'),
  },
  filterScroll: {
    paddingHorizontal: wp('5%'),
  },
  filterChip: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    backgroundColor: '#F8F8FA',
    marginRight: wp('2%'),
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: wp('3.5%'),
    color: '#666666',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContainer: {
    padding: wp('5%'),
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('0.5%'),
  },
  courseDescription: {
    fontSize: wp('3.5%'),
    color: '#666666',
    marginBottom: hp('1%'),
  },
  bookmarkButton: {
    padding: wp('1%'),
  },
  courseInfo: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    gap: wp('3%'),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: wp('1%'),
    fontSize: wp('3.5%'),
    color: '#666666',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    paddingTop: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(127, 61, 255, 0.1)',
  },
  priceSection: {
    flex: 1,
  },
  coursePrice: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.primary,
  },
  courseReward: {
    fontSize: wp('3.5%'),
    color: 'green',
    marginTop: hp('0.5%'),
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
});

export default LearningScreen;
