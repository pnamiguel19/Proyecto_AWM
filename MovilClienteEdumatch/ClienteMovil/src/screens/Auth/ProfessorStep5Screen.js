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
import Button from '../../components/common/Button/Button';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep5Screen.styles';

const ProfessorStep5Screen = ({ navigation, route }) => {
  const { formData: allFormData } = route.params || {};

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptNotifications, setAcceptNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { label: 'Información Personal', icon: '👤' },
    { label: 'Formación', icon: '🎓' },
    { label: 'Clases', icon: '📚' },
    { label: 'Horario', icon: '📅' },
    { label: 'Confirmación', icon: '✓' },
  ];

  const getSubjectNames = () => {
    const subjectMap = {
      math: 'Matemáticas',
      physics: 'Física',
      chemistry: 'Química',
      biology: 'Biología',
      literature: 'Lengua y Literatura',
      english: 'Inglés',
      history: 'Historia',
      geography: 'Geografía',
      computing: 'Informática',
      art: 'Arte',
      music: 'Música',
      physical_education: 'Educación Física',
    };
    return allFormData?.subjects?.map((id) => subjectMap[id]).join(', ') || 'N/A';
  };

  const getEducationLevelNames = () => {
    const levelMap = {
      primary: 'Primaria',
      secondary: 'Secundaria',
      high_school: 'Bachillerato',
      university: 'Universidad',
      adult: 'Adultos',
    };
    return (
      allFormData?.educationLevels?.map((id) => levelMap[id]).join(', ') || 'N/A'
    );
  };

  const getModalityNames = () => {
    const modalityMap = {
      in_person: 'Presencial',
      online: 'En Línea',
      hybrid: 'Híbrido',
    };
    return (
      allFormData?.teachingModalities?.map((id) => modalityMap[id]).join(', ') ||
      'N/A'
    );
  };

  const getScheduleSummary = () => {
    if (!allFormData?.schedule) return { slots: 0, days: 0 };
    let slots = 0;
    let days = 0;
    Object.keys(allFormData.schedule).forEach((day) => {
      const daySchedule = allFormData.schedule[day];
      if (daySchedule.morning || daySchedule.afternoon || daySchedule.night) {
        days++;
        if (daySchedule.morning) slots++;
        if (daySchedule.afternoon) slots++;
        if (daySchedule.night) slots++;
      }
    });
    return { slots, days };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }
    if (!acceptPrivacy) {
      newErrors.privacy = 'Debes autorizar el uso de tus datos personales';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Confirmación requerida',
        'Debes aceptar los términos y condiciones y la política de privacidad para continuar.'
      );
      return;
    }

    setLoading(true);

    try {
      // Aquí iría la lógica para enviar los datos al backend
      const finalData = {
        ...allFormData,
        acceptTerms,
        acceptPrivacy,
        acceptNotifications,
      };

      console.log('Datos finales del registro:', finalData);

      // Simular envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        '¡Registro completado! 🎉',
        'Tu perfil ha sido creado exitosamente. Nuestro equipo revisará tu información y te enviaremos una confirmación por correo electrónico en las próximas 24-48 horas.\n\nUna vez aprobado, podrás comenzar a recibir solicitudes de estudiantes y empezar a compartir tu conocimiento.',
        [
          {
            text: 'Entendido',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al completar tu registro. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  const scheduleSummary = getScheduleSummary();

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
      <Stepper steps={steps} currentStep={5} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Título principal */}
          <View style={styles.section}>
            <Text style={styles.mainTitle}>✓ Confirmación y Revisión</Text>
            <Text style={styles.mainSubtitle}>
              Revisa toda tu información antes de enviar tu solicitud
            </Text>
          </View>

          {/* Banner de éxito */}
          <View style={styles.successBanner}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>
              ¡Estás a un paso de unirte a EduMatch!
            </Text>
            <Text style={styles.successText}>
              Al completar tu registro, nuestro equipo revisará tu perfil y te
              enviaremos una confirmación por correo electrónico en las próximas
              24-48 horas.
            </Text>
            <Text style={styles.successSubtext}>
              Una vez aprobado, podrás comenzar a recibir solicitudes de estudiantes
              y empezar a compartir tu conocimiento.
            </Text>
          </View>

          {/* Información Personal */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewIcon}>👤</Text>
              <Text style={styles.reviewTitle}>Información Personal</Text>
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>NOMBRE COMPLETO:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.firstName} {allFormData?.lastName}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>EMAIL:</Text>
                <Text style={styles.reviewValue}>{allFormData?.email}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>TELÉFONO:</Text>
                <Text style={styles.reviewValue}>{allFormData?.phone}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>FECHA DE NACIMIENTO:</Text>
                <Text style={styles.reviewValue}>{allFormData?.birthDate}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>GÉNERO:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.gender === 'male'
                    ? 'Masculino'
                    : allFormData?.gender === 'female'
                    ? 'Femenino'
                    : 'Otro'}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>DIRECCIÓN:</Text>
                <Text style={styles.reviewValue}>{allFormData?.address}</Text>
              </View>
              {allFormData?.bio && (
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>BIOGRAFÍA:</Text>
                  <Text style={styles.reviewValue}>{allFormData?.bio}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Formación Académica */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewIcon}>🎓</Text>
              <Text style={styles.reviewTitle}>Formación Académica</Text>
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>TÍTULO UNIVERSITARIO:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.universityDegree}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>UNIVERSIDAD:</Text>
                <Text style={styles.reviewValue}>{allFormData?.university}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>AÑO DE GRADUACIÓN:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.graduationYear}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>EXPERIENCIA DOCENTE:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.teachingExperience === '0-1'
                    ? 'Menos de 1 año'
                    : allFormData?.teachingExperience === '10+'
                    ? 'Más de 10 años'
                    : `${allFormData?.teachingExperience} años`}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>TÍTULO UNIVERSITARIO (PDF):</Text>
                <Text style={styles.reviewValueSuccess}>
                  ✓ {allFormData?.degreeDocument?.name}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>CÉDULA PROFESIONAL (PDF):</Text>
                <Text style={styles.reviewValueSuccess}>
                  ✓ {allFormData?.professionalIdDocument?.name}
                </Text>
              </View>
              {allFormData?.additionalCertifications?.length > 0 && (
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>CERTIFICACIONES ADICIONALES:</Text>
                  <Text style={styles.reviewValue}>
                    {allFormData?.additionalCertifications?.length} certificación
                    {allFormData?.additionalCertifications?.length !== 1 ? 'es' : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Materias y Modalidades */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewIcon}>📚</Text>
              <Text style={styles.reviewTitle}>Materias y Modalidades</Text>
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>MATERIAS QUE ENSEÑAS:</Text>
                <Text style={styles.reviewValue}>{getSubjectNames()}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>NIVELES EDUCATIVOS:</Text>
                <Text style={styles.reviewValue}>{getEducationLevelNames()}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>MODALIDADES DE ENSEÑANZA:</Text>
                <Text style={styles.reviewValue}>{getModalityNames()}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>TARIFA POR HORA:</Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.hourlyRate} {allFormData?.currency}
                </Text>
              </View>
            </View>
          </View>

          {/* Disponibilidad Horaria */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewIcon}>📅</Text>
              <Text style={styles.reviewTitle}>Disponibilidad Horaria</Text>
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>FRANJAS HORARIAS DISPONIBLES:</Text>
                <Text style={styles.reviewValue}>{scheduleSummary.slots} franjas</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>DÍAS DISPONIBLES:</Text>
                <Text style={styles.reviewValue}>
                  {scheduleSummary.days} días a la semana
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>
                  ESTUDIANTES MÁXIMO POR CLASE:
                </Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.maxStudents} estudiante
                  {allFormData?.maxStudents !== '1' ? 's' : ''}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>
                  TIEMPO DE ANTICIPACIÓN PARA RESERVAS:
                </Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.reservationTime === '1'
                    ? '1 hora antes'
                    : allFormData?.reservationTime === '168'
                    ? '1 semana antes'
                    : `${allFormData?.reservationTime} horas antes`}
                </Text>
              </View>
              {allFormData?.additionalNotes && (
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>NOTAS ADICIONALES:</Text>
                  <Text style={styles.reviewValue}>
                    {allFormData?.additionalNotes}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Términos y Condiciones */}
          <View style={styles.termsSection}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAcceptTerms(!acceptTerms)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, acceptTerms && styles.checkboxSelected]}
              >
                {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                He leído y acepto los{' '}
                <Text style={styles.link}>Términos y Condiciones</Text> y la{' '}
                <Text style={styles.link}>Política de Privacidad</Text>{' '}
                <Text style={styles.required}>*</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Text style={styles.errorText}>{errors.terms}</Text>
            )}

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAcceptPrivacy(!acceptPrivacy)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, acceptPrivacy && styles.checkboxSelected]}
              >
                {acceptPrivacy && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Autorizo el uso de mis datos personales según la política de
                privacidad <Text style={styles.required}>*</Text>
              </Text>
            </TouchableOpacity>
            {errors.privacy && (
              <Text style={styles.errorText}>{errors.privacy}</Text>
            )}

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAcceptNotifications(!acceptNotifications)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptNotifications && styles.checkboxSelected,
                ]}
              >
                {acceptNotifications && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Deseo recibir notificaciones sobre nuevas solicitudes de clases
                (opcional)
              </Text>
            </TouchableOpacity>
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
          title="🎉 COMPLETAR REGISTRO"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfessorStep5Screen;