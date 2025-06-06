//I'm not going to add my details into here as my github repo is public. I will however add it to everything else so it should be fine.

//Imports go here:
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useState } from "react";
import { Image } from 'react-native';
//Adding staff for directory:
const Staff = [
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
  const [staffEmployees, setStaffEmployees] = useState(Staff);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    department: 0,
    address: ''
  });

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
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
//This saves the edited and new employees
  const handleSaveEmployee = () => {
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
      setStaffEmployees(newStaffEmployees);
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
      setStaffEmployees(updatedStaffEmployees);
    }
    setShowAddEdit(false);
  };


//Below this line is the visual side of the code.


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#941a1d" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./assets/logo.png')}/>
          </View>
          <Text style={styles.welcomeText}>Welcome to the staff directory!</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.directoryHeader}>
          <Text style={styles.directoryTitle}>Current Employees:</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
            <Text style={styles.addButtonText}>+ Add Staff</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.directoryContent}>
          <ScrollView style={styles.staffList} showsVerticalScrollIndicator={false}>{staffEmployees.map((Employee) => (
              <TouchableOpacity key={Employee.id} style={styles.staffCard} onPress={() => handleEmployeePress(Employee)}>
                <View style={styles.staffInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{Employee.initials}</Text>
                  </View>
                  <View style={styles.EmployeeDetails}>
                    <Text style={styles.EmployeeName}>{Employee.firstName} {Employee.lastName}
                    </Text>
                    <Text style={styles.departmentText}>{departments[Employee.department]}
                    </Text>
                    <Text style={styles.phoneText}>{Employee.phone}</Text>
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

      <Modal visible={showDetails}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowDetails(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Staff Details</Text>
            <TouchableOpacity onPress={() => handleEditEmployee(selectedEmployee)}>
            <Text style={styles.modalEditText}>Edit</Text>
            </TouchableOpacity>
          </View>{selectedEmployee && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.detailAvatar}>
                <Text style={styles.detailAvatarText}>{selectedEmployee.initials}</Text>
              </View>
              
              <Text style={styles.detailName}>{selectedEmployee.firstName} {selectedEmployee.lastName}
              </Text>
              
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Department</Text>
                <Text style={styles.detailValue}>{departments[selectedEmployee.department]}</Text>
              </View>
              
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{selectedEmployee.phone}</Text>
              </View>
              
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{selectedEmployee.address}</Text>
              </View>
              
              <TouchableOpacity style={styles.editButton} onPress={() => handleDeleteEmployee(selectedEmployee)}>
                <Text style={styles.editButtonText}>Edit Contact Details</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      <Modal visible={showAddEdit}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddEdit(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingEmployee ? 'Edit Staff' : 'Add Staff'}
            </Text>
            <TouchableOpacity onPress={handleSaveEmployee}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>First Name *</Text>
              <TextInput style={styles.formInput} value={formData.firstName} onChangeText={(text) => setFormData({...formData, firstName: text})} namestuffidk="Enter first name..."/>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Last Name *</Text>
              <TextInput style={styles.formInput} value={formData.lastName} onChangeText={(text) => setFormData({...formData, lastName: text})} namestuffidk="Enter last name..."/>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Phone</Text>
              <TextInput style={styles.formInput} value={formData.phone} onChangeText={(text) => setFormData({...formData, phone: text})} namestuffidk="Enter phone number..." keyboardType="phone-pad"/>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Department</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.departmentPicker}>style={[styles.departmentOption, formData.department == 0 && styles.departmentOptionSelected]} onPress={() => setFormData({...formData, department: 0})}
                    <Text style={[styles.departmentOptionText, formData.department == 0 && styles.departmentOptionTextSelected]}>{departments[0]}
                    </Text> style={[styles.departmentOption, formData.department == 1 && styles.departmentOptionSelected]} onPress={() => setFormData({...formData, department: 1})}                  
                    <Text style={[styles.departmentOptionText, formData.department == 1 && styles.departmentOptionTextSelected]}> {departments[1]}
                    </Text> style={[ styles.departmentOption, formData.department == 2 && styles.departmentOptionSelected]} onPress={() => setFormData({...formData, department: 2})}
                    <Text style={[ styles.departmentOptionText, formData.department == 2 && styles.departmentOptionTextSelected]}> {departments[2]}
                    </Text> style={[ styles.departmentOption, formData.department == 3 && styles.departmentOptionSelected]} onPress={() => setFormData({...formData, department: 3})}
                    <Text style={[ styles.departmentOptionText, formData.department == 3 && styles.departmentOptionTextSelected]}> {departments[3]}
                    </Text> style={[ styles.departmentOption, formData.department == 4 && styles.departmentOptionSelected]} onPress={() => setFormData({...formData, department: 4})}
                    <Text style={[ styles.departmentOptionText, formData.department == 4 && styles.departmentOptionTextSelected]}> {departments[4]}
                    </Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Address</Text>
              <TextInput style={[styles.formInput, styles.formTextArea]} value={formData.address} onChangeText={(text) => setFormData({...formData, address: text})} namestuffidk="Enter address" multiline numberOfLines={3}/>
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
    resizeMode: 'contain',
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
});
;