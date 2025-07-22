import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
  Image,
  Share,
  Linking,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';
import Header from '../../components/Header/Header';

// Mock data
const mockCertificates = [
  {
    id: 1,
    title: 'Chứng chỉ React Native Developer',
    issuer: {
      id: 1,
      full_name: 'DTU Blockchain Lab',
      email: 'blockchain@dtu.edu.vn'
    },
    issue_date: '2025-06-15',
    expiry_date: '2028-06-15',
    certificate_url: 'https://example.com/cert1.pdf',
    blockchain_hash: '0x123...abc',
    status: 1, // Đã xác minh
    description: 'Chứng chỉ hoàn thành khóa học React Native nâng cao',
    metadata: {
      type: 'certificate',
      skills: ['React Native', 'TypeScript', 'Mobile Development']
    }
  },
  {
    id: 2,
    title: 'Bằng tốt nghiệp Đại học',
    issuer: {
      id: 2,
      full_name: 'Đại học Duy Tân',
      email: 'info@dtu.edu.vn'
    },
    issue_date: '2025-05-20',
    certificate_url: 'https://example.com/cert2.pdf',
    blockchain_hash: '0x456...def',
    status: 1,
    description: 'Bằng tốt nghiệp ngành Công nghệ thông tin',
    metadata: {
      type: 'degree',
      gpa: 3.8
    }
  },
  {
    id: 3,
    title: 'Chứng chỉ Solidity Developer',
    issuer: {
      id: 1,
      full_name: 'DTU Blockchain Lab',
      email: 'blockchain@dtu.edu.vn'
    },
    issue_date: '2025-07-01',
    status: 2, // Đang xử lý
    description: 'Chứng chỉ khóa học Solidity và Smart Contract',
    metadata: {
      type: 'certificate',
      skills: ['Solidity', 'Ethereum', 'Smart Contracts']
    }
  }
];

