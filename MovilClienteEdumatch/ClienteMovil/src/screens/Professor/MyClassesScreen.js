import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './MyClassesScreen.styles';

const MyClassesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Formulario para nueva clase
  const [classForm, setClassForm] = useState({
    title: '',
    subject: '',
    studentName: '',
    date: '',
    time: '',
    duration: '60',
  });

  // Datos simulados de clases
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: 'Introducción a la Física',
      subject: 'Física',
      studentName: 'María González',
      date: '2024-12-01',
      time: '10:00',
      duration: 60,
      price: 5,
      status: 'active',
    },
    {
      id: 2,
      title: 'Álgebra Avanzada',
      subject: 'Matemáticas',
      studentName: 'Carlos Ruiz',
      date: '2024-12-02',
      time: '15:00',
      duration: 60,
      price: 7,
      status: 'active',
    },
  ]);

  // Solicitudes de clases
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: 'Ana López',
      studentAvatar: 'AL',
      rating: 4.9,
      totalClasses: 15,
      subject: 'Cálculo Diferencial',
      title: 'Derivadas y límites',
      description: 'Necesito ayuda urgente para preparar mi examen final de cálculo. Específicamente con derivadas parciales y límites.',
      preferredDate: '2024-12-05',
      time: '16:00',
      duration: 60,
      budget: 8,
      timeAgo: 'Hace 2 horas',
    },
    {
      id: 2,
      studentName: 'Diego Vargas',
      studentAvatar: 'DV',
      rating: 4.7,
      totalClasses: 8,
      subject: 'Física Mecánica',
      title: 'Cinemática y dinámica',
      description: 'Tengo problemas con ejercicios de cinemática y necesito reforzar conceptos de fuerzas y movimiento.',
      preferredDate: '2024-12-06',
      time: '14:00',
      duration: 90,
      budget: 10,
      timeAgo: 'Hace 5 horas',
    },
  ]);

  const subjects = [
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'matematicas', name: 'Matemáticas', icon: '📐' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'calculo', name: 'Cálculo', icon: '📊' },
  ];

  const durations = [
    { value: '30', label: '30 min' },
    { value: '60', label: '60 min' },
    { value: '90', label: '90 min' },
    { value: '120', label: '120 min' },
  ];

  const handleCreateClass = () => {
    if (!classForm.title || !classForm.subject || !classForm.date || !classForm.time) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const newClass = {
      id: classes.length + 1,
      ...classForm,
      price: 5,
      status: 'active',
    };

    setClasses([...classes, newClass]);
    setShowCreateModal(false);
    setClassForm({
      title: '',
      subject: '',
      studentName: '',
      date: '',
      time: '',
      duration: '60',
    });
    Alert.alert('¡Éxito!', 'Clase creada correctamente');
  };

  const handleEditClass = () => {
    if (!classForm.title || !classForm.subject || !classForm.date || !classForm.time) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id ? { ...cls, ...classForm } : cls
    );

    setClasses(updatedClasses);
    setShowEditModal(false);
    setSelectedClass(null);
    Alert.alert('¡Éxito!', 'Clase actualizada correctamente');
  };

  const handleAcceptRequest = (request) => {
    Alert.alert(
      'Aceptar Solicitud',
      `¿Deseas aceptar la solicitud de ${request.studentName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () => {
            const newClass = {
              id: classes.length + 1,
              title: request.title,
              subject: request.subject,
              studentName: request.studentName,
              date: request.preferredDate,
              time: request.time,
              duration: request.duration,
              price: request.budget,
              status: 'active',
            };
            setClasses([...classes, newClass]);
            setRequests(requests.filter(r => r.id !== request.id));
            Alert.alert('¡Éxito!', 'Solicitud aceptada y clase creada');
          },
        },
      ]
    );
  };

  const handleRejectRequest = (requestId) => {
    Alert.alert(
      'Rechazar Solicitud',
      '¿Estás seguro de rechazar esta solicitud?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Rechazar',
          style: 'destructive',
          onPress: () => {
            setRequests(requests.filter(r => r.id !== requestId));
            Alert.alert('Solicitud rechazada');
          },
        },
      ]
    );
  };

  const openEditModal = (classItem) => {
    setSelectedClass(classItem);
    setClassForm({
      title: classItem.title,
      subject: classItem.subject,
      studentName: classItem.studentName,
      date: classItem.date,
      time: classItem.time,
      duration: classItem.duration.toString(),
    });
    setShowEditModal(true);
  };

  const filteredClasses = classes.filter(cls => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return cls.status === 'active';
    if (activeTab === 'completed') return cls.status === 'completed';
    return true;
  });

  const renderClassCard = (classItem) => (
    <View key={classItem.id} style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={styles.classHeaderLeft}>
          <Text style={styles.classTitle}>{classItem.title}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              {classItem.status === 'active' ? 'ACTIVA' : 'COMPLETADA'}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.classSubject}>{classItem.subject}</Text>

      <View style={styles.classDetails}>
        <View style={styles.classDetailItem}>
          <Text style={styles.detailIcon}>👤</Text>
          <Text style={styles.detailText}>{classItem.studentName}</Text>
        </View>

        <View style={styles.classDetailItem}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>{classItem.date}</Text>
        </View>

        <View style={styles.classDetailItem}>
          <Text style={styles.detailIcon}>🕐</Text>
          <Text style={styles.detailText}>{classItem.time}</Text>
        </View>

        <View style={styles.classDetailItem}>
          <Text style={styles.detailIcon}>💵</Text>
          <Text style={styles.detailText}>${classItem.price}</Text>
        </View>
      </View>

      <View style={styles.classActions}>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => openEditModal(classItem)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRequestCard = (request) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.studentInfo}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>{request.studentAvatar}</Text>
          </View>
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>{request.studentName}</Text>
            <View style={styles.studentRating}>
              <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.ratingValue}>{request.rating}</Text>
              <Text style={styles.ratingCount}>• {request.totalClasses} clases</Text>
            </View>
          </View>
        </View>
        <Text style={styles.timeAgo}>{request.timeAgo}</Text>
      </View>

      <View style={styles.subjectBadge}>
        <Text style={styles.subjectBadgeText}>{request.subject}</Text>
      </View>

      <Text style={styles.requestTitle}>{request.title}</Text>
      <Text style={styles.requestDescription}>{request.description}</Text>

      <View style={styles.requestDetails}>
        <View style={styles.requestDetailRow}>
          <View style={styles.requestDetailItem}>
            <Text style={styles.requestDetailIcon}>📅</Text>
            <View>
              <Text style={styles.requestDetailLabel}>Fecha preferida:</Text>
              <Text style={styles.requestDetailValue}>{request.preferredDate}</Text>
            </View>
          </View>
          <View style={styles.requestDetailItem}>
            <Text style={styles.requestDetailIcon}>🕐</Text>
            <View>
              <Text style={styles.requestDetailLabel}>Hora:</Text>
              <Text style={styles.requestDetailValue}>{request.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.requestDetailRow}>
          <View style={styles.requestDetailItem}>
            <Text style={styles.requestDetailIcon}>⏱️</Text>
            <View>
              <Text style={styles.requestDetailLabel}>Duración:</Text>
              <Text style={styles.requestDetailValue}>{request.duration} min</Text>
            </View>
          </View>
          <View style={styles.requestDetailItem}>
            <Text style={styles.requestDetailIcon}>💵</Text>
            <View>
              <Text style={styles.requestDetailLabel}>Presupuesto:</Text>
              <Text style={styles.requestDetailValue}>${request.budget}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={styles.rejectButton}
          onPress={() => handleRejectRequest(request.id)}
        >
          <Text style={styles.rejectButtonText}>✕ Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(request)}
        >
          <Text style={styles.acceptButtonText}>✓ Aceptar y Crear Clase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Mis Clases</Text>
          <Text style={styles.headerSubtitle}>Gestiona tus clases programadas</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.requestsButton}
          onPress={() => setShowRequestsModal(true)}
        >
          <Text style={styles.requestsButtonIcon}>📥</Text>
          <Text style={styles.requestsButtonText}>Solicitudes</Text>
          {requests.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{requests.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.createButtonIcon}>➕</Text>
          <Text style={styles.createButtonText}>Nueva Clase</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            Todas ({classes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Activas ({classes.filter(c => c.status === 'active').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completadas (0)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Classes List */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredClasses.map(renderClassCard)}

        {filteredClasses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No hay clases</Text>
            <Text style={styles.emptyStateText}>
              Crea una nueva clase o revisa las solicitudes de estudiantes
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Create Class Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderIcon}>📝</Text>
              <Text style={styles.modalTitle}>Crear Nueva Clase</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Información de la Clase */}
              <Text style={styles.sectionTitle}>Información de la Clase</Text>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Título de la Clase *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Introducción a la Física"
                    value={classForm.title}
                    onChangeText={(text) => setClassForm({...classForm, title: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Materia *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>
                      {classForm.subject || 'Seleccionar materia'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nombre del Estudiante (opcional)</Text>
                  <View style={styles.inputWithIcon}>
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Nombre del estudiante"
                      value={classForm.studentName}
                      onChangeText={(text) => setClassForm({...classForm, studentName: text})}
                    />
                  </View>
                </View>
              </View>

              {/* Programación */}
              <Text style={styles.sectionTitle}>Programación</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Fecha *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/aaaa"
                    value={classForm.date}
                    onChangeText={(text) => setClassForm({...classForm, date: text})}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Hora *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="--:--"
                    value={classForm.time}
                    onChangeText={(text) => setClassForm({...classForm, time: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Duración (min) *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>{classForm.duration} min</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Detalles Adicionales</Text>
              <View style={styles.additionalSection} />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleCreateClass}
              >
                <Text style={styles.submitButtonIcon}>🔥</Text>
                <Text style={styles.submitButtonText}>Crear Clase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Class Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderIcon}>✏️</Text>
              <Text style={styles.modalTitle}>Editar Clase</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Información de la Clase</Text>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Título de la Clase *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Introducción a la Física"
                    value={classForm.title}
                    onChangeText={(text) => setClassForm({...classForm, title: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Materia *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>
                      {classForm.subject || 'Seleccionar materia'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nombre del Estudiante (opcional)</Text>
                  <View style={styles.inputWithIcon}>
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Nombre del estudiante"
                      value={classForm.studentName}
                      onChangeText={(text) => setClassForm({...classForm, studentName: text})}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Programación</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Fecha *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/aaaa"
                    value={classForm.date}
                    onChangeText={(text) => setClassForm({...classForm, date: text})}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Hora *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="--:--"
                    value={classForm.time}
                    onChangeText={(text) => setClassForm({...classForm, time: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Duración (min) *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>{classForm.duration} min</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Detalles Adicionales</Text>
              <View style={styles.additionalSection} />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleEditClass}
              >
                <Text style={styles.submitButtonIcon}>💾</Text>
                <Text style={styles.submitButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Requests Modal */}
      <Modal
        visible={showRequestsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRequestsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderIcon}>📥</Text>
              <Text style={styles.modalTitle}>Solicitudes de Clases</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowRequestsModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.requestsSubtitle}>
              Gestiona las solicitudes de tus estudiantes
            </Text>

            <View style={styles.requestsTabs}>
              <View style={styles.requestsTab}>
                <Text style={styles.requestsTabTextActive}>Todas ({requests.length})</Text>
              </View>
              <View style={styles.requestsTabInactive}>
                <Text style={styles.requestsTabText}>Pendientes ({requests.length})</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {requests.map(renderRequestCard)}

              {requests.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateIcon}>📭</Text>
                  <Text style={styles.emptyStateTitle}>No hay solicitudes</Text>
                  <Text style={styles.emptyStateText}>
                    Las solicitudes de los estudiantes aparecerán aquí
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyClassesScreen;