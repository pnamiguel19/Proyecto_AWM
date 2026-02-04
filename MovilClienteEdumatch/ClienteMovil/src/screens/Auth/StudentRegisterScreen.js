import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import TextArea from '../../components/common/TextArea/TextArea';
import FileUpload from '../../components/common/FileUpload/FileUpload';
import { useAuth } from '../../context/AuthContext';
import styles from './StudentRegisterScreen.styles';

const StudentRegisterScreen = ({ navigation }) => {
  const { registerStudent } = useAuth();
  
  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: new Date(2000, 0, 1),
    gender: '',
    educationLevel: '',
    address: '',
    aboutMe: '',
    learningGoals: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Otro', value: 'other' },
    { label: 'Prefiero no decir', value: 'prefer_not_to_say' },
  ];

  const educationLevels = [
    { label: 'Primaria', value: 'elementary' },
    { label: 'Secundaria', value: 'middle_school' },
    { label: 'Bachillerato', value: 'high_school' },
    { label: 'Universidad', value: 'university' },
    { label: 'Postgrado', value: 'postgraduate' },
    { label: 'Otro', value: 'other' },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, birthDate: selectedDate });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre y apellido
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }
    
    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    // Contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Confirmar contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Género
    if (!formData.gender) {
      newErrors.gender = 'El género es requerido';
    }

    // Nivel educativo
    if (!formData.educationLevel) {
      newErrors.educationLevel = 'El nivel educativo es requerido';
    }

    // Dirección
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    // Fecha de nacimiento (mínimo 10 años)
    const today = new Date();
    const age = today.getFullYear() - formData.birthDate.getFullYear();
    if (age < 10) {
      newErrors.birthDate = 'Debes tener al menos 10 años';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    console.log('📝 Validando formulario...');
    
    if (!validateForm()) {
      Alert.alert(
        'Formulario incompleto',
        'Por favor completa todos los campos requeridos correctamente'
      );
      return;
    }

    setLoading(true);

    try {
      console.log('🚀 Enviando datos al backend...');

      const studentData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        birthDate: formData.birthDate.toISOString().split('T')[0], // YYYY-MM-DD
        gender: formData.gender,
        address: formData.address.trim(),
        educationLevel: formData.educationLevel,
        aboutMe: formData.aboutMe.trim() || '',
        learningGoals: formData.learningGoals.trim() || '',
      };

      console.log('📦 Datos a enviar:', {
        ...studentData,
        password: '***hidden***'
      });

      const response = await registerStudent(studentData);

      console.log('✅ Respuesta del servidor:', response);

      if (response.success) {
        // ✅ Redirigir directo al Login sin Alert
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      console.error('❌ Error en registro:', error);

      let errorMessage = 'No se pudo completar el registro. Por favor intenta nuevamente.';
      
      if (error.message) {
        errorMessage = error.message;
      }

      if (error.errors) {
        const errorFields = Object.keys(error.errors);
        if (errorFields.length > 0) {
          errorMessage = Object.values(error.errors).join('\n');
        }
      }

      if (error.error === 'NETWORK_ERROR') {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet y que el backend esté corriendo.';
      }

      Alert.alert('Error en el Registro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Registro',
      '¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí, cancelar', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text style={styles.title}>Registro de Estudiante</Text>
        <Text style={styles.subtitle}>Únete a nuestra comunidad de aprendizaje</Text>

        {/* Foto de perfil (Opcional) */}
        <FileUpload
          label="Foto de Perfil (Opcional)"
          image={formData.profileImage}
          onImageSelect={(image) => handleInputChange('profileImage', image)}
          error={errors.profileImage}
        />

        {/* Formulario */}
        <View style={styles.form}>
          {/* Nombre y Apellido */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Nombre"
                placeholder="Ej: Juan"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                required
                error={errors.firstName}
                editable={!loading}
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
                editable={!loading}
              />
            </View>
          </View>

          {/* Email y Teléfono */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Correo Electrónico"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                required
                error={errors.email}
                editable={!loading}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Teléfono"
                placeholder="+593 99 123 4567"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                required
                error={errors.phone}
                editable={!loading}
              />
            </View>
          </View>

          {/* Contraseñas */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                showPasswordToggle
                required
                error={errors.password}
                editable={!loading}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Confirmar Contraseña"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                showPasswordToggle
                required
                error={errors.confirmPassword}
                editable={!loading}
              />
            </View>
          </View>

          {/* Fecha de nacimiento y Género */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>
                Fecha de Nacimiento <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={[styles.dateButton, errors.birthDate && styles.dateButtonError]}
                onPress={() => !loading && setShowDatePicker(true)}
                disabled={loading}
              >
                <Text style={styles.dateButtonText}>{formatDate(formData.birthDate)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.birthDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
            </View>
            <View style={styles.halfWidth}>
              <Select
                label="Género"
                placeholder="Selecciona tu género"
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                options={genderOptions}
                required
                error={errors.gender}
                enabled={!loading}
              />
            </View>
          </View>

          {/* Nivel Educativo */}
          <Select
            label="Nivel Educativo"
            placeholder="Selecciona tu nivel educativo"
            value={formData.educationLevel}
            onValueChange={(value) => handleInputChange('educationLevel', value)}
            options={educationLevels}
            required
            error={errors.educationLevel}
            enabled={!loading}
          />

          {/* Dirección */}
          <Input
            label="Dirección"
            placeholder="Calle, ciudad, país"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            required
            error={errors.address}
            editable={!loading}
          />

          {/* Sobre ti */}
          <TextArea
            label="Cuéntanos sobre ti (Opcional)"
            placeholder="Tus intereses, hobbies, pasatiempos..."
            value={formData.aboutMe}
            onChangeText={(value) => handleInputChange('aboutMe', value)}
            maxLength={500}
            numberOfLines={4}
            error={errors.aboutMe}
            editable={!loading}
          />

          {/* Objetivos de aprendizaje */}
          <TextArea
            label="Objetivos de Aprendizaje (Opcional)"
            placeholder="¿Qué te gustaría aprender? ¿Cuáles son tus metas académicas?"
            value={formData.learningGoals}
            onChangeText={(value) => handleInputChange('learningGoals', value)}
            maxLength={500}
            numberOfLines={4}
            error={errors.learningGoals}
            editable={!loading}
          />

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <Button
              title="CANCELAR"
              onPress={handleCancel}
              variant="secondary"
              style={styles.cancelButton}
              disabled={loading}
            />
            <Button
              title="REGISTRARSE"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StudentRegisterScreen;