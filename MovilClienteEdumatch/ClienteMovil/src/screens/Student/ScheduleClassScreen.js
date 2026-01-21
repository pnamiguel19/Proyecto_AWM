import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './ScheduleClassScreen.styles';

const ScheduleClassScreen = ({ navigation, route }) => {
  const { teacher } = route.params || {};
  
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('teacher');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Datos del profesor
  const teacherData = teacher || {
    name: 'Juan García',
    avatar: '👨‍🏫',
    address: 'Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador',
  };

  const studentAddress = 'Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador';

  const courses = [
    { id: 1, name: 'Física General y Aplicada al Bachillerato' },
    { id: 2, name: 'Física Universitaria - Mecánica' },
  ];

  const platforms = [
    { id: 'zoom', name: 'Zoom', icon: '🎥' },
    { id: 'meet', name: 'Google Meet', icon: '📹' },
    { id: 'teams', name: 'Microsoft Teams', icon: '👥' },
    { id: 'skype', name: 'Skype', icon: '💬' },
  ];

  // Generar semanas desde la actual hacia el futuro (8 semanas)
  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 0; i <= 7; i++) {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay() + 1 + (i * 7)); // Lunes de la semana
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Domingo de la semana
      
      const weekDays = [];
      for (let j = 0; j < 7; j++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + j);
        
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        weekDays.push({
          day: dayNames[currentDay.getDay()],
          date: `${currentDay.getDate()}/${currentDay.getMonth() + 1}`,
          fullDate: currentDay,
        });
      }
      
      weeks.push({
        label: `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`,
        days: weekDays,
      });
    }
    
    return weeks;
  };

  const weeks = generateWeeks();
  const currentWeek = weeks[currentWeekIndex];

  const timeSlots = [
    '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTimeSlotPress = (day, time) => {
    const slotId = `${day}-${time}`;
    if (selectedTimeSlots.includes(slotId)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot !== slotId));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slotId]);
    }
  };

  const isTimeSlotSelected = (day, time) => {
    return selectedTimeSlots.includes(`${day}-${time}`);
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    } else {
      Alert.alert('Aviso', 'Ya estás en la semana actual');
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    } else {
      Alert.alert('Aviso', 'No hay más semanas disponibles');
    }
  };

  const handleGoToCart = () => {
    if (selectedTimeSlots.length === 0) {
      Alert.alert('Aviso', 'Por favor selecciona al menos un horario');
      return;
    }
    if (!selectedCourse) {
      Alert.alert('Aviso', 'Por favor selecciona una materia');
      return;
    }
    if (!selectedModality) {
      Alert.alert('Aviso', 'Por favor selecciona una modalidad');
      return;
    }
    if (selectedModality === 'virtual' && !selectedPlatform) {
      Alert.alert('Aviso', 'Por favor selecciona una plataforma virtual');
      return;
    }

    // Preparar datos de la reserva
    const selectedCourseData = courses.find(c => c.id === selectedCourse);
    const platformData = platforms.find(p => p.id === selectedPlatform);
    
    const bookingData = {
      teacher: {
        name: teacherData.name,
        avatar: teacherData.avatar,
        course: selectedCourseData?.name || '',
        address: teacherData.address,
      },
      modality: selectedModality,
      location: selectedLocation,
      platform: platformData?.name || null,
      timeSlots: selectedTimeSlots.map(slot => {
        const [date, time] = slot.split('-');
        const dayData = currentWeek.days.find(d => d.date === date);
        return {
          day: dayData?.day || '',
          date: date,
          time: `${time} - ${parseInt(time.split(':')[0]) + 1}:00`,
          duration: '1h',
        };
      }),
      description: classDescription,
      pricing: {
        pricePerHour: selectedModality === 'presencial' ? 15.00 : 10.00,
        totalHours: selectedTimeSlots.length,
        subtotal: (selectedModality === 'presencial' ? 15.00 : 10.00) * selectedTimeSlots.length,
        serviceFee: ((selectedModality === 'presencial' ? 15.00 : 10.00) * selectedTimeSlots.length) * 0.05,
        serviceFeePercent: 5,
        total: ((selectedModality === 'presencial' ? 15.00 : 10.00) * selectedTimeSlots.length) * 1.05,
      },
    };

    navigation.navigate('Checkout', { bookingData });
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Clase</Text>
        <View style={styles.headerRight}>
          <Text style={styles.teacherAvatar}>{teacherData.avatar}</Text>
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerIcon}>💡</Text>
        <Text style={styles.infoBannerText}>
          Haz clic en las celdas para seleccionar los horarios. Seleccionados: {selectedTimeSlots.length}
        </Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Calendar Header */}
        <View style={styles.calendarHeaderContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity 
              style={styles.weekButton} 
              onPress={handlePreviousWeek}
              activeOpacity={0.7}
              disabled={currentWeekIndex === 0}
            >
              <Text style={[styles.weekButtonIcon, currentWeekIndex === 0 && styles.weekButtonDisabled]}>◀</Text>
            </TouchableOpacity>
            
            <View style={styles.weekDisplay}>
              <Text style={styles.weekIcon}>📅</Text>
              <Text style={styles.weekText}>{currentWeek.label}</Text>
            </View>

            <TouchableOpacity 
              style={styles.weekButton} 
              onPress={handleNextWeek}
              activeOpacity={0.7}
              disabled={currentWeekIndex === weeks.length - 1}
            >
              <Text style={[styles.weekButtonIcon, currentWeekIndex === weeks.length - 1 && styles.weekButtonDisabled]}>▶</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekIndicator}>
            <Text style={styles.weekIndicatorText}>
              Semana {currentWeekIndex + 1} de {weeks.length}
            </Text>
          </View>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header Row */}
              <View style={styles.calendarRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.columnHeader}>🕐 Hora</Text>
                </View>
                {currentWeek.days.map((day) => (
                  <View key={day.date} style={styles.dayColumn}>
                    <Text style={styles.dayName}>{day.day}</Text>
                    <Text style={styles.dayDate}>{day.date}</Text>
                  </View>
                ))}
              </View>

              {/* Time Slots Rows */}
              {timeSlots.map((time) => (
                <View key={time} style={styles.calendarRow}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                  {currentWeek.days.map((day) => (
                    <TouchableOpacity
                      key={`${day.date}-${time}`}
                      style={[
                        styles.timeSlot,
                        isTimeSlotSelected(day.date, time) && styles.timeSlotSelected,
                      ]}
                      onPress={() => handleTimeSlotPress(day.date, time)}
                      activeOpacity={0.7}
                    >
                      {isTimeSlotSelected(day.date, time) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Course Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ¡Genial! Vamos a agendar tu cita con {teacherData.name}:
          </Text>

          <Text style={styles.label}>Elige la materia que quieres tu clase:</Text>
          <View style={styles.coursesGrid}>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.courseOption,
                  selectedCourse === course.id && styles.courseOptionSelected,
                ]}
                onPress={() => setSelectedCourse(course.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.courseOptionText,
                    selectedCourse === course.id && styles.courseOptionTextSelected,
                  ]}
                >
                  {course.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Class Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Dame una descripción de tu clase:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Describe lo que necesitas aprender o repasar..."
            placeholderTextColor="#999"
            value={classDescription}
            onChangeText={setClassDescription}
          />
        </View>

        {/* Modality Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Elige tu modalidad:</Text>
          <View style={styles.modalityGrid}>
            <TouchableOpacity
              style={[
                styles.modalityOption,
                selectedModality === 'presencial' && styles.modalityOptionSelected,
              ]}
              onPress={() => {
                setSelectedModality('presencial');
                setSelectedPlatform('');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.modalityIcon}>📍</Text>
              <Text
                style={[
                  styles.modalityText,
                  selectedModality === 'presencial' && styles.modalityTextSelected,
                ]}
              >
                Presencial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalityOption,
                selectedModality === 'virtual' && styles.modalityOptionSelected,
              ]}
              onPress={() => {
                setSelectedModality('virtual');
                setSelectedLocation('');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.modalityIcon}>💻</Text>
              <Text
                style={[
                  styles.modalityText,
                  selectedModality === 'virtual' && styles.modalityTextSelected,
                ]}
              >
                Virtual
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Virtual Platform Selection */}
        {selectedModality === 'virtual' && (
          <View style={styles.section}>
            <Text style={styles.label}>Elige la plataforma virtual:</Text>
            <View style={styles.platformsGrid}>
              {platforms.map((platform) => (
                <TouchableOpacity
                  key={platform.id}
                  style={[
                    styles.platformOption,
                    selectedPlatform === platform.id && styles.platformOptionSelected,
                  ]}
                  onPress={() => setSelectedPlatform(platform.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.platformIcon}>{platform.icon}</Text>
                  <Text
                    style={[
                      styles.platformText,
                      selectedPlatform === platform.id && styles.platformTextSelected,
                    ]}
                  >
                    {platform.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Location Selection */}
        {selectedModality === 'presencial' && (
          <View style={styles.section}>
            <Text style={styles.label}>El sitio donde vamos a llevar a cabo la clase:</Text>
            
            <TouchableOpacity
              style={[
                styles.locationOption,
                selectedLocation === 'student' && styles.locationOptionSelected,
              ]}
              onPress={() => setSelectedLocation('student')}
              activeOpacity={0.8}
            >
              <View style={styles.locationRadio}>
                {selectedLocation === 'student' && <View style={styles.locationRadioInner} />}
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Mi ubicación:</Text>
                <Text style={styles.locationAddress}>{studentAddress}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.locationOption,
                styles.locationOptionTeacher,
                selectedLocation === 'teacher' && styles.locationOptionSelected,
              ]}
              onPress={() => setSelectedLocation('teacher')}
              activeOpacity={0.8}
            >
              <View style={styles.locationRadio}>
                {selectedLocation === 'teacher' && <View style={styles.locationRadioInner} />}
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Ubicación del Profesor:</Text>
                <Text style={styles.locationAddress}>{teacherData.address}</Text>
              </View>
            </TouchableOpacity>

            {/* Map Section */}
            {selectedLocation === 'teacher' && (
              <View style={styles.mapSection}>
                <View style={styles.mapHeader}>
                  <Text style={styles.mapIcon}>📍</Text>
                  <Text style={styles.mapTitle}>Ubicación del Profesor</Text>
                </View>
                <Text style={styles.mapAddress}>{teacherData.address}</Text>
                
                <View style={styles.mapContainer}>
                  <Text style={styles.mapEmoji}>🗺️</Text>
                  <Text style={styles.mapText}>Mapa de ubicación</Text>
                  <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
                    <Text style={styles.mapButtonText}>📍 Ampliar el mapa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.returnButton} 
          onPress={handleReturn}
          activeOpacity={0.8}
        >
          <Text style={styles.returnButtonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={handleGoToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.cartButtonIcon}>🛒</Text>
          <Text style={styles.cartButtonText}>Ir a la caja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleClassScreen;