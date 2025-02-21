import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

// Function to format date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

// Sample data - replace with actual data from your backend
const attendanceData = {
  '2024-02-20': { marked: true, dotColor: 'green' },
  '2024-02-19': { marked: true, dotColor: 'red' },
  '2024-02-18': { marked: true, dotColor: 'green' },
};

const punchData = [
  { date: '20-02-2024', in: '09:00 AM', out: '05:30 PM' },
  { date: '19-02-2024', in: '09:15 AM', out: '05:45 PM' },
  { date: '18-02-2024', in: '08:55 AM', out: '05:25 PM' },
];

export default function TabOneScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History 📅</Text>
      
      {/* Calendar View */}
      <Calendar
        style={styles.calendar}
        markedDates={attendanceData}
        onDayPress={day => setSelectedDate(formatDate(day.dateString))}
        theme={{
          todayTextColor: '#2c4150',
          selectedDayBackgroundColor: '#00adf5',
          dotColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />

      {/* Punch Times List */}
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {punchData.map((punch, index) => (
          <View key={index} style={styles.punchCard}>
            <Text style={styles.punchDate}>{punch.date}</Text>
            <View style={styles.punchTimesContainer}>
              <View style={[styles.punchTimeBox, styles.inTime]}>
                <Text style={styles.punchTimeLabel}>IN</Text>
                <Text style={styles.punchTimeValue}>{punch.in}</Text>
              </View>
              <View style={styles.divider} />
              <View style={[styles.punchTimeBox, styles.outTime]}>
                <Text style={styles.punchTimeLabel}>OUT</Text>
                <Text style={styles.punchTimeValue}>{punch.out}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Menu Button */}
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setShowMenu(!showMenu)}
      >
        <FontAwesome name="ellipsis-v" size={24} color="white" />
      </TouchableOpacity>

      {/* Floating Menu */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Filter View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#757575',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  punchCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#757575',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  punchDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  punchTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  punchTimeBox: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
  },
  divider: {
    width: 1,
    backgroundColor: '#ffffff',
  },
  inTime: {
    backgroundColor: '#e8f5e9',
  },
  outTime: {
    backgroundColor: '#ffebee',
  },
  punchTimeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2c3e50',
  },
  punchTimeValue: {
    fontSize: 14,
    color: '#2c3e50',
  },
  menuButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#00adf5',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menu: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    color: '#2c3e50',
    fontSize: 16,
  },
});
