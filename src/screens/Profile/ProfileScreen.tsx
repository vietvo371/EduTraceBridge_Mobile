import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const ProfileScreen = () => {
  const studentInfo = {
    name: 'Nguyễn Văn A',
    studentId: '22520001',
    major: 'Công nghệ phần mềm',
    university: 'Đại học Duy Tân',
    email: 'nguyenvana@dtu.edu.vn',
    phone: '0123456789',
    address: 'Da Nang, Vietnam',
    bio: 'Sinh viên năm 3 ngành Công nghệ phần mềm, đam mê phát triển ứng dụng di động và blockchain.',
  };

  const skills = [
    'React Native',
    'TypeScript',
    'Blockchain',
    'Solidity',
    'Web3.js',
    'UI/UX Design',
  ];

  const education = [
    {
      school: 'Đại học Duy Tân',
      degree: 'Kỹ sư Công nghệ phần mềm',
      year: '2022 - 2026',
      gpa: '3.5/4.0',
    },
  ];

  const experience = [
    {
      company: 'DTU Blockchain Lab',
      position: 'Blockchain Developer Intern',
      period: '06/2023 - Present',
      description: 'Nghiên cứu và phát triển các ứng dụng blockchain.',
    },
    {
      company: 'FPT Software Academy',
      position: 'React Native Developer',
      period: '01/2023 - 05/2023',
      description: 'Phát triển ứng dụng di động sử dụng React Native.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name="camera-alt" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{studentInfo.name}</Text>
        <Text style={styles.major}>{studentInfo.major}</Text>
        <Text style={styles.university}>{studentInfo.university}</Text>
      </View>

      {/* Bio Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <TouchableOpacity>
            <Icon name="edit" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.bioText}>{studentInfo.bio}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
        <View style={styles.contactItem}>
          <Icon name="email" size={20} color={COLORS.gray} />
          <Text style={styles.contactText}>{studentInfo.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="phone" size={20} color={COLORS.gray} />
          <Text style={styles.contactText}>{studentInfo.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="location-on" size={20} color={COLORS.gray} />
          <Text style={styles.contactText}>{studentInfo.address}</Text>
        </View>
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kỹ năng</Text>
          <TouchableOpacity>
            <Icon name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Học vấn</Text>
        {education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.schoolName}>{edu.school}</Text>
            <Text style={styles.degree}>{edu.degree}</Text>
            <View style={styles.eduDetails}>
              <Text style={styles.year}>{edu.year}</Text>
              <Text style={styles.gpa}>GPA: {edu.gpa}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kinh nghiệm</Text>
        {experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.companyName}>{exp.company}</Text>
            <Text style={styles.position}>{exp.position}</Text>
            <Text style={styles.period}>{exp.period}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Chia sẻ hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.downloadButton]}>
          <Icon name="download" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Tải CV</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: hp('5%'),
    padding: wp('5%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    borderWidth: 3,
    borderColor: '#fff',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
    padding: wp('2%'),
    borderRadius: wp('5%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('0.5%'),
  },
  major: {
    fontSize: wp('4%'),
    color: '#fff',
    marginBottom: hp('0.5%'),
    opacity: 0.9,
  },
  university: {
    fontSize: wp('4%'),
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('2%'),
  },
  bioText: {
    fontSize: wp('4%'),
    color: COLORS.gray,
    lineHeight: hp('3%'),
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  contactText: {
    fontSize: wp('4%'),
    color: COLORS.gray,
    marginLeft: wp('3%'),
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  skillText: {
    fontSize: wp('3.5%'),
    color: '#fff',
    fontWeight: '500',
  },
  educationItem: {
    marginBottom: hp('2%'),
  },
  schoolName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('0.5%'),
  },
  degree: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginBottom: hp('0.5%'),
  },
  eduDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  year: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
  },
  gpa: {
    fontSize: wp('3.5%'),
    color: COLORS.primary,
  },
  experienceItem: {
    marginBottom: hp('2%'),
  },
  companyName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('0.5%'),
  },
  position: {
    fontSize: wp('3.5%'),
    color: COLORS.primary,
    marginBottom: hp('0.5%'),
  },
  period: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginBottom: hp('0.5%'),
  },
  description: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    lineHeight: hp('2.5%'),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('5%'),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('5%'),
    flex: 0.48,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  downloadButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginLeft: wp('2%'),
  },
});

export default ProfileScreen;