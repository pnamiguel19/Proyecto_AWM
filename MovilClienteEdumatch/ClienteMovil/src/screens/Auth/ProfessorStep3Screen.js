import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep3Screen.styles';

const ProfessorStep3Screen = ({ navigation, route }) => {
  const { formData: previousData } = route.params || {};

  const [formData, setFormData] = useState({
    subjects: [],
    educationLevels: [],
    teachingModalities: [],
    hourlyRate: '',
    currency: 'USD',
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

  const subjects = [
    { id: 'math', name: 'Matemáticas', icon: '🔢', color: '#3B82F6' },
    { id: 'physics', name: 'Física', icon: '⚛️', color: '#8B5CF6' },
    { id: 'chemistry', name: 'Química', icon: '🧪', color: '#10B981' },
    { id: 'biology', name: 'Biología', icon: '🧬', color: '#EF4444' },
    { id: 'literature', name: 'Lengua y Literatura', icon: '📚', color: '#F59E0B' },
    { id: 'english', name: 'Inglés', icon: 'GB', color: '#06B6D4' },
    { id: 'history', name: 'Historia', icon: '📜', color: '#D97706' },
    { id: 'geography', name: 'Geografía', icon: '🌍', color: '#059669' },
    { id: 'computing', name: 'Informática', icon: '💻', color: '#6366F1' },
    { id: 'art', name: 'Arte', icon: '🎨', color: '#EC4899' },
    { id: 'music', name: 'Música', icon: '🎵', color: '#8B5CF6' },
    { id: 'physical_education', name: 'Educación Física', icon: '⚽', color: '#10B981' },
  ];

  const educationLevels = [
    { id: 'primary', name: 'Primaria', subtitle: '1° a 6° grado', icon: '🎒' },
    { id: 'secondary', name: 'Secundaria', subtitle: '7° a 10° grado', icon: '📖' },
    { id: 'high_school', name: 'Bachillerato', subtitle: '1° a 3° año', icon: '🎓' },
    { id: 'university', name: 'Universidad', subtitle: 'Nivel superior', icon: '🏛️' },
    { id: 'adult', name: 'Adultos', subtitle: 'Educación continua', icon: '👨‍🎓' },
  ];

  const teachingModalities = [
    {
      id: 'in_person',
      name: 'Presencial',
      subtitle: 'En un lugar físico',
      icon: '🏫',
    },
    {
      id: 'online',
      name: 'En Línea',
      subtitle: 'Clases virtuales',
      icon: '💻',
    },
    {
      id: 'hybrid',
      name: 'Híbrido',
      subtitle: 'Combinación de ambas',
      icon: '🔄',
    },
  ];

  const currencyOptions = [
    { label: 'USD - Dólar', value: 'USD' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'MXN - Peso Mexicano', value: 'MXN' },
    { label: 'COP - Peso Colombiano', value: 'COP' },
    { label: 'ARS - Peso Argentino', value: 'ARS' },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const toggleSelection = (field, itemId) => {
    const currentSelection = formData[field];
    const isSelected = currentSelection.includes(itemId);

    if (isSelected) {
      handleInputChange(
        field,
        currentSelection.filter((id) => id !== itemId)
      );
    } else {
      handleInputChange(field, [...currentSelection, itemId]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Debes seleccionar al menos una materia';
    }

    if (formData.educationLevels.length === 0) {
      newErrors.educationLevels = 'Debes seleccionar al menos un nivel educativo';
    }

    if (formData.teachingModalities.length === 0) {
      newErrors.teachingModalities =
        'Debes seleccionar al menos una modalidad de enseñanza';
    }

    if (!formData.hourlyRate) {
      newErrors.hourlyRate = 'El precio por hora es requerido';
    } else {
      const rate = parseFloat(formData.hourlyRate);
      if (isNaN(rate) || rate <= 0) {
        newErrors.hourlyRate = 'Ingresa un precio válido';
      } else if (rate > 1000) {
        newErrors.hourlyRate = 'El precio no puede exceder 1000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos obligatorios antes de continuar.'
      );
      return;
    }

    const allFormData = {
      ...previousData,
      ...formData,
    };

    console.log('Datos completos hasta paso 3:', allFormData);
    // Navegar al paso 4
    navigation.navigate('ProfessorStep4', { formData: allFormData });
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  const getSelectionSummary = () => {
    return {
      subjects: formData.subjects.length,
      levels: formData.educationLevels.length,
      modalities: formData.teachingModalities.length,
    };
  };

  const summary = getSelectionSummary();

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

      {/* Stepper */}
      <Stepper steps={steps} currentStep={3} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Título principal */}
          <View style={styles.section}>
            <Text style={styles.mainTitle}>📚 Materias y Modalidades</Text>
            <Text style={styles.mainSubtitle}>
              Selecciona las materias que enseñas y los niveles educativos
            </Text>
          </View>

          {/* Sección: Materias que Enseñas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>📖</Text>
              Materias que Enseñas <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.sectionSubtitle}>
              Selecciona todas las materias que puedes enseñar
            </Text>

            <View style={styles.grid}>
              {subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  style={[
                    styles.card,
                    formData.subjects.includes(subject.id) && styles.cardSelected,
                  ]}
                  onPress={() => toggleSelection('subjects', subject.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.cardIcon}>{subject.icon}</Text>
                    <Text
                      style={[
                        styles.cardText,
                        formData.subjects.includes(subject.id) &&
                          styles.cardTextSelected,
                      ]}
                    >
                      {subject.name}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      formData.subjects.includes(subject.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {formData.subjects.includes(subject.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {errors.subjects && (
              <Text style={styles.errorText}>{errors.subjects}</Text>
            )}
          </View>

          {/* Sección: Niveles Educativos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>🎓</Text>
              Niveles Educativos <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.sectionSubtitle}>
              ¿A qué niveles educativos puedes enseñar?
            </Text>

            <View style={styles.levelGrid}>
              {educationLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelCard,
                    formData.educationLevels.includes(level.id) &&
                      styles.levelCardSelected,
                  ]}
                  onPress={() => toggleSelection('educationLevels', level.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.levelIcon}>{level.icon}</Text>
                  <View style={styles.levelInfo}>
                    <Text
                      style={[
                        styles.levelName,
                        formData.educationLevels.includes(level.id) &&
                          styles.levelNameSelected,
                      ]}
                    >
                      {level.name}
                    </Text>
                    <Text style={styles.levelSubtitle}>{level.subtitle}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      formData.educationLevels.includes(level.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {formData.educationLevels.includes(level.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {errors.educationLevels && (
              <Text style={styles.errorText}>{errors.educationLevels}</Text>
            )}
          </View>

          {/* Sección: Modalidades de Enseñanza */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>🌐</Text>
              Modalidades de Enseñanza <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.sectionSubtitle}>
              ¿Cómo prefieres impartir tus clases?
            </Text>

            <View style={styles.modalityGrid}>
              {teachingModalities.map((modality) => (
                <TouchableOpacity
                  key={modality.id}
                  style={[
                    styles.modalityCard,
                    formData.teachingModalities.includes(modality.id) &&
                      styles.modalityCardSelected,
                  ]}
                  onPress={() => toggleSelection('teachingModalities', modality.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalityIcon}>{modality.icon}</Text>
                  <Text
                    style={[
                      styles.modalityName,
                      formData.teachingModalities.includes(modality.id) &&
                        styles.modalityNameSelected,
                    ]}
                  >
                    {modality.name}
                  </Text>
                  <Text style={styles.modalitySubtitle}>{modality.subtitle}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      formData.teachingModalities.includes(modality.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {formData.teachingModalities.includes(modality.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {errors.teachingModalities && (
              <Text style={styles.errorText}>{errors.teachingModalities}</Text>
            )}
          </View>

          {/* Sección: Tarifa por Hora */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>💰</Text>
              Tarifa por Hora
            </Text>

            <View style={styles.row}>
              <View style={styles.rateInput}>
                <Input
                  label="Precio por Hora (USD)"
                  placeholder="15"
                  value={formData.hourlyRate}
                  onChangeText={(value) => handleInputChange('hourlyRate', value)}
                  keyboardType="decimal-pad"
                  required
                  error={errors.hourlyRate}
                />
                <Text style={styles.rateHint}>
                  Establece tu tarifa por hora de clase
                </Text>
              </View>
              <View style={styles.currencySelect}>
                <Select
                  label="Moneda"
                  placeholder="USD"
                  value={formData.currency}
                  onValueChange={(value) => handleInputChange('currency', value)}
                  options={currencyOptions}
                  required
                  error={errors.currency}
                />
              </View>
            </View>
          </View>

          {/* Resumen de tu Selección */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>
              <Text style={styles.summaryIcon}>📊</Text>
              Resumen de tu Selección
            </Text>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Materias seleccionadas:</Text>
                <Text style={styles.summaryValue}>
                  {summary.subjects} materia{summary.subjects !== 1 ? 's' : ''}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Niveles educativos:</Text>
                <Text style={styles.summaryValue}>
                  {summary.levels} nivel{summary.levels !== 1 ? 'es' : ''}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Modalidades:</Text>
                <Text style={styles.summaryValue}>
                  {summary.modalities} modalidad
                  {summary.modalities !== 1 ? 'es' : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botones fijos en la parte inferior */}
      <View style={styles.buttonContainer}>
        <Button
          title="← ANTERIOR"
          onPress={handlePrevious}
          variant="secondary"
          style={styles.cancelButton}
        />
        <Button
          title="SIGUIENTE →"
          onPress={handleNext}
          loading={loading}
          style={styles.nextButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfessorStep3Screen;