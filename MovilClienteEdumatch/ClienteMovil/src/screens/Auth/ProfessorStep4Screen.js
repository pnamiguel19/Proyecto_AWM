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
import Select from '../../components/common/Select/Select';
import TextArea from '../../components/common/TextArea/TextArea';
import Stepper from '../../components/common/Stepper/Stepper';
import styles from './ProfessorStep4Screen.styles';

const ProfessorStep4Screen = ({ navigation, route }) => {
  const { formData: previousData } = route.params || {};

  const [schedule, setSchedule] = useState({
    monday: { morning: false, afternoon: false, night: false, allDay: false },
    tuesday: { morning: false, afternoon: false, night: false, allDay: false },
    wednesday: { morning: false, afternoon: false, night: false, allDay: false },
    thursday: { morning: false, afternoon: false, night: false, allDay: false },
    friday: { morning: false, afternoon: false, night: false, allDay: false },
    saturday: { morning: false, afternoon: false, night: false, allDay: false },
    sunday: { morning: false, afternoon: false, night: false, allDay: false },
  });

  const [maxStudents, setMaxStudents] = useState('1');
  const [reservationTime, setReservationTime] = useState('24');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { label: 'Información Personal', icon: '👤' },
    { label: 'Formación', icon: '🎓' },
    { label: 'Clases', icon: '📚' },
    { label: 'Horario', icon: '📅' },
    { label: 'Confirmación', icon: '✓' },
  ];

  const daysOfWeek = [
    { id: 'monday', name: 'Lunes' },
    { id: 'tuesday', name: 'Martes' },
    { id: 'wednesday', name: 'Miércoles' },
    { id: 'thursday', name: 'Jueves' },
    { id: 'friday', name: 'Viernes' },
    { id: 'saturday', name: 'Sábado' },
    { id: 'sunday', name: 'Domingo' },
  ];

  const timeSlots = [
    { id: 'morning', name: 'Mañana', time: '6:00 - 12:00', icon: '🌅' },
    { id: 'afternoon', name: 'Tarde', time: '12:00 - 18:00', icon: '🌞' },
    { id: 'night', name: 'Noche', time: '18:00 - 23:00', icon: '🌙' },
  ];

  const maxStudentsOptions = [
    { label: '1 estudiante (Individual)', value: '1' },
    { label: '2 estudiantes', value: '2' },
    { label: '3 estudiantes', value: '3' },
    { label: '4 estudiantes', value: '4' },
    { label: '5 estudiantes', value: '5' },
    { label: '6-10 estudiantes (Grupo pequeño)', value: '6-10' },
    { label: 'Más de 10 estudiantes (Grupo grande)', value: '10+' },
  ];

  const reservationTimeOptions = [
    { label: '1 hora antes', value: '1' },
    { label: '2 horas antes', value: '2' },
    { label: '6 horas antes', value: '6' },
    { label: '12 horas antes', value: '12' },
    { label: '24 horas antes', value: '24' },
    { label: '48 horas antes', value: '48' },
    { label: '1 semana antes', value: '168' },
  ];

  const toggleTimeSlot = (day, slot) => {
    if (slot === 'allDay') {
      const isAllDaySelected = schedule[day].allDay;
      setSchedule({
        ...schedule,
        [day]: {
          morning: !isAllDaySelected,
          afternoon: !isAllDaySelected,
          night: !isAllDaySelected,
          allDay: !isAllDaySelected,
        },
      });
    } else {
      const newDaySchedule = {
        ...schedule[day],
        [slot]: !schedule[day][slot],
      };

      // Check if all time slots are selected
      const allSelected =
        newDaySchedule.morning && newDaySchedule.afternoon && newDaySchedule.night;

      setSchedule({
        ...schedule,
        [day]: {
          ...newDaySchedule,
          allDay: allSelected,
        },
      });
    }
  };

  const getSelectedSlotsCount = () => {
    let count = 0;
    Object.keys(schedule).forEach((day) => {
      if (schedule[day].morning) count++;
      if (schedule[day].afternoon) count++;
      if (schedule[day].night) count++;
    });
    return count;
  };

  const getAvailableDaysCount = () => {
    let count = 0;
    Object.keys(schedule).forEach((day) => {
      if (
        schedule[day].morning ||
        schedule[day].afternoon ||
        schedule[day].night ||
        schedule[day].allDay
      ) {
        count++;
      }
    });
    return count;
  };

  const validateForm = () => {
    const newErrors = {};
    const slotsCount = getSelectedSlotsCount();

    if (slotsCount === 0) {
      newErrors.schedule = 'Debes seleccionar al menos un horario disponible';
    }

    if (!maxStudents) {
      newErrors.maxStudents = 'Selecciona el número máximo de estudiantes';
    }

    if (!reservationTime) {
      newErrors.reservationTime = 'Selecciona el tiempo de anticipación';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, selecciona al menos un horario disponible.'
      );
      return;
    }

    const allFormData = {
      ...previousData,
      schedule,
      maxStudents,
      reservationTime,
      additionalNotes,
    };

    console.log('Datos completos hasta paso 4:', allFormData);
    // Navegar al paso 5
    navigation.navigate('ProfessorStep5', { formData: allFormData });
  };

  const handlePrevious = () => {
    navigation.goBack();
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
      <Stepper steps={steps} currentStep={4} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Título principal */}
          <View style={styles.section}>
            <Text style={styles.mainTitle}>📅 Disponibilidad Horaria</Text>
            <Text style={styles.mainSubtitle}>
              Selecciona los horarios en los que estás disponible para dar clases
            </Text>
          </View>

          {/* Consejos */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Consejos para tu horario</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>✓</Text>
              <Text style={styles.tipText}>
                Sé flexible y ofrece diferentes horarios para atraer más estudiantes
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>✓</Text>
              <Text style={styles.tipText}>
                Considera las zonas horarias si ofreces clases en línea
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>✓</Text>
              <Text style={styles.tipText}>
                Puedes actualizar tu disponibilidad en cualquier momento desde tu perfil
              </Text>
            </View>
          </View>

          {/* Selector de Disponibilidad */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>🕐</Text>
              Selecciona tu Disponibilidad <Text style={styles.required}>*</Text>
            </Text>

            {/* Header de franjas horarias */}
            <View style={styles.scheduleHeader}>
              <View style={styles.dayColumn} />
              {timeSlots.map((slot) => (
                <View key={slot.id} style={styles.timeSlotColumn}>
                  <Text style={styles.timeSlotIcon}>{slot.icon}</Text>
                  <Text style={styles.timeSlotName}>{slot.name}</Text>
                  <Text style={styles.timeSlotTime}>{slot.time}</Text>
                </View>
              ))}
              <View style={styles.allDayColumn}>
                <Text style={styles.allDayText}>Todo el día</Text>
              </View>
            </View>

            {/* Días de la semana */}
            {daysOfWeek.map((day) => (
              <View key={day.id} style={styles.scheduleRow}>
                <View style={styles.dayColumn}>
                  <Text style={styles.dayName}>{day.name}</Text>
                </View>

                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={styles.timeSlotColumn}
                    onPress={() => toggleTimeSlot(day.id, slot.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        schedule[day.id][slot.id] && styles.checkboxSelected,
                      ]}
                    >
                      {schedule[day.id][slot.id] && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={styles.allDayColumn}
                  onPress={() => toggleTimeSlot(day.id, 'allDay')}
                >
                  <View
                    style={[
                      styles.allDayButton,
                      schedule[day.id].allDay && styles.allDayButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.allDayButtonText,
                        schedule[day.id].allDay && styles.allDayButtonTextSelected,
                      ]}
                    >
                      +
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}

            {errors.schedule && (
              <Text style={styles.errorText}>{errors.schedule}</Text>
            )}
          </View>

          {/* Preferencias Adicionales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.sectionTitleIcon}>⚙️</Text>
              Preferencias Adicionales
            </Text>

            <Select
              label="Máximo de Estudiantes por Clase"
              placeholder="Selecciona"
              value={maxStudents}
              onValueChange={setMaxStudents}
              options={maxStudentsOptions}
              required
              error={errors.maxStudents}
            />
            <Text style={styles.hint}>
              Define el número máximo de estudiantes que aceptas por clase
            </Text>

            <Select
              label="Tiempo de Anticipación para Reservas"
              placeholder="Selecciona"
              value={reservationTime}
              onValueChange={setReservationTime}
              options={reservationTimeOptions}
              required
              error={errors.reservationTime}
            />
            <Text style={styles.hint}>
              ¿Con cuánta anticipación deben reservar los estudiantes?
            </Text>

            <TextArea
              label="Notas Adicionales sobre tu Disponibilidad"
              placeholder="Ej: Tengo mayor disponibilidad durante vacaciones escolares, puedo ajustar horarios para grupos, etc."
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              maxLength={300}
              numberOfLines={4}
            />
          </View>

          {/* Resumen de Disponibilidad */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>
              <Text style={styles.summaryIcon}>📊</Text>
              Resumen de Disponibilidad
            </Text>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardIcon}>📅</Text>
                <Text style={styles.summaryCardLabel}>
                  FRANJAS HORARIAS SELECCIONADAS
                </Text>
                <Text style={styles.summaryCardValue}>
                  {getSelectedSlotsCount()} franjas
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardIcon}>📆</Text>
                <Text style={styles.summaryCardLabel}>DÍAS DISPONIBLES</Text>
                <Text style={styles.summaryCardValue}>
                  {getAvailableDaysCount()} días
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardIcon}>👥</Text>
                <Text style={styles.summaryCardLabel}>
                  ESTUDIANTES MÁX. POR CLASE
                </Text>
                <Text style={styles.summaryCardValue}>
                  {maxStudents === '1'
                    ? '1 estudiante'
                    : `${maxStudents} estudiantes`}
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

export default ProfessorStep4Screen;