import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './TeachingHistoryScreen.styles';

const TeachingHistoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('lastMonth');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Datos simulados del resumen financiero
  const financialSummary = {
    monthlyIncome: 468.50,
    classesThisMonth: 28,
    averagePerClass: 16.73,
    month: 'Noviembre',
  };

  // Datos simulados de clases históricas
  const [classHistory] = useState([
    {
      id: 1,
      studentName: 'Sofía Fernández',
      studentEmail: 'sofia.f@email.com',
      studentAvatar: 'SF',
      subject: 'Matemáticas',
      date: '15 Nov 2024',
      time: '18:00 - 19:30',
      duration: 1.5,
      modality: 'En línea',
      cost: 18.00,
      status: 'completed',
    },
    {
      id: 2,
      studentName: 'Diego Torres',
      studentEmail: 'diego.t@email.com',
      studentAvatar: 'DT',
      subject: 'Física',
      date: '14 Nov 2024',
      time: '09:00 - 11:00',
      duration: 2,
      modality: 'Presencial',
      cost: 30.00,
      status: 'completed',
    },
    {
      id: 3,
      studentName: 'Valentina Parra',
      studentEmail: 'valen.p@email.com',
      studentAvatar: 'VP',
      subject: 'Cálculo',
      date: '13 Nov 2024',
      time: '14:00 - 15:00',
      duration: 1,
      modality: 'En línea',
      cost: 18.00,
      status: 'completed',
    },
    {
      id: 4,
      studentName: 'Javier Ramos',
      studentEmail: 'javier.r@email.com',
      studentAvatar: 'JR',
      subject: 'Matemáticas',
      date: '25 Nov 2024',
      time: '16:00 - 17:30',
      duration: 1.5,
      modality: 'En línea',
      cost: 18.00,
      status: 'scheduled',
    },
    {
      id: 5,
      studentName: 'Ana López',
      studentEmail: 'ana.l@email.com',
      studentAvatar: 'AL',
      subject: 'Física',
      date: '10 Nov 2024',
      time: '10:00 - 11:00',
      duration: 1,
      modality: 'En línea',
      cost: 15.00,
      status: 'cancelled',
    },
  ]);

  const subjects = [
    { value: 'all', label: 'Todas las materias' },
    { value: 'matematicas', label: 'Matemáticas' },
    { value: 'fisica', label: 'Física' },
    { value: 'calculo', label: 'Cálculo' },
    { value: 'quimica', label: 'Química' },
  ];

  const statuses = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'completed', label: 'Completada' },
    { value: 'scheduled', label: 'Programada' },
    { value: 'cancelled', label: 'Cancelada' },
  ];

  const periods = [
    { value: 'lastMonth', label: 'Último mes' },
    { value: 'last3Months', label: 'Últimos 3 meses' },
    { value: 'last6Months', label: 'Últimos 6 meses' },
    { value: 'thisYear', label: 'Este año' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'scheduled':
        return styles.statusScheduled;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusCompleted;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'scheduled':
        return 'Programada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'scheduled':
        return '⏰';
      case 'cancelled':
        return '✕';
      default:
        return '✓';
    }
  };

  const getModalityStyle = (modality) => {
    return modality === 'En línea' ? styles.modalityOnline : styles.modalityPresential;
  };

  const getModalityIcon = (modality) => {
    return modality === 'En línea' ? '💻' : '🏫';
  };

  const renderClassCard = (classItem) => (
    <TouchableOpacity 
      key={classItem.id} 
      style={styles.classCard}
      activeOpacity={0.7}
    >
      {/* Header con Avatar y Info del Estudiante */}
      <View style={styles.classHeader}>
        <View style={styles.studentAvatar}>
          <Text style={styles.studentAvatarText}>{classItem.studentAvatar}</Text>
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{classItem.studentName}</Text>
          <Text style={styles.studentEmail}>{classItem.studentEmail}</Text>
        </View>
        <View style={[styles.statusBadge, getStatusStyle(classItem.status)]}>
          <Text style={styles.statusIcon}>{getStatusIcon(classItem.status)}</Text>
          <Text style={styles.statusText}>{getStatusText(classItem.status)}</Text>
        </View>
      </View>

      {/* Materia y Fecha */}
      <View style={styles.classMainInfo}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectBadgeText}>📚 {classItem.subject}</Text>
        </View>
        <Text style={styles.dateText}>📅 {classItem.date} • {classItem.time}</Text>
      </View>

      {/* Grid de Detalles */}
      <View style={styles.classDetailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Modalidad</Text>
          <View style={getModalityStyle(classItem.modality)}>
            <Text style={styles.modalityIcon}>{getModalityIcon(classItem.modality)}</Text>
            <Text style={styles.modalityText}>{classItem.modality}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Duración</Text>
          <Text style={styles.detailValue}>⏱️ {classItem.duration} hrs</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Costo</Text>
          <Text style={styles.costValue}>💵 ${classItem.cost.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Materia */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Materia</Text>
              {subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.value}
                  style={[
                    styles.filterOption,
                    selectedSubject === subject.value && styles.filterOptionActive
                  ]}
                  onPress={() => setSelectedSubject(subject.value)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedSubject === subject.value && styles.filterOptionTextActive
                  ]}>
                    {subject.label}
                  </Text>
                  {selectedSubject === subject.value && (
                    <Text style={styles.checkIcon}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Estado */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Estado</Text>
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[
                    styles.filterOption,
                    selectedStatus === status.value && styles.filterOptionActive
                  ]}
                  onPress={() => setSelectedStatus(status.value)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedStatus === status.value && styles.filterOptionTextActive
                  ]}>
                    {status.label}
                  </Text>
                  {selectedStatus === status.value && (
                    <Text style={styles.checkIcon}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Periodo */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Periodo</Text>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.value}
                  style={[
                    styles.filterOption,
                    selectedPeriod === period.value && styles.filterOptionActive
                  ]}
                  onPress={() => setSelectedPeriod(period.value)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedPeriod === period.value && styles.filterOptionTextActive
                  ]}>
                    {period.label}
                  </Text>
                  {selectedPeriod === period.value && (
                    <Text style={styles.checkIcon}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Compacto */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Historial</Text>
          <Text style={styles.headerSubtitle}>{financialSummary.classesThisMonth} clases</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Resumen Financiero Compacto */}
        <View style={styles.financialSummary}>
          <View style={styles.summaryMainCard}>
            <Text style={styles.summaryIcon}>💰</Text>
            <View style={styles.summaryMainInfo}>
              <Text style={styles.summaryMainLabel}>Ingresos {financialSummary.month}</Text>
              <Text style={styles.summaryMainValue}>${financialSummary.monthlyIncome.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.summaryStatsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statValue}>{financialSummary.classesThisMonth}</Text>
              <Text style={styles.statLabel}>Clases</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statValue}>${financialSummary.averagePerClass.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
          </View>
        </View>

        {/* Búsqueda y Filtro */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar estudiante..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Clases */}
        <View style={styles.classList}>
          <Text style={styles.sectionTitle}>
            📚 {classHistory.length} Clases
          </Text>
          {classHistory.map(renderClassCard)}

          {classHistory.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📊</Text>
              <Text style={styles.emptyStateTitle}>No hay clases</Text>
              <Text style={styles.emptyStateText}>
                Las clases completadas aparecerán aquí
              </Text>
            </View>
          )}

          {/* Paginación */}
          {classHistory.length > 0 && (
            <View style={styles.pagination}>
              <TouchableOpacity 
                style={[styles.paginationButton, styles.paginationButtonDisabled]}
                disabled
              >
                <Text style={styles.paginationButtonText}>← Anterior</Text>
              </TouchableOpacity>
              <View style={styles.currentPage}>
                <Text style={styles.currentPageText}>Página {currentPage}</Text>
              </View>
              <TouchableOpacity style={styles.paginationButton}>
                <Text style={styles.paginationButtonText}>Siguiente →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {renderFilterModal()}
    </View>
  );
};

export default TeachingHistoryScreen;