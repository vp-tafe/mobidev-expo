import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useState } from "react";
import { Image } from 'react-native';


const staffMembers = [
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
  }
];

const departments = {
  0: "General",
  1: "Information Communications Technology",
  2: "Finance",
  3: "Marketing",
  4: "Human Resources"
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#B91C1C" />

      { }
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
                  <Image
                  style={styles.img}
                  source={require('./assets/logo.png')}
                />
          </View>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
      </View>

      { }
      <View style={styles.content}>

        <View style={styles.directoryContent}>
          <ScrollView style={styles.staffList}>
            {staffMembers.map(function (member) {
              <View key={member.id} style={styles.staffCard}>
                <View style={styles.staffInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{member.initials}</Text>
                  </View>
                  <View style={styles.memberDetails}>
                    <Text style={styles.memberName}>{member.firstName} {member.lastName}</Text>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactText}>{member.phone}</Text>
                      <Text style={styles.contactText}>{departments[member.department]}</Text>
                      <Text style={styles.contactText}>{member.address}</Text>
                    </View>
                  </View>
                </View>
              </View>
            })}
          </ScrollView>
        </View>
      </View>
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
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  welcomeText: {
    fontSize: 20,
  },
  img: {
    width: 500,
    height: 250,
  }
});
