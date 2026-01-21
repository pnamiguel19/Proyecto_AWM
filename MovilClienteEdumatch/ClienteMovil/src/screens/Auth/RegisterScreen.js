import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/common/Button/Button';
import styles from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('professor'); // 'student' o 'professor'

  const handleContinue = () => {
    console.log('Continuar con rol:', selectedRole);
    if (selectedRole === 'student') {
      navigation.navigate('StudentRegister');
    } else {
      navigation.navigate('ProfessorRegister');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Título */}
        <Text style={styles.title}>Únete a EduMatch</Text>
        <Text style={styles.subtitle}>
          Selecciona cómo deseas formar parte de nuestra comunidad educativa
        </Text>

        {/* Opciones de rol */}
        <View style={styles.rolesContainer}>
          {/* Opción Estudiante */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'student' && styles.roleCardSelected,
            ]}
            onPress={() => setSelectedRole('student')}
            activeOpacity={0.8}
          >
            {selectedRole === 'student' && (
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📚</Text>
            </View>
            <Text style={styles.roleTitle}>Estudiante</Text>
            <Text style={styles.roleDescription}>
              Encuentra profesores expertos que te ayudarán a alcanzar tus metas académicas
            </Text>
          </TouchableOpacity>

          {/* Opción Profesor */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'professor' && styles.roleCardSelected,
            ]}
            onPress={() => setSelectedRole('professor')}
            activeOpacity={0.8}
          >
            {selectedRole === 'professor' && (
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>👨‍🏫</Text>
            </View>
            <Text style={styles.roleTitle}>Profesor</Text>
            <Text style={styles.roleDescription}>
              Comparte tu conocimiento y ayuda a estudiantes a crecer académicamente
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón Continuar */}
        <Button
          title="CONTINUAR"
          onPress={handleContinue}
          style={styles.continueButton}
        />

        {/* Link de inicio de sesión */}
        <View style={styles.loginLink}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;