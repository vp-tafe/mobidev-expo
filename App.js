//I'm not going to add my details into here as my github repo is public. I will however add it to everything else so it should be fine.

//Imports go here:
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Adding staff for directory:
const defaultStaff = [
  {
    id: 1,
    initials: "JS",
    firstName: "John",
    lastName: "Smith",
    phone: "02 9988 2211",
    department: 1,
    address: "1 Code Lane, Javaville, NSW, 0100, Australia"
  },
  {
    id: 2,
    initials: "SW",
    firstName: "Sue",
    lastName: "White",
    phone: "03 8899 2255",
    department: 2,
    address: "16 Bit Way, Byte Cove, QLD, 1101, Australia"
  },
  {
    id: 3,
    initials: "BOO",
    firstName: "Bob",
    lastName: "O'Bits",
    phone: "05 7788 2255",
    department: 3,
    address: "8 Silicon Road, Cloud Hills, VIC, 1001, Australia"
  },
  {
    id: 4,
    initials: "MB",
    firstName: "Mary",
    lastName: "Blue",
    phone: "06 4455 9988",
    department: 2,
    address: "4 Processor Boulevard, Appleston, NT, 1010, Australia"
  },
  {
    id: 5,
    initials: "MG",
    firstName: "Mick",
    lastName: "Green",
    phone: "02 9988 1122",
    department: 3,
    address: "700 Bandwidth Street, Bufferland, NSW, 0110, Australia"
  },
];

//Declaring employee departments
const departments = {
  0: "General",
  1: "Information Communications Technology",
  2: "Finance",
  3: "Marketing",
  4: "Human Resources"
};

export default function App() {
  const [staffEmployees, setStaffEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    department: 0,
    address: ''
  });
  const [settings, setSettings] = useState({
    fontSize: 16,
    darkMode: false
  });

  useEffect(() => {
    loadStaffData();
    loadAppSettings();
  }, []);

  const loadStaffData = async () => {
    const storedStaff = await AsyncStorage.getItem('staffEmployees');
    if (storedStaff !== null) {
      setStaffEmployees(JSON.parse(storedStaff));
    } else {
      setStaffEmployees(defaultStaff);
      await AsyncStorage.setItem('staffEmployees', JSON.stringify(defaultStaff));
    }
  };

  const loadAppSettings = async () => {
    const storedSettings = await AsyncStorage.getItem('appSettings');
    if (storedSettings !== null) {
      setSettings(JSON.parse(storedSettings));
    }
  };

  const saveStaffData = async (newStaffData) => {
    await AsyncStorage.setItem('staffEmployees', JSON.stringify(newStaffData));
    setStaffEmployees(newStaffData);
  };

  const saveAppSettings = async (newSettings) => {
    await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  const handleFontSizeChange = (value) => {
    const newSettings = { ...settings, fontSize: value };
    saveAppSettings(newSettings);
  };

  const handleDarkModeToggle = () => {
    const newSettings = { ...settings, darkMode: !settings.darkMode };
    saveAppSettings(newSettings);
  };
//This handles adding new employees
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      department: 0,
      address: ''
    });
    setShowAddEdit(true);
  };
//This handles editing current employees
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      department: employee.department,
      address: employee.address
    });
    setShowDetails(false);
    setShowAddEdit(true);
  };
//This handles saving new and edited employees
  const handleSaveEmployee = async () => {
    const firstInitial = formData.firstName.charAt(0);
    const lastInitial = formData.lastName.charAt(0);
    const initials = firstInitial.toUpperCase() + lastInitial.toUpperCase();

    if (editingEmployee) {
      let newStaffEmployees = [];
      for (let i = 0; i < staffEmployees.length; i++) {
        if (staffEmployees[i].id == editingEmployee.id) {
          let updatedEmployee = {
            id: staffEmployees[i].id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            department: formData.department,
            address: formData.address,
            initials: initials
          };
          newStaffEmployees.push(updatedEmployee);
        } else {
          newStaffEmployees.push(staffEmployees[i]);
        }
      }
      await saveStaffData(newStaffEmployees);
    } else {
      let highestId = 0;
      for (let i = 0; i < staffEmployees.length; i++) {
        if (staffEmployees[i].id > highestId) {
          highestId = staffEmployees[i].id;
        }
      }
      let newId = highestId + 1;

      let newEmployee = {
        id: newId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        department: formData.department,
        address: formData.address,
        initials: initials
      };

      let updatedStaffEmployees = [];
      for (let i = 0; i < staffEmployees.length; i++) {
        updatedStaffEmployees.push(staffEmployees[i]);
      }
      updatedStaffEmployees.push(newEmployee);
      await saveStaffData(updatedStaffEmployees);
    }

    setShowAddEdit(false);
  };
