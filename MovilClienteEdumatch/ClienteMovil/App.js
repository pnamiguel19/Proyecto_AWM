import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import StudentRegisterScreen from './src/screens/Auth/StudentRegisterScreen';
import ProfessorRegisterScreen from './src/screens/Auth/ProfessorRegisterScreen';
import ProfessorStep2Screen from './src/screens/Auth/ProfessorStep2Screen';
import ProfessorStep3Screen from './src/screens/Auth/ProfessorStep3Screen';
import ProfessorStep4Screen from './src/screens/Auth/ProfessorStep4Screen';
import ProfessorStep5Screen from './src/screens/Auth/ProfessorStep5Screen';
import HomeScreen from './src/screens/Student/HomeScreen';
import ProfileScreen from './src/screens/Student/ProfileScreen';
import TeacherProfileScreen from './src/screens/Student/TeacherProfileScreen';
import ScheduleClassScreen from './src/screens/Student/ScheduleClassScreen';
import CheckoutScreen from './src/screens/Student/CheckoutScreen';
import ProfessorProfileScreen from './src/screens/Professor/ProfessorProfileScreen';
import MyClassesScreen from './src/screens/Professor/MyClassesScreen';
import MyCoursesScreen from './src/screens/Professor/MyCoursesScreen';
import TeachingHistoryScreen from './src/screens/Professor/TeachingHistoryScreen';
import AvailabilityScreen from './src/screens/Professor/AvailabilityScreen';
import DocumentsScreen from './src/screens/Professor/DocumentsScreen';
import ReviewsScreen from './src/screens/Professor/ReviewsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [routeParams, setRouteParams] = useState({});

  const navigation = {
    navigate: (screen, params) => {
      console.log('Navigate to:', screen, params);
      setCurrentScreen(screen);
      setRouteParams(params || {});
    },
    goBack: () => {
      if (currentScreen === 'StudentRegister' || currentScreen === 'ProfessorRegister') {
        setCurrentScreen('Register');
      } else if (currentScreen === 'ProfessorStep2') {
        setCurrentScreen('ProfessorRegister');
      } else if (currentScreen === 'ProfessorStep3') {
        setCurrentScreen('ProfessorStep2');
      } else if (currentScreen === 'ProfessorStep4') {
        setCurrentScreen('ProfessorStep3');
      } else if (currentScreen === 'ProfessorStep5') {
        setCurrentScreen('ProfessorStep4');
      } else if (currentScreen === 'StudentProfile') {
        setCurrentScreen('StudentHome');
      } else if (currentScreen === 'TeacherProfile') {
        setCurrentScreen('StudentHome');
      } else if (currentScreen === 'ScheduleClass') {
        setCurrentScreen('TeacherProfile');
      } else if (currentScreen === 'Checkout') {
        setCurrentScreen('ScheduleClass');
      } else if (currentScreen === 'MyClasses') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'MyCourses') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'TeachingHistory') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'Availability') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'Documents') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'Reviews') {
        setCurrentScreen('ProfessorProfile');
      } else if (currentScreen === 'ProfessorProfile') {
        setCurrentScreen('Login');
      } else if (currentScreen === 'StudentHome') {
        setCurrentScreen('Login');
      } else {
        setCurrentScreen('Login');
      }
      setRouteParams({});
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginScreen navigation={navigation} />;
      case 'Register':
        return <RegisterScreen navigation={navigation} />;
      case 'StudentRegister':
        return <StudentRegisterScreen navigation={navigation} />;
      case 'ProfessorRegister':
        return <ProfessorRegisterScreen navigation={navigation} />;
      case 'ProfessorStep2':
        return <ProfessorStep2Screen navigation={navigation} route={{ params: routeParams }} />;
      case 'ProfessorStep3':
        return <ProfessorStep3Screen navigation={navigation} route={{ params: routeParams }} />;
      case 'ProfessorStep4':
        return <ProfessorStep4Screen navigation={navigation} route={{ params: routeParams }} />;
      case 'ProfessorStep5':
        return <ProfessorStep5Screen navigation={navigation} route={{ params: routeParams }} />;
      case 'StudentHome':
        return <HomeScreen navigation={navigation} />;
      case 'StudentProfile':
        return <ProfileScreen navigation={navigation} />;
      case 'TeacherProfile':
        return <TeacherProfileScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'ScheduleClass':
        return <ScheduleClassScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'Checkout':
        return <CheckoutScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'ProfessorProfile':
        return <ProfessorProfileScreen navigation={navigation} />;
      case 'MyClasses':
        return <MyClassesScreen navigation={navigation} />;
      case 'MyCourses':
        return <MyCoursesScreen navigation={navigation} />;
      case 'TeachingHistory':
        return <TeachingHistoryScreen navigation={navigation} />;
      case 'Availability':
        return <AvailabilityScreen navigation={navigation} />;
      case 'Documents':
        return <DocumentsScreen navigation={navigation} />;
      case 'Reviews':
        return <ReviewsScreen navigation={navigation} />;
      default:
        return <LoginScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
