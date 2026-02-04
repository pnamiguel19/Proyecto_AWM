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
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Select from '../../components/common/Select/Select';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep2Screen.styles';

const ProfessorStep2Screen = ({ navigation, route }) => {
  const { step1Data } = route.params || {};

  console.log('📋 Step 2 - Datos recibidos del Step 1:', {
    ...step1Data,
    password: '***hidden***'
  });

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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const pickDocument = async (field) => {
    try {
      console.log(`📎 Seleccionando documento para: ${field}`);

      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log('📄 Resultado del picker:', result);

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

        // Preparar archivo para el backend
        const documentFile = {
          uri: file.uri,
          type: file.mimeType || 'application/pdf',
          name: file.name || `${field}.pdf`,
          size: file.size,
        };

        handleInputChange(field, documentFile);

        console.log(`✅ Documento cargado: ${file.name}`);

        Alert.alert(
          'Documento cargado',
          `El documento "${file.name}" se ha cargado exitosamente.`
        );
      }
    } catch (error) {
      console.error('❌ Error al seleccionar documento:', error);
      Alert.alert(
        'Error',
        'No se pudo seleccionar el archivo. Por favor, intenta nuevamente.'
      );
    }
  };

  const addCertification = async () => {
    try {
      console.log('📎 Agregando certificación adicional...');

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

        // Preparar certificación para el backend
        const certificationFile = {
          uri: file.uri,
          type: file.mimeType || 'application/pdf',
          name: file.name || `certification_${Date.now()}.pdf`,
          size: file.size,
        };

        const newCertifications = [...formData.additionalCertifications, certificationFile];
        handleInputChange('additionalCertifications', newCertifications);

        console.log(`✅ Certificación agregada: ${file.name}`);

        Alert.alert(
          'Certificación agregada',
          `La certificación "${file.name}" se ha agregado exitosamente.`
        );
      }
    } catch (error) {
      console.error('❌ Error al agregar certificación:', error);
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
            console.log(`🗑️ Certificación eliminada en índice: ${index}`);
          },
        },
      ]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('🔍 Validando Step 2...');

    // Validar título universitario
    if (!formData.universityDegree.trim()) {
      newErrors.universityDegree = 'El título universitario es requerido';
    }

    // Validar universidad
    if (!formData.university.trim()) {
      newErrors.university = 'La universidad es requerida';
    }

    // Validar año de graduación
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'El año de graduación es requerido';
    } else {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1950 || year > currentYear) {
        newErrors.graduationYear = `Año inválido (1950-${currentYear})`;
      }
    }

    // Validar experiencia docente
    if (!formData.teachingExperience) {
      newErrors.teachingExperience = 'La experiencia docente es requerida';
    }

    // Validar documento de título universitario
    if (!formData.degreeDocument) {
      newErrors.degreeDocument = 'El título universitario (PDF) es obligatorio';
    }

    // Validar cédula profesional
    if (!formData.professionalIdDocument) {
      newErrors.professionalIdDocument = 'La cédula profesional (PDF) es obligatoria';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    console.log(isValid ? '✅ Validación exitosa' : '❌ Errores encontrados:', newErrors);

    return isValid;
  };

  const handleNext = () => {
    console.log('📝 Intentando avanzar al Step 3...');

    if (!validateForm()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos obligatorios antes de continuar.'
      );
      return;
    }

    // Combinar datos del Step 1 y Step 2
    const step2Data = {
      // Formación Académica
      universityDegree: formData.universityDegree.trim(),
      university: formData.university.trim(),
      graduationYear: parseInt(formData.graduationYear),
      teachingExperience: formData.teachingExperience,
      
      // Documentos (estos se enviarán como FormData al backend)
      degreeDocument: formData.degreeDocument,
      professionalIdDocument: formData.professionalIdDocument,
      certifications: formData.additionalCertifications, // Array de certificaciones
    };

    const allFormData = {
      ...step1Data,
      ...step2Data,
    };

    console.log('✅ Step 2 completado. Datos combinados:', {
      ...allFormData,
      password: '***hidden***',
      degreeDocument: allFormData.degreeDocument ? '📄 Archivo cargado' : null,
      professionalIdDocument: allFormData.professionalIdDocument ? '📄 Archivo cargado' : null,
      certifications: `${allFormData.certifications.length} certificación(es)`,
    });

    // Navegar al paso 3 con todos los datos acumulados
    navigation.navigate('ProfessorStep3', { 
      step1Data: step1Data,
      step2Data: step2Data,
      allFormData: allFormData 
    });
  };

  const handlePrevious = () => {
    Alert.alert(
      'Volver al paso anterior',
      '¿Deseas volver al paso anterior? Los documentos cargados se mantendrán.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Volver', 
          onPress: () => {
            console.log('⬅️ Volviendo al Step 1');
            navigation.goBack();
          }
        },
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
                  placeholder="Selecciona"
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
            <Text style={styles.sectionSubtitle}>
              Los documentos deben ser PDF y no superar 5MB
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
                <Text style={styles.uploadButtonText}>
                  {formData.degreeDocument ? 'Cambiar archivo' : 'Seleccionar archivo'}
                </Text>
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
                <Text style={styles.uploadButtonText}>
                  {formData.professionalIdDocument ? 'Cambiar archivo' : 'Seleccionar archivo'}
                </Text>
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
              Certificaciones Adicionales (Opcional)
            </Text>
            <Text style={styles.sectionSubtitle}>
              Cursos, diplomados, especializaciones que fortalezcan tu perfil (máximo 5)
            </Text>

            {formData.additionalCertifications.length < 5 && (
              <TouchableOpacity style={styles.addButton} onPress={addCertification}>
                <Text style={styles.addButtonText}>+ Agregar Certificación</Text>
              </TouchableOpacity>
            )}

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

            {formData.additionalCertifications.length >= 5 && (
              <Text style={styles.maxCertificationsWarning}>
                Has alcanzado el máximo de 5 certificaciones
              </Text>
            )}
          </View>

          {/* Resumen de Documentos */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>
              <Text style={styles.summaryIcon}>📊</Text>
              Resumen de Documentos
            </Text>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Título Universitario:</Text>
              <View
                style={[
                  styles.summaryStatus,
                  formData.degreeDocument
                    ? styles.summaryStatusSuccess
                    : styles.summaryStatusMissing,
                ]}
              >
                <Text
                  style={[
                    styles.summaryStatusText,
                    formData.degreeDocument
                      ? styles.summaryStatusTextSuccess
                      : styles.summaryStatusTextMissing,
                  ]}
                >
                  {formData.degreeDocument ? '✓ Cargado' : '✕ Pendiente'}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Cédula Profesional:</Text>
              <View
                style={[
                  styles.summaryStatus,
                  formData.professionalIdDocument
                    ? styles.summaryStatusSuccess
                    : styles.summaryStatusMissing,
                ]}
              >
                <Text
                  style={[
                    styles.summaryStatusText,
                    formData.professionalIdDocument
                      ? styles.summaryStatusTextSuccess
                      : styles.summaryStatusTextMissing,
                  ]}
                >
                  {formData.professionalIdDocument ? '✓ Cargado' : '✕ Pendiente'}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Certificaciones:</Text>
              <View style={styles.summaryStatus}>
                <Text style={styles.summaryStatusTextInfo}>
                  {formData.additionalCertifications.length} de 5 opcional(es)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botones fijos */}
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