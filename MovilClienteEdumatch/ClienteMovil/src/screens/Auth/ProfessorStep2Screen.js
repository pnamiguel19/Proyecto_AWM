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
import * as DocumentPicker from 'expo-document-picker';
// ELIMINADO: import * as MediaLibrary from 'expo-media-library';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep2Screen.styles';

const ProfessorStep2Screen = ({ navigation, route }) => {
  const { formData: previousData } = route.params || {};

  const [formData, setFormData] = useState({
    universityDegree: '',
    university: '',
    graduationYear: '',
    teachingExperience: '',
    degreeDocument: null,
    professionalIdDocument: null,
    additionalCertifications: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // ELIMINADO: const [hasStoragePermission, setHasStoragePermission] = useState(false);

  const steps = [
    { label: 'Información Personal', icon: '👤' },
    { label: 'Formación', icon: '🎓' },
    { label: 'Clases', icon: '📚' },
    { label: 'Horario', icon: '📅' },
    { label: 'Confirmación', icon: '✓' },
  ];

  const experienceOptions = [
    { label: 'Menos de 1 año', value: '0-1' },
    { label: '1-3 años', value: '1-3' },
    { label: '3-5 años', value: '3-5' },
    { label: '5-10 años', value: '5-10' },
    { label: 'Más de 10 años', value: '10+' },
  ];

  // ELIMINADO: useEffect y requestStoragePermission completos

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const pickDocument = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log('Document picker result:', result);

      // Manejar tanto el formato antiguo como el nuevo de expo-document-picker
      if (!result.canceled) {
        const file = result.assets ? result.assets[0] : result;

        // Validar tamaño del archivo (máximo 5MB)
        if (file.size && file.size > 5 * 1024 * 1024) {
          Alert.alert(
            'Archivo muy grande',
            'El archivo no debe superar los 5MB. Por favor, selecciona otro archivo.'
          );
          return;
        }

        // Validar que sea PDF
        if (file.mimeType && !file.mimeType.includes('pdf')) {
          Alert.alert(
            'Formato inválido',
            'Solo se aceptan archivos PDF. Por favor, selecciona un archivo válido.'
          );
          return;
        }

        handleInputChange(field, file);

        Alert.alert(
          'Documento cargado',
          `El documento "${file.name}" se ha cargado exitosamente.`
        );
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert(
        'Error',
        'No se pudo seleccionar el archivo. Por favor, intenta nuevamente.'
      );
    }
  };

  const addCertification = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled) {
        const file = result.assets ? result.assets[0] : result;

        // Validar tamaño del archivo
        if (file.size && file.size > 5 * 1024 * 1024) {
          Alert.alert('Archivo muy grande', 'El archivo no debe superar los 5MB.');
          return;
        }

        // Validar que sea PDF
        if (file.mimeType && !file.mimeType.includes('pdf')) {
          Alert.alert('Formato inválido', 'Solo se aceptan archivos PDF.');
          return;
        }

        const newCertifications = [...formData.additionalCertifications, file];
        handleInputChange('additionalCertifications', newCertifications);

        Alert.alert(
          'Certificación agregada',
          `La certificación "${file.name}" se ha agregado exitosamente.`
        );
      }
    } catch (error) {
      console.error('Error adding certification:', error);
      Alert.alert('Error', 'No se pudo agregar la certificación');
    }
  };

  const removeCertification = (index) => {
    Alert.alert(
      'Eliminar certificación',
      '¿Estás seguro de que deseas eliminar esta certificación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const newCertifications = formData.additionalCertifications.filter(
              (_, i) => i !== index
            );
            handleInputChange('additionalCertifications', newCertifications);
          },
        },
      ]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.universityDegree) {
      newErrors.universityDegree = 'El título universitario es requerido';
    }
    if (!formData.university) {
      newErrors.university = 'La universidad es requerida';
    }
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'El año de graduación es requerido';
    } else {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1950 || year > currentYear) {
        newErrors.graduationYear = `Año inválido (1950-${currentYear})`;
      }
    }
    if (!formData.teachingExperience) {
      newErrors.teachingExperience = 'La experiencia docente es requerida';
    }
    if (!formData.degreeDocument) {
      newErrors.degreeDocument = 'El título universitario (PDF) es obligatorio';
    }
    if (!formData.professionalIdDocument) {
      newErrors.professionalIdDocument = 'La cédula profesional (PDF) es obligatoria';
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

    console.log('Datos completos hasta paso 2:', allFormData);
    navigation.navigate('ProfessorStep3', { formData: allFormData });
  };

  const handlePrevious = () => {
    Alert.alert(
      'Volver al paso anterior',
      '¿Deseas volver al paso anterior? Los documentos cargados se mantendrán.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Volver', onPress: () => navigation.goBack() },
      ]
    );
  };

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
      <Stepper steps={steps} currentStep={2} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Título principal */}
          <View style={styles.section}>
            <Text style={styles.mainTitle}>🎓 Formación Académica y Títulos</Text>
            <Text style={styles.mainSubtitle}>
              Sube tus documentos que avalen tu formación y experiencia como docente
            </Text>
          </View>

          {/* Sección: Información Académica */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>📋</Text>
              Información Académica
            </Text>

            <Input
              label="Título Universitario"
              placeholder="Ej: Licenciatura en Física"
              value={formData.universityDegree}
              onChangeText={(value) => handleInputChange('universityDegree', value)}
              required
              error={errors.universityDegree}
            />

            <Input
              label="Universidad"
              placeholder="Universidad Central del Ecuador"
              value={formData.university}
              onChangeText={(value) => handleInputChange('university', value)}
              required
              error={errors.university}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="Año de Graduación"
                  placeholder="2018"
                  value={formData.graduationYear}
                  onChangeText={(value) => handleInputChange('graduationYear', value)}
                  keyboardType="numeric"
                  maxLength={4}
                  required
                  error={errors.graduationYear}
                />
              </View>
              <View style={styles.halfWidth}>
                <Select
                  label="Años de Experiencia Docente"
                  placeholder="Selecciona tu experiencia"
                  value={formData.teachingExperience}
                  onValueChange={(value) => handleInputChange('teachingExperience', value)}
                  options={experienceOptions}
                  required
                  error={errors.teachingExperience}
                />
              </View>
            </View>
          </View>

          {/* Sección: Documentos de Respaldo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>📄</Text>
              Documentos de Respaldo
            </Text>

            {/* Título Universitario PDF */}
            <View style={styles.documentUploadContainer}>
              <View style={styles.documentHeader}>
                <Text style={styles.documentIcon}>📎</Text>
                <Text style={styles.documentLabel}>
                  Título Universitario (PDF) <Text style={styles.required}>*</Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickDocument('degreeDocument')}
              >
                <Text style={styles.uploadButtonText}>Seleccionar archivo</Text>
              </TouchableOpacity>
              {formData.degreeDocument ? (
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>✓ {formData.degreeDocument.name}</Text>
                  <Text style={styles.fileSize}>
                    {(formData.degreeDocument.size / 1024).toFixed(2)} KB
                  </Text>
                </View>
              ) : (
                <Text style={styles.fileWarning}>
                  El título universitario (PDF) es obligatorio
                </Text>
              )}
              {errors.degreeDocument && (
                <Text style={styles.errorText}>{errors.degreeDocument}</Text>
              )}
            </View>

            {/* Cédula Profesional PDF */}
            <View style={styles.documentUploadContainer}>
              <View style={styles.documentHeader}>
                <Text style={styles.documentIcon}>📎</Text>
                <Text style={styles.documentLabel}>
                  Cédula Profesional (PDF) <Text style={styles.required}>*</Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickDocument('professionalIdDocument')}
              >
                <Text style={styles.uploadButtonText}>Seleccionar archivo</Text>
              </TouchableOpacity>
              {formData.professionalIdDocument ? (
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>
                    ✓ {formData.professionalIdDocument.name}
                  </Text>
                  <Text style={styles.fileSize}>
                    {(formData.professionalIdDocument.size / 1024).toFixed(2)} KB
                  </Text>
                </View>
              ) : (
                <Text style={styles.fileWarning}>
                  La cédula profesional (PDF) es obligatoria
                </Text>
              )}
              {errors.professionalIdDocument && (
                <Text style={styles.errorText}>{errors.professionalIdDocument}</Text>
              )}
            </View>
          </View>

          {/* Sección: Certificaciones Adicionales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>⭐</Text>
              Certificaciones Adicionales
            </Text>
            <Text style={styles.sectionSubtitle}>
              Cursos, diplomados, especializaciones u otros documentos que fortalezcan tu perfil
            </Text>

            <TouchableOpacity style={styles.addButton} onPress={addCertification}>
              <Text style={styles.addButtonText}>+ Agregar Otra Certificación</Text>
            </TouchableOpacity>

            {formData.additionalCertifications.length > 0 && (
              <View style={styles.certificationsContainer}>
                {formData.additionalCertifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.certificationName}>📄 {cert.name}</Text>
                      <Text style={styles.certificationSize}>
                        {(cert.size / 1024).toFixed(2)} KB
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeCertification(index)}>
                      <Text style={styles.removeButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Resumen de Documentos Cargados */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>
              <Text style={styles.summaryIcon}>📊</Text>
              Resumen de Documentos Cargados
            </Text>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Título Universitario:</Text>
              <View
                style={[
                  styles.summaryStatus,
                  formData.degreeDocument
                    ? styles.summaryStatusPending
                    : styles.summaryStatusMissing,
                ]}
              >
                <Text
                  style={[
                    styles.summaryStatusText,
                    formData.degreeDocument
                      ? styles.summaryStatusTextPending
                      : styles.summaryStatusTextMissing,
                  ]}
                >
                  {formData.degreeDocument ? '⏳ Pendiente' : '✕ Pendiente'}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Cédula Profesional:</Text>
              <View
                style={[
                  styles.summaryStatus,
                  formData.professionalIdDocument
                    ? styles.summaryStatusPending
                    : styles.summaryStatusMissing,
                ]}
              >
                <Text
                  style={[
                    styles.summaryStatusText,
                    formData.professionalIdDocument
                      ? styles.summaryStatusTextPending
                      : styles.summaryStatusTextMissing,
                  ]}
                >
                  {formData.professionalIdDocument ? '⏳ Pendiente' : '✕ Pendiente'}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Certificaciones Adicionales:</Text>
              <View style={styles.summaryStatus}>
                <Text style={styles.summaryStatusTextInfo}>
                  {formData.additionalCertifications.length} documento(s)
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

export default ProfessorStep2Screen;