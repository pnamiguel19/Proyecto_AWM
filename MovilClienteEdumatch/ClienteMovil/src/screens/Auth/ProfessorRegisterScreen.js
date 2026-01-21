import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import TextArea from '../../components/common/TextArea/TextArea';
import FileUpload from '../../components/common/FileUpload/FileUpload';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorRegisterScreen.styles';

const ProfessorRegisterScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información Personal
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    address: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { label: 'Información Personal', icon: '👤' },
    { label: 'Formación', icon: '🎓' },
    { label: 'Clases', icon: '📚' },
    { label: 'Horario', icon: '📅' },
    { label: 'Confirmación', icon: '✓' },
  ];

  const genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Otro', value: 'other' },
    { label: 'Prefiero no decir', value: 'not_say' },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName) newErrors.lastName = 'El apellido es requerido';
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.gender) newErrors.gender = 'El género es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep1()) return;
    
    // Navegar al paso 2 con los datos del paso 1
    navigation.navigate('ProfessorStep2', { formData });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderStep1 = () => (
    <View style={styles.form}>
      {/* Sección: Foto de Perfil */}
      <View style={styles.photoSection}>
        <Text style={styles.photoTitle}>📸 Foto de Perfil</Text>
        <FileUpload
          image={formData.profileImage}
          onImageSelect={(image) => handleInputChange('profileImage', image)}
          error={errors.profileImage}
        />
      </View>

      {/* Sección: Datos Personales */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleIcon}>👤</Text>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Información básica para tu perfil
        </Text>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Nombre"
              placeholder="Ej: Juan"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              required
              error={errors.firstName}
            />
          </View>
          <View style={styles.halfWidth}>
            <Input
              label="Apellido"
              placeholder="Ej: Pérez"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              required
              error={errors.lastName}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Fecha de Nacimiento"
              placeholder="dd/mm/aaaa"
              value={formData.birthDate}
              onChangeText={(value) => handleInputChange('birthDate', value)}
              required
              error={errors.birthDate}
            />
          </View>
          <View style={styles.halfWidth}>
            <Select
              label="Género"
              placeholder="Selecciona"
              value={formData.gender}
              onValueChange={(value) => handleInputChange('gender', value)}
              options={genderOptions}
              required
              error={errors.gender}
            />
          </View>
        </View>
      </View>

      {/* Sección: Contacto */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleIcon}>📧</Text>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Datos para que los estudiantes puedan comunicarse contigo
        </Text>

        <Input
          label="Correo Electrónico"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          required
          error={errors.email}
        />

        <Input
          label="Teléfono"
          placeholder="+593 99 123 4567"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
          required
          error={errors.phone}
        />

        <Input
          label="Dirección"
          placeholder="Calle, número, ciudad, país"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
          error={errors.address}
        />
      </View>

      {/* Sección: Seguridad */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleIcon}>🔒</Text>
          <Text style={styles.sectionTitle}>Seguridad</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Crea una contraseña segura para tu cuenta
        </Text>

        <Input
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
          showPasswordToggle
          required
          error={errors.password}
        />

        <Input
          label="Confirmar Contraseña"
          placeholder="Repite tu contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry
          showPasswordToggle
          required
          error={errors.confirmPassword}
        />
      </View>

      {/* Sección: Sobre Ti */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleIcon}>✍️</Text>
          <Text style={styles.sectionTitle}>Sobre Ti</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Comparte tu experiencia y pasión por la enseñanza
        </Text>

        <TextArea
          label="Biografía"
          placeholder="Cuéntanos sobre tu experiencia, tus pasiones por la enseñanza y qué te hace un gran profesor..."
          value={formData.bio}
          onChangeText={(value) => handleInputChange('bio', value)}
          maxLength={500}
          numberOfLines={5}
          error={errors.bio}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🎓</Text>
          <Text style={styles.logoText}>EduMatch</Text>
        </View>
        <Text style={styles.headerTitle}>Únete como Profesor</Text>
        <Text style={styles.headerSubtitle}>
          Comparte tu conocimiento y ayuda a estudiantes a alcanzar sus metas
        </Text>
      </View>

      {/* Stepper - Solo muestra el paso actual */}
      <Stepper steps={steps} currentStep={currentStep} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && (
          <View style={styles.form}>
            <Text style={{ textAlign: 'center', padding: 40 }}>
              Paso 2 - Formación (Próximamente)
            </Text>
          </View>
        )}
        {currentStep === 3 && (
          <View style={styles.form}>
            <Text style={{ textAlign: 'center', padding: 40 }}>
              Paso 3 - Clases (Próximamente)
            </Text>
          </View>
        )}
        {currentStep === 4 && (
          <View style={styles.form}>
            <Text style={{ textAlign: 'center', padding: 40 }}>
              Paso 4 - Horario (Próximamente)
            </Text>
          </View>
        )}
        {currentStep === 5 && (
          <View style={styles.form}>
            <Text style={{ textAlign: 'center', padding: 40 }}>
              Paso 5 - Confirmación (Próximamente)
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Botones fijos en la parte inferior */}
      <View style={styles.buttonContainer}>
        <Button
          title="CANCELAR"
          onPress={handleCancel}
          variant="secondary"
          style={styles.cancelButton}
        />
        <Button
          title={currentStep === 5 ? 'FINALIZAR' : 'SIGUIENTE →'}
          onPress={handleNext}
          loading={loading}
          style={styles.nextButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfessorRegisterScreen;