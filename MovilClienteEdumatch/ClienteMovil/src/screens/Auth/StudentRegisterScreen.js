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
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import TextArea from '../../components/common/TextArea/TextArea';
import FileUpload from '../../components/common/FileUpload/FileUpload';
import styles from './StudentRegisterScreen.styles';

const StudentRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: new Date(),
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
    { label: 'Prefiero no decir', value: 'not_say' },
  ];

  const educationLevelOptions = [
    { label: 'Primaria', value: 'primary' },
    { label: 'Secundaria', value: 'secondary' },
    { label: 'Preparatoria', value: 'high_school' },
    { label: 'Universidad', value: 'university' },
    { label: 'Posgrado', value: 'postgraduate' },
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
    if (!formData.educationLevel) newErrors.educationLevel = 'El nivel educativo es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Registro de estudiante:', formData);
      // TODO: Implementar llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
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

        {/* Foto de perfil */}
        <FileUpload
          label="Foto de Perfil"
          image={formData.profileImage}
          onImageSelect={(image) => handleInputChange('profileImage', image)}
          error={errors.profileImage}
        />

        {/* Formulario */}
        <View style={styles.form}>
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
                label="Correo Electrónico"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                required
                error={errors.email}
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
              />
            </View>
          </View>

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
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>
                Fecha de Nacimiento <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={[styles.dateButton, errors.birthDate && styles.dateButtonError]}
                onPress={() => setShowDatePicker(true)}
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
              />
            </View>
          </View>

          <Select
            label="Nivel Educativo"
            placeholder="Selecciona tu nivel educativo"
            value={formData.educationLevel}
            onValueChange={(value) => handleInputChange('educationLevel', value)}
            options={educationLevelOptions}
            required
            error={errors.educationLevel}
          />

          <Input
            label="Dirección"
            placeholder="Calle, ciudad, país"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            error={errors.address}
          />

          <TextArea
            label="Cuéntanos sobre ti"
            placeholder="Tus intereses, hobbies, objetivos de aprendizaje..."
            value={formData.aboutMe}
            onChangeText={(value) => handleInputChange('aboutMe', value)}
            maxLength={500}
            numberOfLines={4}
            error={errors.aboutMe}
          />

          <TextArea
            label="Objetivos de Aprendizaje"
            placeholder="¿Qué te gustaría aprender? ¿Cuáles son tus metas académicas?"
            value={formData.learningGoals}
            onChangeText={(value) => handleInputChange('learningGoals', value)}
            maxLength={500}
            numberOfLines={4}
            error={errors.learningGoals}
          />

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <Button
              title="CANCELAR"
              onPress={handleCancel}
              variant="secondary"
              style={styles.cancelButton}
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