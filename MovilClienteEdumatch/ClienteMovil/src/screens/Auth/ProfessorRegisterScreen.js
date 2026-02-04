import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity, // 👈 ASEGÚRATE QUE ESTÉ IMPORTADO
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
import styles from './ProfessorRegisterScreen.styles';

const ProfessorRegisterScreen = ({ navigation }) => {
  const { registerProfessor } = useAuth();
  
  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: new Date(1990, 0, 1),
    gender: '',
    address: '',
    bio: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ CORREGIDO: Valores compatibles con el backend
  const genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Otro', value: 'other' },
    { label: 'Prefiero no decir', value: 'prefer_not_to_say' }, // 👈 CAMBIADO
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    // ✅ Validación: mínimo 8 caracteres
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.gender) {
      newErrors.gender = 'El género es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    const today = new Date();
    const age = today.getFullYear() - formData.birthDate.getFullYear();
    if (age < 18) {
      newErrors.birthDate = 'Debes tener al menos 18 años para ser profesor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    console.log('📝 Validando formulario Step 1...');
    
    if (!validateForm()) {
      Alert.alert(
        'Formulario incompleto',
        'Por favor completa todos los campos requeridos correctamente'
      );
      return;
    }

    console.log('✅ Formulario Step 1 válido, navegando a Step 2');

    // Preparar datos para pasar al siguiente paso
    const step1Data = {
      profileImage: formData.profileImage,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      birthDate: formData.birthDate.toISOString().split('T')[0],
      gender: formData.gender,
      address: formData.address.trim(),
      bio: formData.bio.trim() || '',
    };

    navigation.navigate('ProfessorStep2', { step1Data });
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Registro de Profesor</Text>
          <Text style={styles.subtitle}>Paso 1 de 5: Información Personal</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: '20%' }]} />
          </View>
        </View>

        {/* Foto de perfil */}
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
                placeholder="Ej: María"
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
                placeholder="Ej: García"
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

          {/* Biografía */}
          <TextArea
            label="Biografía (Opcional)"
            placeholder="Cuéntanos sobre ti, tu experiencia y por qué quieres enseñar..."
            value={formData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            maxLength={1000}
            numberOfLines={4}
            error={errors.bio}
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
              title="CONTINUAR"
              onPress={handleContinue}
              style={styles.continueButton}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfessorRegisterScreen;