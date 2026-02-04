import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// AUTH SCREENS
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import StudentRegisterScreen from '../screens/Auth/StudentRegisterScreen';
import ProfessorRegisterScreen from '../screens/Auth/ProfessorRegisterScreen';

// STUDENT SCREENS
import HomeScreen from '../screens/Student/HomeScreen';
import ProfileScreen from '../screens/Student/ProfileScreen';
import TeacherProfileScreen from '../screens/Student/TeacherProfileScreen';
import ScheduleClassScreen from '../screens/Student/ScheduleClassScreen';
import CheckoutScreen from '../screens/Student/CheckoutScreen';

// PROFESSOR SCREENS
import ProfessorProfileScreen from '../screens/Professor/ProfessorProfileScreen';
import AvailabilityScreen from '../screens/Professor/AvailabilityScreen';
import MyClassesScreen from '../screens/Professor/MyClassesScreen';
import MyCoursesScreen from '../screens/Professor/MyCoursesScreen';
import DocumentsScreen from '../screens/Professor/DocumentsScreen';
import ReviewsScreen from '../screens/Professor/ReviewsScreen';
import TeachingHistoryScreen from '../screens/Professor/TeachingHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BCD4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const ProfessorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ProfessorProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'MyClasses') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Availability') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Reviews') {
            iconName = focused ? 'star' : 'star-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="ProfessorProfile" component={ProfessorProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
      <Tab.Screen name="MyClasses" component={MyClassesScreen} options={{ tabBarLabel: 'Clases' }} />
      <Tab.Screen name="Availability" component={AvailabilityScreen} options={{ tabBarLabel: 'Horario' }} />
      <Tab.Screen name="Reviews" component={ReviewsScreen} options={{ tabBarLabel: 'Reseñas' }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="StudentRegister" component={StudentRegisterScreen} />
          <Stack.Screen name="ProfessorRegister" component={ProfessorRegisterScreen} />
        </>
      ) : user?.role === 'student' ? (
        <>
          <Stack.Screen name="StudentTabs" component={StudentTabNavigator} />
          <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
          <Stack.Screen name="ScheduleClass" component={ScheduleClassScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </>
      ) : user?.role === 'professor' ? (
        <>
          <Stack.Screen name="ProfessorTabs" component={ProfessorTabNavigator} />
          <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
          <Stack.Screen name="Documents" component={DocumentsScreen} />
          <Stack.Screen name="TeachingHistory" component={TeachingHistoryScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default AppNavigator;