//Below this is all visual
  const dynamicStyles = StyleSheet.create({
    welcomeText: {
      fontSize: settings.fontSize,
      color: '#ffffff',
    },
    text: {
      fontSize: settings.fontSize,
      color: settings.darkMode ? '#ffffff' : '#262626',
    },
    textBackwardsLol: {
      fontSize: settings.fontSize,
      color: settings.darkMode ? '#262626' : '#ffffff',
    },
    background: {
      backgroundColor: settings.darkMode ? '#1a1a1a' : '#ffffff',
    },
    headerBackground: {
      backgroundColor: '#941a1d',
    },
    cardBackground: {
      backgroundColor: settings.darkMode ? '#2a2a2a' : '#ffffff',
      borderColor: settings.darkMode ? '#444444' : '#595959',
    },
    modalBackground: {
      backgroundColor: settings.darkMode ? '#1a1a1a' : '#ffffff',
    }
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <StatusBar style={settings.darkMode ? "light" : "light"} backgroundColor={settings.darkMode ? "#2a2a2a" : "#941a1d"} />

      <View style={[styles.header, dynamicStyles.headerBackground]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('./assets/logo.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.welcomeText, dynamicStyles.welcomeText]}>Welcome to the staff directory!</Text>
        </View>
      </View>

      <View style={[styles.content, dynamicStyles.background]}>
        <View style={[styles.directoryHeader, { borderBottomColor: settings.darkMode ? '#444444' : '#595959' }]}>
          <Text style={[styles.directoryTitle, dynamicStyles.text]}>Current Employees:</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={[styles.settingsButton, { backgroundColor: settings.darkMode ? '#444444' : '#595959' }]} onPress={handleSettingsPress}>
              <Text style={styles.settingsButtonText}>⚙</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addButton, dynamicStyles.headerBackground]} onPress={handleAddEmployee}>
              <Text style={[styles.addButtonText, dynamicStyles.welcomeText]}>+ Add Staff</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.directoryContent}>
          <ScrollView style={styles.staffList} showsVerticalScrollIndicator={false}>
            {staffEmployees.map((Employee) => (
              <TouchableOpacity
                key={Employee.id}
                style={[styles.staffCard, dynamicStyles.cardBackground]}
                onPress={() => handleEmployeePress(Employee)}
              >
                <View style={styles.staffInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{Employee.initials}</Text>
                  </View>
                  <View style={styles.EmployeeDetails}>
                    <Text style={[styles.EmployeeName, dynamicStyles.text]}>
                      {Employee.firstName} {Employee.lastName}
                    </Text>
                    <Text style={[styles.departmentText, dynamicStyles.text]}>
                      {departments[Employee.department]}
                    </Text>
                    <Text style={[styles.phoneText, dynamicStyles.text]}>{Employee.phone}</Text>
                  </View>
                  <View style={styles.chevron}>
                    <Text style={styles.chevronText}>›</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Modal
        visible={showDetails}
      >
        <SafeAreaView style={[styles.modalContainer, dynamicStyles.modalBackground]}>
          <View style={[styles.modalHeader, { borderBottomColor: settings.darkMode ? '#444444' : '#595959' }]}>
            <TouchableOpacity onPress={() => setShowDetails(false)}>
              <Text style={[styles.modalCloseText, dynamicStyles.text]}>Close</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>Staff Details</Text>
            <TouchableOpacity onPress={() => handleEditEmployee(selectedEmployee)}>
              <Text style={[styles.modalEditText, dynamicStyles.text]}>Edit</Text>
            </TouchableOpacity>
          </View>

          {selectedEmployee && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.detailAvatar}>
                <Text style={styles.detailAvatarText}>{selectedEmployee.initials}</Text>
              </View>

              <Text style={[styles.detailName, dynamicStyles.text]}>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </Text>

              <View style={styles.detailSection}>
                <Text style={[styles.detailLabel, dynamicStyles.text]}>Department</Text>
                <Text style={[styles.detailValue, dynamicStyles.text]}>{departments[selectedEmployee.department]}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={[styles.detailLabel, dynamicStyles.text]}>Phone</Text>
                <Text style={[styles.detailValue, dynamicStyles.text]}>{selectedEmployee.phone}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={[styles.detailLabel, dynamicStyles.text]}>Address</Text>
                <Text style={[styles.detailValue, dynamicStyles.text]}>{selectedEmployee.address}</Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showAddEdit}
      >
        <SafeAreaView style={[styles.modalContainer, dynamicStyles.modalBackground]}>
          <View style={[styles.modalHeader, { borderBottomColor: settings.darkMode ? '#444444' : '#595959' }]}>
            <TouchableOpacity onPress={() => setShowAddEdit(false)}>
              <Text style={[styles.modalCloseText, dynamicStyles.text]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>
              {editingEmployee ? 'Edit Staff' : 'Add Staff'}
            </Text>
            <TouchableOpacity onPress={handleSaveEmployee}>
              <Text style={[styles.modalSaveText, dynamicStyles.text]}>Save</Text>
            </TouchableOpacity>
          </View> 

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, dynamicStyles.text]}>First Name *</Text>
              <TextInput
                style={[styles.formInput, dynamicStyles.text, dynamicStyles.cardBackground]}
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                placeholder="Enter first name..."/>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, dynamicStyles.text]}>Last Name *</Text>
              <TextInput
                style={[styles.formInput, dynamicStyles.text, dynamicStyles.cardBackground]}
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                placeholder="Enter last name..."/>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, dynamicStyles.text]}>Phone</Text>
              <TextInput
                style={[styles.formInput, dynamicStyles.text, dynamicStyles.cardBackground]}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter phone number..."
                keyboardType="phone-pad"/>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, dynamicStyles.text]}>Department</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} fadingEdgeLength={0}>
                <View style={styles.departmentPicker}>
                  <TouchableOpacity
                    style={[
                      styles.departmentOption,
                      formData.department == 0 && styles.departmentOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, department: 0 })}>
                    <Text style={[
                      styles.departmentOptionText,
                      formData.department == 0 && styles.departmentOptionTextSelected,
                      !settings.darkMode && dynamicStyles.text
                    ]}>
                      {departments[0]}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.departmentOption,
                      formData.department == 1 && styles.departmentOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, department: 1 })}>
                    <Text style={[
                      styles.departmentOptionText,
                      formData.department == 1 && styles.departmentOptionTextSelected,
                      !settings.darkMode && dynamicStyles.text
                    ]}>
                      {departments[1]}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.departmentOption,
                      formData.department == 2 && styles.departmentOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, department: 2 })}>
                    <Text style={[
                      styles.departmentOptionText,
                      formData.department == 2 && styles.departmentOptionTextSelected,
                      !settings.darkMode && dynamicStyles.text
                    ]}>
                      {departments[2]}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.departmentOption,
                      formData.department == 3 && styles.departmentOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, department: 3 })}>
                    <Text style={[
                      styles.departmentOptionText,
                      formData.department == 3 && styles.departmentOptionTextSelected,
                      !settings.darkMode && dynamicStyles.text
                    ]}>
                      {departments[3]}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.departmentOption,
                      formData.department == 4 && styles.departmentOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, department: 4 })}>
                    <Text style={[
                      styles.departmentOptionText,
                      formData.department == 4 && styles.departmentOptionTextSelected,
                      !settings.darkMode && dynamicStyles.text
                    ]}>
                      {departments[4]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, dynamicStyles.text]}>Address</Text>
              <TextInput
                style={[styles.formInput, styles.formTextArea, dynamicStyles.text, dynamicStyles.cardBackground]}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                placeholder="Enter address"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>


      <Modal
        visible={showSettings}>
        <SafeAreaView style={[styles.modalContainer, dynamicStyles.modalBackground]}>
          <View style={[styles.modalHeader, { borderBottomColor: settings.darkMode ? '#444444' : '#595959' }]}>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Text style={[styles.modalCloseText, dynamicStyles.text]}>Close</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>Settings</Text>
            <View style={styles.placeholder}></View>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.settingsGroup}>
              <Text style={[styles.settingsLabel, dynamicStyles.text]}>Font Size</Text>
              <View style={styles.sliderContainer}>
                <Text style={[styles.sliderValue, dynamicStyles.text]}>Small</Text>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${((settings.fontSize - 12) / (24 - 12)) * 100}%` }]} />
                  <TouchableOpacity
                    style={[styles.sliderThumb, { left: `${((settings.fontSize - 12) / (24 - 12)) * 100}%` }]}
                    onPressIn={() => { }}
                  />
                </View>
                <Text style={[styles.sliderValue, dynamicStyles.text]}>Large</Text>
              </View>
              <View style={styles.fontSizeButtons}>
                <TouchableOpacity
                  style={[styles.sizeButton, dynamicStyles.headerBackground]}
                  onPress={() => handleFontSizeChange(Math.max(12, settings.fontSize - 1))}>
                  <Text style={[styles.sizeButtonText]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.currentValue, dynamicStyles.text]}>Current: {Math.round(settings.fontSize)}px</Text>
                <TouchableOpacity
                  style={[styles.sizeButton, dynamicStyles.headerBackground]}
                  onPress={() => handleFontSizeChange(Math.min(24, settings.fontSize + 1))}>
                  <Text style={[styles.sizeButtonText]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingsGroup}>
              <Text style={[styles.settingsLabel, dynamicStyles.text]}>Dark Mode</Text>
              <TouchableOpacity
                style={[styles.toggleButton, settings.darkMode && styles.toggleButtonActive]}
                onPress={handleDarkModeToggle}>
                <View style={[styles.toggleSwitch, settings.darkMode && styles.toggleSwitchActive]}>
                  <Text style={[styles.toggleText, settings.darkMode && styles.toggleTextActive]}>
                    {settings.darkMode ? 'ON' : 'OFF'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#941a1d",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 55,
  },
  welcomeText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  directoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#595959',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingsButton: {
    backgroundColor: "#595959",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  settingsButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  directoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#941a1d",
  },
  addButton: {
    backgroundColor: "#941a1d",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: 'bold',
    fontSize: 14,
  },
  directoryContent: {
    flex: 1,
  },
  staffList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  staffCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: '#595959',
    marginVertical: 5,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#941a1d",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  EmployeeDetails: {
    flex: 1,
  },
  EmployeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#262626",
    marginBottom: 4,
  },
  departmentText: {
    fontSize: 14,
    color: "#595959",
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 14,
    color: "#595959",
  },
  chevron: {
    marginLeft: 10,
  },
  chevronText: {
    fontSize: 20,
    color: "#595959",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#595959',
  },
  modalCloseText: {
    fontSize: 16,
    color: "#941a1d",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#262626",
  },
  modalEditText: {
    fontSize: 16,
    color: "#941a1d",
  },
  modalSaveText: {
    fontSize: 16,
    color: "#941a1d",
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailAvatar: {
    width: 80,
    height: 80,
    backgroundColor: "#941a1d",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  detailAvatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#262626",
    textAlign: 'center',
    marginBottom: 30,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#941a1d",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#262626",
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: "#941a1d",
    paddingVertical: 12,
    marginTop: 30,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#941a1d",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#595959',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#262626",
  },
  formTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  departmentPicker: {
    flexDirection: 'row',
    gap: 10,
  },
  departmentOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#595959',
    backgroundColor: "#ffffff",
  },
  departmentOptionSelected: {
    backgroundColor: "#941a1d",
    borderColor: "#941a1d",
  },
  departmentOptionText: {
    fontSize: 14,
    color: "#262626",
  },
  departmentOptionTextSelected: {
    color: "#ffffff",
  },
  placeholder: {
    width: 40,
  },
  settingsGroup: {
    marginBottom: 30,
  },
  settingsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#941a1d",
    marginBottom: 15,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#595959',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#941a1d',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -7,
    width: 20,
    height: 20,
    backgroundColor: '#941a1d',
    borderRadius: 10,
    marginLeft: -10,
  },
  fontSizeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
  },
  sizeButton: {
    backgroundColor: '#941a1d',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderValue: {
    fontSize: 14,
    color: "#595959",
    minWidth: 40,
    textAlign: 'center',
  },
  currentValue: {
    fontSize: 14,
    color: "#262626",
    textAlign: 'center',
    flex: 1,
  },
  toggleButton: {
    width: 100,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  toggleButtonActive: {
    backgroundColor: '#941a1d',
  },
  toggleSwitch: {
    width: 90,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#ffffff',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#595959',
  },
  toggleTextActive: {
    color: '#941a1d',
  },
});