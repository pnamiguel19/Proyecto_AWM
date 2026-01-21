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
import styles from './MyCoursesScreen.styles';

const MyCoursesScreen = ({ navigation }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Formulario para nuevo curso
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    imageUrl: '',
  });

  // Datos simulados de cursos
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Curso Completo de Física',
      description: 'Aprende los fundamentos de la física desde cero hasta nivel avanzado',
      category: 'Física',
      level: 'Intermedio',
      price: 45,
      students: 125,
      modules: 8,
      rating: 4.8,
      status: 'published',
      modulesList: [
        { id: 1, title: 'Módulo 1: Introducción', lessons: 2 },
        { id: 2, title: 'Módulo 2: Fundamentos', lessons: 2 },
      ],
    },
    {
      id: 2,
      title: 'Matemáticas para Bachillerato',
      description: 'Domina las matemáticas necesarias para aprobar el bachillerato',
      category: 'Matemáticas',
      level: 'Intermedio',
      price: 35,
      students: 0,
      modules: 5,
      rating: 0,
      status: 'draft',
      modulesList: [],
    },
  ]);

  // Solicitudes de cursos
  const [courseRequests, setCourseRequests] = useState([
    {
      id: 1,
      studentName: 'Laura Méndez',
      studentAvatar: 'LM',
      rating: 4.8,
      totalCourses: 8,
      courseTitle: 'Cálculo Integral Avanzado',
      category: 'Matemáticas',
      level: 'Avanzado',
      description: 'Necesito un curso completo que cubra integrales definidas e indefinidas, aplicaciones de integración, y técnicas avanzadas. Me gustaría que incluya ejercicios prácticos y aplicaciones en física.',
      suggestedModules: [
        'Fundamentos de integración',
        'Integrales definidas e indefinidas',
        'Técnicas de integración',
        'Aplicaciones en física y geometría',
        'Ejercicios y problemas resueltos',
      ],
      interestedStudents: 15,
      timeAgo: 'Hace 1 día',
    },
  ]);

  const categories = [
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'matematicas', name: 'Matemáticas', icon: '📐' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'calculo', name: 'Cálculo', icon: '📊' },
  ];

  const levels = [
    { value: 'basico', label: 'Básico', icon: '🌱' },
    { value: 'intermedio', label: 'Intermedio', icon: '📈' },
    { value: 'avanzado', label: 'Avanzado', icon: '🚀' },
  ];

  const handleCreateCourse = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.category || !courseForm.level) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const newCourse = {
      id: courses.length + 1,
      ...courseForm,
      price: parseFloat(courseForm.price) || 0,
      students: 0,
      modules: 0,
      rating: 0,
      status: 'draft',
      modulesList: [],
    };

    setCourses([...courses, newCourse]);
    setShowCreateModal(false);
    setCourseForm({
      title: '',
      description: '',
      category: '',
      level: '',
      price: '',
      imageUrl: '',
    });
    Alert.alert('¡Éxito!', 'Curso creado correctamente');
  };

  const handleEditCourse = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.category || !courseForm.level) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const updatedCourses = courses.map(course =>
      course.id === selectedCourse.id ? { ...course, ...courseForm, price: parseFloat(courseForm.price) } : course
    );

    setCourses(updatedCourses);
    setShowEditModal(false);
    setSelectedCourse(null);
    Alert.alert('¡Éxito!', 'Curso actualizado correctamente');
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.price.toString(),
      imageUrl: course.imageUrl || '',
    });
    setShowEditModal(true);
  };

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    setShowCourseDetailModal(true);
  };

  const handleAcceptRequest = (request) => {
    Alert.alert(
      'Aceptar Solicitud',
      `¿Deseas crear un curso basado en la solicitud de ${request.studentName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear Curso',
          onPress: () => {
            const newCourse = {
              id: courses.length + 1,
              title: request.courseTitle,
              description: request.description,
              category: request.category,
              level: request.level,
              price: 50,
              students: request.interestedStudents,
              modules: request.suggestedModules.length,
              rating: 0,
              status: 'draft',
              modulesList: request.suggestedModules.map((module, index) => ({
                id: index + 1,
                title: module,
                lessons: 0,
              })),
            };
            setCourses([...courses, newCourse]);
            setCourseRequests(courseRequests.filter(r => r.id !== request.id));
            Alert.alert('¡Éxito!', 'Curso creado basado en la solicitud');
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
            setCourseRequests(courseRequests.filter(r => r.id !== requestId));
            Alert.alert('Solicitud rechazada');
          },
        },
      ]
    );
  };

  const renderCourseCard = (course) => (
    <TouchableOpacity 
      key={course.id} 
      style={styles.courseCard}
      onPress={() => openCourseDetail(course)}
    >
      <View style={styles.courseImageContainer}>
        <View style={[styles.statusBadge, course.status === 'published' ? styles.publishedBadge : styles.draftBadge]}>
          <Text style={styles.statusBadgeText}>
            {course.status === 'published' ? 'PUBLICADO' : 'BORRADOR'}
          </Text>
        </View>
        <Text style={styles.courseImagePlaceholder}>📚</Text>
      </View>

      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription} numberOfLines={2}>
          {course.description}
        </Text>

        <View style={styles.courseStats}>
          <View style={styles.courseStat}>
            <Text style={styles.courseStatIcon}>📖</Text>
            <Text style={styles.courseStatText}>{course.modules} módulos</Text>
          </View>
          <View style={styles.courseStat}>
            <Text style={styles.courseStatIcon}>👥</Text>
            <Text style={styles.courseStatText}>{course.students} estudiantes</Text>
          </View>
          <View style={styles.courseStat}>
            <Text style={styles.courseStatIcon}>⭐</Text>
            <Text style={styles.courseStatText}>
              {course.rating > 0 ? course.rating : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.courseFooter}>
          <Text style={styles.coursePrice}>${course.price}</Text>
          <View style={styles.courseActions}>
            <TouchableOpacity 
              style={styles.courseActionButton}
              onPress={() => openCourseDetail(course)}
            >
              <Text style={styles.courseActionIcon}>👁️</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.courseActionButton}
              onPress={() => openEditModal(course)}
            >
              <Text style={styles.courseActionIcon}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.courseActionButton}>
              <Text style={styles.courseActionIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
              <Text style={styles.ratingCount}>• {request.totalCourses} cursos</Text>
            </View>
          </View>
        </View>
        <View style={styles.interestedBadge}>
          <Text style={styles.interestedIcon}>👥</Text>
          <Text style={styles.interestedText}>{request.interestedStudents} interesados</Text>
        </View>
      </View>

      <View style={styles.requestTitleRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{request.category}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>{request.level}</Text>
        </View>
      </View>

      <Text style={styles.requestTitle}>{request.courseTitle}</Text>
      <Text style={styles.requestDescription}>{request.description}</Text>

      <View style={styles.modulesSection}>
        <View style={styles.modulesSectionHeader}>
          <Text style={styles.modulesSectionIcon}>📋</Text>
          <Text style={styles.modulesSectionTitle}>Módulos sugeridos:</Text>
        </View>
        {request.suggestedModules.map((module, index) => (
          <View key={index} style={styles.moduleItem}>
            <View style={styles.moduleNumber}>
              <Text style={styles.moduleNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.moduleText}>{module}</Text>
          </View>
        ))}
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
          <Text style={styles.acceptButtonText}>✓ Crear Curso</Text>
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
          <Text style={styles.headerTitle}>Mis Cursos</Text>
          <Text style={styles.headerSubtitle}>Crea y gestiona tus cursos educativos</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.requestsButton}
          onPress={() => setShowRequestsModal(true)}
        >
          <Text style={styles.requestsButtonIcon}>📥</Text>
          <Text style={styles.requestsButtonText}>Solicitudes de Cursos</Text>
          {courseRequests.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{courseRequests.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.createButtonIcon}>➕</Text>
          <Text style={styles.createButtonText}>Nuevo Curso</Text>
        </TouchableOpacity>
      </View>

      {/* Courses Grid */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coursesGrid}>
          {courses.map(renderCourseCard)}
        </View>

        {courses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No hay cursos</Text>
            <Text style={styles.emptyStateText}>
              Crea tu primer curso o revisa las solicitudes de estudiantes
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Create Course Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderIcon}>📚</Text>
              <Text style={styles.modalTitle}>Crear Nuevo Curso</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Información Básica</Text>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Título del Curso *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Curso Completo de Física"
                    value={courseForm.title}
                    onChangeText={(text) => setCourseForm({...courseForm, title: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Descripción *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe de qué trata tu curso, qué aprenderán los estudiantes y qué conocimientos previos necesitan..."
                    value={courseForm.description}
                    onChangeText={(text) => setCourseForm({...courseForm, description: text})}
                    multiline
                    numberOfLines={4}
                  />
                  <Text style={styles.characterCount}>0 caracteres</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Categorización</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Categoría *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>
                      {courseForm.category || 'Seleccionar categoría'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Nivel *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>
                      {courseForm.level || 'Seleccionar nivel'}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Detalles Adicionales</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Precio *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={courseForm.price}
                    onChangeText={(text) => setCourseForm({...courseForm, price: text})}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>URL de Imagen (opcional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="https://..."
                    value={courseForm.imageUrl}
                    onChangeText={(text) => setCourseForm({...courseForm, imageUrl: text})}
                  />
                </View>
              </View>
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
                onPress={handleCreateCourse}
              >
                <Text style={styles.submitButtonIcon}>🔥</Text>
                <Text style={styles.submitButtonText}>Crear Curso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Course Modal */}
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
              <Text style={styles.modalTitle}>Editar Curso</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Información Básica</Text>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Título del Curso *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Curso Completo de Física"
                    value={courseForm.title}
                    onChangeText={(text) => setCourseForm({...courseForm, title: text})}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Descripción *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe de qué trata tu curso..."
                    value={courseForm.description}
                    onChangeText={(text) => setCourseForm({...courseForm, description: text})}
                    multiline
                    numberOfLines={4}
                  />
                  <Text style={styles.characterCount}>{courseForm.description.length} caracteres</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Categorización</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Categoría *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>{courseForm.category}</Text>
                  </View>
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Nivel *</Text>
                  <View style={styles.select}>
                    <Text style={styles.selectText}>{courseForm.level}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Detalles Adicionales</Text>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Precio *</Text>
                  <TextInput
                    style={styles.input}
                    value={courseForm.price}
                    onChangeText={(text) => setCourseForm({...courseForm, price: text})}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>URL de Imagen (opcional)</Text>
                  <TextInput
                    style={styles.input}
                    value={courseForm.imageUrl}
                    onChangeText={(text) => setCourseForm({...courseForm, imageUrl: text})}
                  />
                </View>
              </View>
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
                onPress={handleEditCourse}
              >
                <Text style={styles.submitButtonIcon}>💾</Text>
                <Text style={styles.submitButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Course Detail Modal */}
      <Modal
        visible={showCourseDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCourseDetailModal(false)}
      >
        {selectedCourse && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderIcon}>📚</Text>
                <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowCourseDetailModal(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Contenido del Curso</Text>

                <View style={styles.modulesList}>
                  {selectedCourse.modulesList.length > 0 ? (
                    selectedCourse.modulesList.map((module) => (
                      <View key={module.id} style={styles.moduleCard}>
                        <View style={styles.moduleHeader}>
                          <Text style={styles.moduleIcon}>📖</Text>
                          <Text style={styles.moduleTitle}>{module.title}</Text>
                        </View>
                        <Text style={styles.moduleLessons}>{module.lessons} lecciones</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.emptyModules}>
                      <Text style={styles.emptyModulesText}>
                        No hay módulos creados aún
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.addModuleButton}>
                  <Text style={styles.addModuleButtonText}>+ Agregar Módulo</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.closeModalButton}>
                  <Text style={styles.closeModalButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
              <Text style={styles.modalTitle}>Solicitudes de Cursos</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowRequestsModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.requestsSubtitle}>
              Estudiantes solicitando nuevos cursos
            </Text>

            <View style={styles.requestsTabs}>
              <View style={styles.requestsTab}>
                <Text style={styles.requestsTabTextActive}>Todas ({courseRequests.length})</Text>
              </View>
              <View style={styles.requestsTabInactive}>
                <Text style={styles.requestsTabText}>Pendientes ({courseRequests.length})</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {courseRequests.map(renderRequestCard)}

              {courseRequests.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateIcon}>📭</Text>
                  <Text style={styles.emptyStateTitle}>No hay solicitudes</Text>
                  <Text style={styles.emptyStateText}>
                    Las solicitudes de cursos aparecerán aquí
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

export default MyCoursesScreen;