const CertificatesScreen = ({ navigation }: any) => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleShare = async (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowVerificationModal(true);
  };

  const handleViewCertificate = (certificate: any) => {
    // TODO: Navigate to certificate detail screen
    // navigation.navigate('CertificateDetail', { certificate });
  };

  const handleShareCertificate = async () => {
    if (!selectedCertificate) return;

    try {
      const verificationUrl = `https://example.com/verify/${selectedCertificate.id}`;
      const message = `
🎓 Chứng chỉ: ${selectedCertificate.title}
🏢 Đơn vị cấp: ${selectedCertificate.issuer.full_name}
📅 Ngày cấp: ${new Date(selectedCertificate.issue_date).toLocaleDateString('vi-VN')}
✅ Trạng thái: ${selectedCertificate.status === 1 ? 'Đã xác minh' : 'Chưa xác minh'}
${selectedCertificate.blockchain_hash ? '🔗 Đã xác minh trên Blockchain' : ''}

🔍 Xác minh tại: ${verificationUrl}
      `;

      await Share.share({
        message,
        url: selectedCertificate.certificate_url,
        title: `Chứng chỉ: ${selectedCertificate.title}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setShowVerificationModal(false);
    }
  };

  const handleVerifyOnBlockchain = async () => {
    if (!selectedCertificate?.blockchain_hash) return;
    
    const blockchainUrl = `https://etherscan.io/tx/${selectedCertificate.blockchain_hash}`;
    try {
      await Linking.openURL(blockchainUrl);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const getCertificateStats = () => {
    return {
      total: mockCertificates.length,
      verified: mockCertificates.filter(cert => cert.status === 1).length,
      blockchain: mockCertificates.filter(cert => cert.blockchain_hash).length,
    };
  };
  const handleNotificationPress = () => {
    navigation.navigate('Notification' as never);
  };

  const stats = getCertificateStats();

  const renderCertificateCard = (certificate: any) => (
    <TouchableOpacity 
      key={certificate.id} 
      style={styles.card}
      onPress={() => handleViewCertificate(certificate)}
    >
      <Image 
        source={require('../../assets/images/logo.png')}
        style={styles.certificateImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.title} numberOfLines={2}>
              {certificate.title}
            </Text>
            <Text style={styles.issuer}>
              <Icon name="business" size={14} color={COLORS.gray} />
              {' '}{certificate.issuer.full_name}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => handleShare(certificate)}
          >
            <Icon name="share" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="event" size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>
              Cấp ngày: {new Date(certificate.issue_date).toLocaleDateString('vi-VN')}
            </Text>
          </View>
          {certificate.expiry_date && (
            <View style={styles.detailRow}>
              <Icon name="update" size={14} color={COLORS.gray} />
              <Text style={styles.detailText}>
                Hết hạn: {new Date(certificate.expiry_date).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: certificate.status === 1 ? '#4CAF50' + '20' : '#FFC107' + '20' }
          ]}>
            <View style={[
              styles.statusDot,
              { backgroundColor: certificate.status === 1 ? '#4CAF50' : '#FFC107' }
            ]} />
            <Text style={[
              styles.statusText,
              { color: certificate.status === 1 ? '#4CAF50' : '#FFC107' }
            ]}>
              {certificate.status === 1 ? 'Đã xác minh' : 'Đang xử lý'}
            </Text>
          </View>
          {certificate.blockchain_hash && (
            <View style={styles.verifiedBadge}>
              <Icon name="verified" size={16} color={COLORS.primary} />
              <Text style={styles.verifiedText}>Blockchain</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="folder" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Tổng số</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="verified" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{stats.verified}</Text>
            <Text style={styles.statLabel}>Đã xác minh</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="link" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{stats.blockchain}</Text>
            <Text style={styles.statLabel}>Blockchain</Text>
          </View>
        </View>

        {/* Certificates List */}
        <View style={styles.certificatesContainer}>
          {mockCertificates.map(renderCertificateCard)}
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVerificationModal}
        onRequestClose={() => setShowVerificationModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowVerificationModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIndicator} />
              <Text style={styles.modalTitle}>Chia sẻ chứng chỉ</Text>
            </View>

            {selectedCertificate && (
              <View style={styles.verificationInfo}>
                <View style={styles.verificationItem}>
                  <Icon name="verified-user" size={20} color="#4CAF50" />
                  <Text style={styles.verificationText}>
                    Chứng chỉ {selectedCertificate.status === 1 ? 'đã được xác minh' : 'đang được xử lý'}
                  </Text>
                </View>
                {selectedCertificate.blockchain_hash && (
                  <TouchableOpacity 
                    style={styles.verificationItem}
                    onPress={handleVerifyOnBlockchain}
                  >
                    <Icon name="link" size={20} color="#2196F3" />
                    <Text style={[styles.verificationText, { color: '#2196F3' }]}>
                      Xem trên Blockchain
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShareCertificate}
            >
              <Icon name="share" size={20} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Chia sẻ ngay</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowVerificationModal(false)}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: wp('4%'),
    padding: wp('3%'),
    marginHorizontal: wp('1%'),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statValue: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: hp('0.5%'),
  },
  statLabel: {
    fontSize: wp('3%'),
    color: COLORS.gray,
  },
  certificatesContainer: {
    padding: wp('4%'),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('4%'),
    marginBottom: hp('2%'),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  certificateImage: {
    width: '100%',
    height: hp('15%'),
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    padding: wp('4%'),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: wp('3%'),
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('0.5%'),
  },
  issuer: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginBottom: hp('1%'),
  },
  shareButton: {
    padding: wp('2%'),
  },
  details: {
    marginVertical: hp('1%'),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  detailText: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginLeft: wp('1%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('4%'),
  },
  statusDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginRight: wp('1%'),
  },
  statusText: {
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  verifiedText: {
    fontSize: wp('3%'),
    color: COLORS.primary,
    marginLeft: wp('1%'),
    fontWeight: '500',
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
    paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('2%'),
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  modalIndicator: {
    width: wp('10%'),
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: hp('2%'),
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: COLORS.text,
  },
  verificationInfo: {
    marginBottom: hp('3%'),
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  verificationText: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    color: COLORS.text,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
  cancelButton: {
    padding: wp('4%'),
    borderRadius: wp('3%'),
    backgroundColor: '#F5F5F5',
    marginTop: hp('1%'),
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: wp('4%'),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CertificatesScreen;