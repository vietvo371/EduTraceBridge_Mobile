import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ( navigate : any) => {
  const navigation = useNavigation();
  const [showShareModal, setShowShareModal] = useState(false);

  const stats = [
    { icon: 'school', label: 'Văn bằng', value: '3' },
    { icon: 'work', label: 'Việc làm', value: '5' },
    { icon: 'star', label: 'Điểm TB', value: '3.5' },
  ];

  const shareOptions = [
    { icon: 'content-copy', label: 'Sao chép liên kết' },
    { icon: 'facebook', label: 'Facebook' },
    { icon: 'mail', label: 'Email' },
    { icon: 'message', label: 'Tin nhắn' },
    { icon: 'more-horiz', label: 'Thêm' },
  ];

  const handleNotificationPress = () => {
    // Handle notification press
  };

  const handleSharePress = () => {
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
  };
  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} />
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Token Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Số dư token</Text>
          <View style={styles.balanceWrapper}>
            <Text style={styles.balanceAmount}>1,234.56</Text>
            <Text style={styles.tokenSymbol}>DZT</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Icon name={item.icon} size={24} color="#7F3DFF" />
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>


        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
          <View style={styles.activityList}>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="verified" size={20} color="#7F3DFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Nhận chứng chỉ Blockchain Basic</Text>
                <Text style={styles.activityTime}>2 giờ trước</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="work" size={20} color="#7F3DFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Ứng tuyển vị trí Frontend Developer</Text>
                <Text style={styles.activityTime}>1 ngày trước</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIndicator} />
            </View>
            <Text style={styles.modalTitle}>Chia sẻ với</Text>
            <View style={styles.shareOptions}>
              {shareOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.shareOption}>
                  <View style={styles.shareIconContainer}>
                    <Icon name={option.icon} size={24} color="#7F3DFF" />
                  </View>
                  <Text style={styles.shareOptionLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.cancelButtonText}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },
  balanceContainer: {
    backgroundColor: '#7F3DFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
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
  balanceLabel: {
    fontSize: wp('3.5%'),
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: hp('1%'),
  },
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: wp('2%'),
  },
  tokenSymbol: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    alignItems: 'center',
    width: wp('25%'),
  },
  statIconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  statValue: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginVertical: hp('0.5%'),
  },
  statLabel: {
    fontSize: wp('3.5%'),
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('3%'),
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  actionIcon: {
    width: wp('14%'),
    height: wp('14%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  actionLabel: {
    fontSize: wp('3%'),
    color: '#666666',
    textAlign: 'center',
    marginTop: hp('0.5%'),
  },
  activityList: {
    gap: hp('2%'),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    backgroundColor: 'rgba(127, 61, 255, 0.03)',
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  activityIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: wp('3.5%'),
    color: '#2D2D2D',
    marginBottom: hp('0.5%'),
    fontWeight: '500',
  },
  activityTime: {
    fontSize: wp('3%'),
    color: '#666666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('5%'),
    paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('2%'),
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  modalIndicator: {
    width: wp('10%'),
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  shareOption: {
    width: wp('18%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  shareIconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  shareOptionLabel: {
    fontSize: wp('3%'),
    color: '#666666',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: hp('2%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#F8F8FA',
    borderRadius: wp('2%'),
  },
  cancelButtonText: {
    fontSize: wp('4%'),
    color: '#2D2D2D',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;