import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const DetailLearningScreen = ({ route, navigation } : any) => {
  const { course } = route.params;
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const curriculum = [
    { title: 'Giới thiệu Blockchain', duration: '1 giờ', isLocked: false },
    { title: 'Cấu trúc Block', duration: '2 giờ', isLocked: true },
    { title: 'Consensus Mechanism', duration: '2 giờ', isLocked: true },
    { title: 'Smart Contracts', duration: '3 giờ', isLocked: true },
  ];

  const handleRegisterCourse = async () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      setIsRegisterVisible(false);
      // Navigate to course content or show success message
    }, 2000);
  };

  const RegisterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isRegisterVisible}
      onRequestClose={() => setIsRegisterVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Xác nhận đăng ký khóa học</Text>
            <TouchableOpacity 
              onPress={() => setIsRegisterVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.courseInfo}>
            <Text style={styles.modalCourseTitle}>{course.title}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.modalLabel}>Giá:</Text>
              <Text style={styles.modalPrice}>{course.price} Token</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.modalLabel}>Phần thưởng:</Text>
              <Text style={styles.modalReward}>+{course.reward} Token</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleRegisterCourse}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.confirmButtonText}>Xác nhận đăng ký</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
          >
            <Icon name="arrow-back-ios" size={24} color="#2D2D2D" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Icon name="bookmark-outline" size={24} color="#2D2D2D" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.courseHeader}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Icon name="people" size={20} color={COLORS.primary} />
                <Text style={styles.statText}>2,345 học viên</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="star" size={20} color={COLORS.primary} />
                <Text style={styles.statText}>4.8 (234 đánh giá)</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
              onPress={() => setSelectedTab('overview')}
            >
              <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
                Tổng quan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'curriculum' && styles.activeTab]}
              onPress={() => setSelectedTab('curriculum')}
            >
              <Text style={[styles.tabText, selectedTab === 'curriculum' && styles.activeTabText]}>
                Nội dung
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === 'overview' ? (
            <View style={styles.overviewContent}>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Bạn sẽ học được</Text>
                <View style={styles.learningPoints}>
                  <View style={styles.learningPoint}>
                    <Icon name="check-circle" size={20} color={COLORS.primary} />
                    <Text style={styles.pointText}>Hiểu về công nghệ blockchain</Text>
                  </View>
                  <View style={styles.learningPoint}>
                    <Icon name="check-circle" size={20} color={COLORS.primary} />
                    <Text style={styles.pointText}>Các khái niệm cơ bản và ứng dụng</Text>
                  </View>
                  <View style={styles.learningPoint}>
                    <Icon name="check-circle" size={20} color={COLORS.primary} />
                    <Text style={styles.pointText}>Phát triển ứng dụng đơn giản</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.curriculumContent}>
              {curriculum.map((item, index) => (
                <View key={index} style={styles.curriculumItem}>
                  <View style={styles.curriculumInfo}>
                    <Icon 
                      name={item.isLocked ? "lock" : "play-circle-outline"} 
                      size={24} 
                      color={item.isLocked ? "#666666" : COLORS.primary} 
                    />
                    <View style={styles.curriculumText}>
                      <Text style={styles.curriculumTitle}>{item.title}</Text>
                      <Text style={styles.curriculumDuration}>{item.duration}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <RegisterModal />
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{course.price} Token</Text>
            <Text style={styles.reward}>+{course.reward} Token</Text>
          </View>
          <TouchableOpacity 
            style={styles.enrollButton}
            activeOpacity={0.8}
            onPress={() => setIsRegisterVisible(true)}
          >
            <Text style={styles.enrollButtonText}>Đăng ký học</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    height: Platform.OS === 'ios' ? hp('7%') : hp('8%'),
  },
  backButton: {
    padding: wp('2%'),
  },
  bookmarkButton: {
    padding: wp('2%'),
  },
  content: {
    flex: 1,
  },
  courseHeader: {
    padding: wp('5%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('3%'),
    margin: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: hp('1%'),
  },
  courseDescription: {
    fontSize: wp('3.8%'),
    color: '#666666',
    lineHeight: wp('5.5%'),
    marginBottom: hp('2%'),
  },
  stats: {
    flexDirection: 'row',
    gap: wp('4%'),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  statText: {
    fontSize: wp('3.5%'),
    color: '#666666',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    paddingVertical: hp('2%'),
    marginRight: wp('4%'),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: wp('4%'),
    color: '#666666',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  overviewContent: {
    padding: wp('5%'),
  },
  infoSection: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('2%'),
  },
  learningPoints: {
    gap: hp('2%'),
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  pointText: {
    fontSize: wp('3.8%'),
    color: '#2D2D2D',
  },
  curriculumContent: {
    padding: wp('5%'),
  },
  curriculumItem: {
    backgroundColor: '#FFFFFF',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
  },
  curriculumInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  curriculumText: {
    flex: 1,
  },
  curriculumTitle: {
    fontSize: wp('3.8%'),
    color: '#2D2D2D',
    fontWeight: '500',
  },
  curriculumDuration: {
    fontSize: wp('3.5%'),
    color: '#666666',
    marginTop: hp('0.5%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  reward: {
    fontSize: wp('3.5%'),
    color: 'green',
  },
  enrollButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    padding: wp('5%'),
    minHeight: hp('40%'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  closeButton: {
    padding: wp('2%'),
  },
  courseInfo: {
    backgroundColor: '#F8F8FA',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('3%'),
  },
  modalCourseTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('2%'),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  modalLabel: {
    fontSize: wp('3.8%'),
    color: '#666666',
  },
  modalPrice: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  modalReward: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: 'green',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});

export default DetailLearningScreen;
