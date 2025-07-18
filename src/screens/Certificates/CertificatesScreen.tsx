import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';
import Header from '../../components/Header/Header';

const CertificatesScreen = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      id: '1',
      title: 'Blockchain Basic',
      issuer: 'Duy Tan University',
      date: '15/03/2024',
      type: 'Course Certificate',
      image: require('../../assets/images/logo.png'),
    },
    {
      id: '2',
      title: 'React Native Development',
      issuer: 'FPT Software Academy',
      date: '01/02/2024',
      type: 'Professional Certificate',
      image: require('../../assets/images/logo.png'),
    },
    {
      id: '3',
      title: 'Web3 Development',
      issuer: 'DTU Blockchain Lab',
      date: '20/01/2024',
      type: 'Achievement',
      image: require('../../assets/images/logo.png'),
    },
  ];

  const shareOptions = [
    { icon: 'content-copy', label: 'Sao chép liên kết' },
    { icon: 'facebook', label: 'Facebook' },
    { icon: 'mail', label: 'Email' },
    { icon: 'message', label: 'Tin nhắn' },
    { icon: 'more-horiz', label: 'Thêm' },
  ];

  const handleSharePress = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setSelectedCertificate(null);
  };

  const renderCertificateCard = (certificate: any) => (
    <TouchableOpacity key={certificate.id} style={styles.card}>
      <Image source={certificate.image} style={styles.certificateImage} />
      <View style={styles.cardContent}>
        <Text style={styles.certificateTitle}>{certificate.title}</Text>
        <Text style={styles.issuer}>{certificate.issuer}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.typeContainer}>
            <Icon name="verified" size={16} color={COLORS.primary} />
            <Text style={styles.type}>{certificate.type}</Text>
          </View>
          <Text style={styles.date}>{certificate.date}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={() => handleSharePress(certificate)}
      >
        <Icon name="share" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Chứng chỉ</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Văn bằng</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Thành tích</Text>
        </View>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Chứng chỉ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Văn bằng</Text>
        </TouchableOpacity>
      </View>

      {/* Certificates List */}
      <View style={styles.certificatesList}>
        {certificates.map(renderCertificateCard)}
      </View>

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
            <Text style={styles.modalTitle}>Chia sẻ chứng chỉ</Text>
            <View style={styles.shareOptions}>
              {shareOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.shareOption}>
                  <View style={styles.shareIconContainer}>
                    <Icon name={option.icon} size={24} color={COLORS.primary} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: wp('5%'),
    justifyContent: 'space-around',
    marginBottom: hp('2%'),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginTop: hp('0.5%'),
  },
  filterContainer: {
    flexDirection: 'row',
    padding: wp('3%'),
    backgroundColor: '#fff',
    marginBottom: hp('2%'),
  },
  filterButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginRight: wp('2%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.gray,
    fontSize: wp('3.5%'),
  },
  activeFilterText: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },
  certificatesList: {
    padding: wp('3%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    padding: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('2%'),
  },
  cardContent: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  certificateTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('0.5%'),
  },
  issuer: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginBottom: hp('0.5%'),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: wp('3%'),
    color: COLORS.primary,
    marginLeft: wp('1%'),
  },
  date: {
    fontSize: wp('3%'),
    color: COLORS.gray,
  },
  shareButton: {
    padding: wp('2%'),
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    margin: wp('5%'),
    padding: wp('4%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
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
    color: COLORS.text,
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
    color: COLORS.gray,
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
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CertificatesScreen;