import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './AvailabilityScreen.styles';

const AvailabilityScreen = ({ navigation }) => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
  
  // Configuración
  const [config, setConfig] = useState({
    autoAccept: false,
    weekendClasses: true,
    notifications: true,
    allowCancellation: true,
  });

  // Semana actual
  const [currentWeek, setCurrentWeek] = useState('21 - 27 Noviembre 2024');

  // Clases programadas
  const scheduledClasses = [
    {
      id: 1,
      studentName: 'Javier Ramos',
      subject: 'Matemáticas',
      date: 'Viernes 25 Nov',
      time: '16:00 - 17:30',
      modality: 'online',
      price: 18.00,
    },
    {
      id: 2,
      studentName: 'María González',
      subject: 'Física',
      date: 'Martes 22 Nov',
      time: '10:00 - 12:00',
      modality: 'presencial',
      price: 22.50,
    },
    {
      id: 3,
      studentName: 'Carlos Ruiz',
      subject: 'Física',
      date: 'Martes 22 Nov',
      time: '14:00 - 15:30',
      modality: 'online',
      price: 22.50,
    },
  ];

  // Horarios de la semana
  const weekSchedule = [
    { day: 'LUN', date: '21', slots: [] },
    { 
      day: 'MAR', 
      date: '22',
      slots: [
        { time: '09:00-10:30', type: 'reserved', student: 'Diego Torres', subject: 'Física', modality: 'presencial' },
        { time: '10:00-12:00', type: 'reserved', student: 'María González', subject: 'Física', modality: 'presencial' },
        { time: '14:00-15:30', type: 'reserved', student: 'Carlos Ruiz', subject: 'Física', modality: 'online' },
        { time: '16:00-17:00', type: 'available' },
      ]
    },
    { 
      day: 'MIÉ', 
      date: '23',
      slots: [
        { time: '08:00-09:00', type: 'available' },
        { time: '10:00-11:00', type: 'available' },
        { time: '14:00-15:00', type: 'available' },
        { time: '16:00-17:00', type: 'reserved', student: 'Luis Moreno', subject: 'Física', modality: 'online' },
      ]
    },
    { 
      day: 'JUE', 
      date: '24',
      slots: [
        { time: '09:00-10:00', type: 'reserved', student: 'Ana Silva', subject: 'Cálculo', modality: 'online' },
        { time: '10:00-11:00', type: 'available' },
        { time: '14:00-15:00', type: 'reserved', student: 'Valentina Parra', subject: 'Cálculo', modality: 'online' },
        { time: '16:00-17:00', type: 'available' },
        { time: '18:00-19:00', type: 'available' },
      ]
    },
    { 
      day: 'VIE', 
      date: '25',
      slots: [
        { time: '08:00-09:00', type: 'available' },
        { time: '09:00-10:00', type: 'available' },
        { time: '14:00-15:00', type: 'available' },
        { time: '16:00-17:30', type: 'reserved', student: 'Javier Ramos', subject: 'Matemáticas', modality: 'online' },
      ]
    },
    { 
      day: 'SÁB', 
      date: '26',
      slots: [
        { time: '09:00-12:00', type: 'blocked' },
      ]
    },
    { day: 'DOM', date: '27', slots: [] },
  ];

  const handlePreviousWeek = () => {
    // Lógica para semana anterior
  };

  const handleNextWeek = () => {
    // Lógica para semana siguiente
  };

  const renderConfigModal = () => (
    <Modal
      visible={showConfigModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowConfigModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>⚙️ Configuración</Text>
            <TouchableOpacity onPress={() => setShowConfigModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.configSection}>
              <View style={styles.configItem}>
                <View style={styles.configTextContainer}>
                  <Text style={styles.configLabel}>Aceptar reservas automáticas</Text>
                  <Text style={styles.configDescription}>
                    Las reservas se aceptarán sin tu confirmación
                  </Text>
                </View>
                <Switch
                  value={config.autoAccept}
                  onValueChange={(value) => setConfig({...config, autoAccept: value})}
                  trackColor={{ false: '#E0F2FE', true: '#38BDF8' }}
                  thumbColor={config.autoAccept ? '#FFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.configItem}>
                <View style={styles.configTextContainer}>
                  <Text style={styles.configLabel}>Permitir clases los fines de semana</Text>
                  <Text style={styles.configDescription}>
                    Acepta reservas para sábados y domingos
                  </Text>
                </View>
                <Switch
                  value={config.weekendClasses}
                  onValueChange={(value) => setConfig({...config, weekendClasses: value})}
                  trackColor={{ false: '#E0F2FE', true: '#38BDF8' }}
                  thumbColor={config.weekendClasses ? '#FFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.configItem}>
                <View style={styles.configTextContainer}>
                  <Text style={styles.configLabel}>Notificar nuevas reservas</Text>
                  <Text style={styles.configDescription}>
                    Recibe notificaciones de nuevas solicitudes
                  </Text>
                </View>
                <Switch
                  value={config.notifications}
                  onValueChange={(value) => setConfig({...config, notifications: value})}
                  trackColor={{ false: '#E0F2FE', true: '#38BDF8' }}
                  thumbColor={config.notifications ? '#FFF' : '#f4f3f4'}
                />
              </View>

              <View style={styles.configItem}>
                <View style={styles.configTextContainer}>
                  <Text style={styles.configLabel}>Permitir cancelaciones 24h antes</Text>
                  <Text style={styles.configDescription}>
                    Los estudiantes pueden cancelar hasta 24h antes
                  </Text>
                </View>
                <Switch
                  value={config.allowCancellation}
                  onValueChange={(value) => setConfig({...config, allowCancellation: value})}
                  trackColor={{ false: '#E0F2FE', true: '#38BDF8' }}
                  thumbColor={config.allowCancellation ? '#FFF' : '#f4f3f4'}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => setShowConfigModal(false)}
          >
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSlot = (slot) => {
    if (slot.type === 'reserved') {
      return (
        <View style={styles.slotReserved}>
          <Text style={styles.slotTime}>{slot.time}</Text>
          <Text style={styles.slotStudent}>{slot.student}</Text>
          <Text style={styles.slotSubject}>{slot.subject}</Text>
          <View style={styles.slotModality}>
            <Text style={styles.slotModalityIcon}>
              {slot.modality === 'online' ? '💻' : '🏫'}
            </Text>
            <Text style={styles.slotModalityText}>
              {slot.modality === 'online' ? 'En línea' : 'Presencial'}
            </Text>
          </View>
        </View>
      );
    } else if (slot.type === 'available') {
      return (
        <View style={styles.slotAvailable}>
          <Text style={styles.slotAvailableTime}>{slot.time}</Text>
          <Text style={styles.slotAvailableText}>Disponible</Text>
        </View>
      );
    } else if (slot.type === 'blocked') {
      return (
        <View style={styles.slotBlocked}>
          <Text style={styles.slotBlockedTime}>{slot.time}</Text>
          <Text style={styles.slotBlockedText}>No Disponible</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Disponibilidad y Horario</Text>
          <Text style={styles.headerSubtitle}>Gestiona tu calendario</Text>
        </View>
        <TouchableOpacity 
          style={styles.configButton}
          onPress={() => setShowConfigModal(true)}
        >
          <Text style={styles.configButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Próximas Clases */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>Próximas Clases Programadas</Text>
          </View>

          {scheduledClasses.map((classItem) => (
            <View key={classItem.id} style={styles.classCard}>
              <View style={styles.classCardHeader}>
                <Text style={styles.classStudent}>{classItem.studentName}</Text>
                <Text style={styles.classPrice}>${classItem.price.toFixed(2)}</Text>
              </View>
              <Text style={styles.classSubject}>📚 {classItem.subject}</Text>
              <View style={styles.classDetails}>
                <Text style={styles.classDate}>📅 {classItem.date}</Text>
                <Text style={styles.classTime}>🕐 {classItem.time}</Text>
              </View>
              <View style={styles.classModalityBadge}>
                <Text style={styles.classModalityIcon}>
                  {classItem.modality === 'online' ? '💻' : '🏫'}
                </Text>
                <Text style={styles.classModalityText}>
                  {classItem.modality === 'online' ? 'En línea' : 'Presencial'}
                </Text>
              </View>
              <TouchableOpacity style={styles.classButton}>
                <Text style={styles.classButtonText}>Ver Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Calendario Semanal */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📅</Text>
            <Text style={styles.sectionTitle}>Horario Semanal</Text>
          </View>

          {/* Navegación de semana */}
          <View style={styles.weekNavigation}>
            <TouchableOpacity 
              style={styles.weekNavButton}
              onPress={handlePreviousWeek}
            >
              <Text style={styles.weekNavButtonText}>← Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.weekCurrent}>{currentWeek}</Text>
            <TouchableOpacity 
              style={styles.weekNavButton}
              onPress={handleNextWeek}
            >
              <Text style={styles.weekNavButtonText}>Siguiente →</Text>
            </TouchableOpacity>
          </View>

          {/* Leyenda */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendAvailable]} />
              <Text style={styles.legendText}>Disponible</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendReserved]} />
              <Text style={styles.legendText}>Reservado</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendBlocked]} />
              <Text style={styles.legendText}>No disponible</Text>
            </View>
          </View>

          {/* Grid de horarios */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.scheduleGrid}>
              {weekSchedule.map((day) => (
                <View key={day.day} style={styles.dayColumn}>
                  <View style={styles.dayHeader}>
                    <Text style={styles.dayName}>{day.day}</Text>
                    <Text style={styles.dayDate}>{day.date}</Text>
                  </View>
                  <View style={styles.daySlots}>
                    {day.slots.length > 0 ? (
                      day.slots.map((slot, index) => (
                        <View key={index} style={styles.slotContainer}>
                          {renderSlot(slot)}
                        </View>
                      ))
                    ) : (
                      <View style={styles.emptyDay}>
                        <Text style={styles.emptyDayText}>Sin horarios</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Botón para agregar disponibilidad */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonIcon}>➕</Text>
          <Text style={styles.addButtonText}>Agregar Horario Disponible</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderConfigModal()}
    </View>
  );
};

export default AvailabilityScreen;