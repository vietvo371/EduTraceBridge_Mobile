import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header/Header';

const JobsScreen = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const jobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'FPT Software',
      location: 'Da Nang',
      type: 'Full-time',
      salary: '15-20M VND',
      requirements: ['React Native', 'TypeScript', '2 years exp'],
      posted: '2 days ago',
    },
    {
      id: '2',
      title: 'Blockchain Developer',
      company: 'DTU Blockchain Lab',
      location: 'Da Nang',
      type: 'Part-time',
      salary: '10-15M VND',
      requirements: ['Solidity', 'Web3.js', '1 year exp'],
      posted: '1 week ago',
    },
    {
      id: '3',
      title: 'Mobile Developer',
      company: 'Rikkeisoft',
      location: 'Da Nang',
      type: 'Full-time',
      salary: '20-25M VND',
      requirements: ['iOS/Android', 'Flutter/RN', '3 years exp'],
      posted: '3 days ago',
    },
  ];

  const filters = ['Tất cả', 'Full-time', 'Part-time', 'Remote'];

  const renderJobCard = (job: any) => (
    <View key={job.id} style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Icon name="bookmark-outline" size={24} color="#7F3DFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.jobInfo}>
        <View style={styles.infoItem}>
          <Icon name="place" size={16} color="#666666" />
          <Text style={styles.infoText}>{job.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="work-outline" size={16} color="#666666" />
          <Text style={styles.infoText}>{job.type}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="payments" size={16} color="#666666" />
          <Text style={styles.infoText}>{job.salary}</Text>
        </View>
      </View>

      <View style={styles.skillTags}>
        {job.requirements.map((skill: string, index: number) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles.jobFooter}>
        <Text style={styles.timeText}>{job.posted}</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
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
            placeholder="Tìm kiếm việc làm..."
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

      <ScrollView 
        style={styles.jobsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.jobsListContent}
      >
        {jobs.map(renderJobCard)}
      </ScrollView>
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
    backgroundColor: '#7F3DFF',
  },
  filterText: {
    fontSize: wp('3.5%'),
    color: '#666666',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  jobsList: {
    flex: 1,
  },
  jobsListContent: {
    padding: wp('5%'),
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('0.5%'),
  },
  companyName: {
    fontSize: wp('3.5%'),
    color: '#7F3DFF',
    fontWeight: '500',
  },
  bookmarkButton: {
    padding: wp('1%'),
  },
  jobInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('2%'),
    gap: wp('2%'),
  },
  skillTag: {
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  skillText: {
    fontSize: wp('3%'),
    color: '#7F3DFF',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    paddingTop: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(127, 61, 255, 0.1)',
  },
  timeText: {
    fontSize: wp('3%'),
    color: '#666666',
  },
  applyButton: {
    backgroundColor: '#7F3DFF',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
});

export default JobsScreen; 