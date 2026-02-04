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
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep5Screen.styles';

const ProfessorStep5Screen = ({ navigation, route }) => {
  const { step1Data, step2Data, step3Data, step4Data, allFormData } = route.params || {};
  const { registerProfessor } = useAuth();

  console.log('📋 Step 5 - Datos recibidos:', {
    tieneStep1: !!step1Data,
    tieneStep2: !!step2Data,
    tieneStep3: !!step3Data,
    tieneStep4: !!step4Data,
    tieneAllFormData: !!allFormData,
  });

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
      mathematics: 'Matemáticas',
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
      programming: 'Programación',
      economics: 'Economía',
    };
    return allFormData?.subjects?.map((id) => subjectMap[id]).join(', ') || 'N/A';
  };

  const getEducationLevelNames = () => {
    const levelMap = {
      elementary: 'Primaria',      // 👈 CAMBIADO
      middle_school: 'Secundaria', // 👈 CAMBIADO
      high_school: 'Bachillerato',
      university: 'Universidad',
      postgraduate: 'Posgrado',
    };
    return allFormData?.educationLevels?.map((id) => levelMap[id]).join(', ') || 'N/A';
  };

  const getModalityNames = () => {
    const modalityMap = {
      in_person: 'Presencial',
      online: 'En Línea',
      hybrid: 'Híbrido',
    };
    return allFormData?.teachingModalities?.map((id) => modalityMap[id]).join(', ') || 'N/A';
  };

  const getScheduleSummary = () => {
    if (!allFormData?.schedule || !Array.isArray(allFormData.schedule)) {
      return { slots: 0, days: 0 };
    }
    
    let totalSlots = 0;
    const days = allFormData.schedule.length;
    
    allFormData.schedule.forEach((daySchedule) => {
      totalSlots += daySchedule.timeSlots?.length || 0;
    });
    
    return { slots: totalSlots, days };
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('🔍 Validando confirmación final...');

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }
    if (!acceptPrivacy) {
      newErrors.privacy = 'Debes autorizar el uso de tus datos personales';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    console.log(isValid ? '✅ Validación exitosa' : '❌ Errores encontrados:', newErrors);

    return isValid;
  };

  const handleSubmit = async () => {
    console.log('🚀 Iniciando envío final de registro de profesor...');

    if (!validateForm()) {
      Alert.alert(
        'Confirmación requerida',
        'Debes aceptar los términos y condiciones y la política de privacidad para continuar.'
      );
      return;
    }

    setLoading(true);

    try {
      // Preparar datos finales para el backend
      const professorData = {
        // Step 1: Información Personal
        firstName: allFormData.firstName,
        lastName: allFormData.lastName,
        email: allFormData.email,
        password: allFormData.password,
        phone: allFormData.phone,
        birthDate: allFormData.birthDate, // Ya está en formato YYYY-MM-DD
        gender: allFormData.gender,
        address: allFormData.address,
        bio: allFormData.bio || '',

        // Step 2: Formación Académica
        universityDegree: allFormData.universityDegree,
        university: allFormData.university,
        graduationYear: allFormData.graduationYear,
        teachingExperience: allFormData.teachingExperience,
        
        // Step 3: Materias y Modalidades
        subjects: allFormData.subjects, // Array de strings
        educationLevels: allFormData.educationLevels, // Array de strings
        teachingModalities: allFormData.teachingModalities, // Array de strings
        hourlyRate: allFormData.hourlyRate, // Número
        currency: allFormData.currency,

        // Step 4: Disponibilidad
        schedule: allFormData.schedule, // Array de { day, timeSlots: [] }
        maxStudentsPerClass: allFormData.maxStudentsPerClass,
        minimumNoticeHours: allFormData.minimumNoticeHours,
        additionalNotes: allFormData.additionalNotes || '',

        // Step 5: Confirmaciones
        acceptTerms,
        acceptPrivacy,
        acceptNotifications,
      };

      // Documentos (se enviarán como FormData)
      const documents = {
        degreeDocument: allFormData.degreeDocument,
        professionalIdDocument: allFormData.professionalIdDocument,
        certifications: allFormData.certifications || [],
        profileImage: allFormData.profileImage || null,
      };

      console.log('📦 Datos del profesor preparados:', {
        ...professorData,
        password: '***hidden***',
      });

      console.log('📄 Documentos a enviar:', {
        degreeDocument: documents.degreeDocument?.name || 'No cargado',
        professionalIdDocument: documents.professionalIdDocument?.name || 'No cargado',
        certifications: `${documents.certifications.length} archivo(s)`,
        profileImage: documents.profileImage ? 'Imagen cargada' : 'Sin imagen',
      });

      // Llamar al servicio de registro del backend
      const response = await registerProfessor(professorData, documents);

      console.log('✅ Respuesta del servidor:', response);

      if (response.success) {
        // Registro exitoso
        Alert.alert(
          '¡Registro Completado! 🎉',
          `¡Bienvenido ${allFormData.firstName}!\n\nTu perfil de profesor ha sido creado exitosamente. Nuestro equipo revisará tu información y te enviaremos una confirmación por correo electrónico en las próximas 24-48 horas.\n\nUna vez aprobado, podrás comenzar a recibir solicitudes de estudiantes y empezar a compartir tu conocimiento.`,
          [
            {
              text: 'Entendido',
              onPress: () => {
                // Navegar al home del profesor o al login
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('❌ Error al registrar profesor:', error);

      let errorMessage = 'Hubo un problema al completar tu registro. Por favor, intenta nuevamente.';

      if (error.message) {
        errorMessage = error.message;
      }

      // Errores específicos del backend
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

  const handlePrevious = () => {
    Alert.alert(
      'Volver al paso anterior',
      '¿Deseas volver al paso anterior? Tus confirmaciones se mantendrán.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Volver',
          onPress: () => {
            console.log('⬅️ Volviendo al Step 4');
            navigation.goBack();
          },
        },
      ]
    );
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
                    : allFormData?.gender === 'other'
                    ? 'Otro'
                    : 'Prefiero no decir'}
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
              {allFormData?.certifications?.length > 0 && (
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>CERTIFICACIONES ADICIONALES:</Text>
                  <Text style={styles.reviewValue}>
                    {allFormData?.certifications?.length} certificación
                    {allFormData?.certifications?.length !== 1 ? 'es' : ''}
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
                  {allFormData?.currency} ${allFormData?.hourlyRate}
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
                  {allFormData?.maxStudentsPerClass} estudiante
                  {allFormData?.maxStudentsPerClass !== 1 ? 's' : ''}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>
                  TIEMPO DE ANTICIPACIÓN PARA RESERVAS:
                </Text>
                <Text style={styles.reviewValue}>
                  {allFormData?.minimumNoticeHours === 1
                    ? '1 hora antes'
                    : allFormData?.minimumNoticeHours === 168
                    ? '1 semana antes'
                    : `${allFormData?.minimumNoticeHours} horas antes`}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
          disabled={loading}
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