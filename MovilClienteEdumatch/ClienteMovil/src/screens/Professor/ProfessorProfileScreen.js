import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './ProfessorProfileScreen.styles';

const ProfessorProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('info');

  // Datos del profesor (simulados)
  const professorData = {
    name: 'Juan Pérez',
    role: 'Profesor de Física / Matemáticas',
    avatar: '👨‍🏫',
    verified: true,
    description: 'Profesor de matemáticas con 15 años de experiencia. Especializado en preparación universitaria.',
    fullName: 'Juan Andrés Pérez Rodríguez',
    birthDate: '1985-06-15',
    city: 'Quito, Ecuador',
    email: 'juan.perez@professor.com',
    phone: '+593 99 111 2222',
    yearsExperience: 8,
    subjects: ['Física General', 'Física Universitaria - Mecánica', 'Matemáticas'],
    rating: 4.8,
    totalReviews: 127,
    totalClasses: 450,
  };

  const menuItems = [
    { id: 'info', label: 'Información sobre mí', icon: '👤', color: '#00BCD4' },
    { id: 'classes', label: 'Mis Clases', icon: '📚', color: '#FF9800' },
    { id: 'courses', label: 'Mis Cursos', icon: '📖', color: '#9C27B0' },
    { id: 'history', label: 'Mi historial de Enseñanza', icon: '📊', color: '#4CAF50' },
    { id: 'availability', label: 'Disponibilidad y Horario', icon: '📅', color: '#2196F3' },
    { id: 'documents', label: 'Documentos de Acreditación', icon: '📄', color: '#FF5722' },
    { id: 'reviews', label: 'Mis Calificaciones y reseñas', icon: '⭐', color: '#FFC107' },
  ];

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'La edición de perfil estará disponible pronto');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options).split('/').reverse().join('-');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View style={styles.contentSection}>
            {/* Información Personal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información Personal</Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>👤</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>NOMBRE COMPLETO</Text>
                    <Text style={styles.infoValue}>{professorData.fullName}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>🎂</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>FECHA DE NACIMIENTO</Text>
                    <Text style={styles.infoValue}>{formatDate(professorData.birthDate)}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📍</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>CIUDAD</Text>
                    <Text style={styles.infoValue}>{professorData.city}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📧</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>CORREO ELECTRÓNICO</Text>
                    <Text style={[styles.infoValue, styles.infoValueLink]}>
                      {professorData.email}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📱</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>TELÉFONO</Text>
                    <Text style={styles.infoValue}>{professorData.phone}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>💼</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>AÑOS DE EXPERIENCIA</Text>
                    <Text style={styles.infoValue}>{professorData.yearsExperience} años</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Banner de verificación */}
            <View style={styles.verificationBanner}>
              <View style={styles.verificationIcon}>
                <Text style={styles.verificationCheckmark}>✓</Text>
              </View>
              <Text style={styles.verificationText}>
                Tu identidad ha sido verificada.
              </Text>
            </View>
          </View>
        );

      case 'classes':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>📚</Text>
              </View>
              <Text style={styles.myClassesTitle}>Mis Clases Programadas</Text>
              <Text style={styles.myClassesDescription}>
                Aquí verás todas tus clases programadas y completadas
              </Text>
              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('MyClasses')}
              >
                <Text style={styles.myClassesButtonIcon}>📚</Text>
                <Text style={styles.myClassesButtonText}>Ver Mis Clases</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'courses':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>📚</Text>
              </View>
              <Text style={styles.myClassesTitle}>Mis Cursos</Text>
              <Text style={styles.myClassesDescription}>
                Crea y gestiona tus cursos educativos
              </Text>
              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('MyCourses')}
              >
                <Text style={styles.myClassesButtonIcon}>📖</Text>
                <Text style={styles.myClassesButtonText}>Ver Mis Cursos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'history':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>📊</Text>
              </View>
              <Text style={styles.myClassesTitle}>Historial de Enseñanza</Text>
              <Text style={styles.myClassesDescription}>
                Revisa tu historial completo de clases impartidas
              </Text>
              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('TeachingHistory')}
              >
                <Text style={styles.myClassesButtonIcon}>📈</Text>
                <Text style={styles.myClassesButtonText}>Ver Historial</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'availability':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>📅</Text>
              </View>
              <Text style={styles.myClassesTitle}>Disponibilidad y Horario</Text>
              <Text style={styles.myClassesDescription}>
                Configura tu disponibilidad y horarios para recibir estudiantes
              </Text>
              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Availability')}
              >
                <Text style={styles.myClassesButtonIcon}>⚙️</Text>
                <Text style={styles.myClassesButtonText}>Ver Disponibilidad</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'documents':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>📄</Text>
              </View>
              <Text style={styles.myClassesTitle}>Documentos de Acreditación</Text>
              <Text style={styles.myClassesDescription}>
                Sube tus títulos, certificados y documentos de acreditación
              </Text>
              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Documents')}
              >
                <Text style={styles.myClassesButtonIcon}>📤</Text>
                <Text style={styles.myClassesButtonText}>Ver Documentos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.contentSection}>
            <View style={styles.myClassesCard}>
              <View style={styles.myClassesIconContainer}>
                <Text style={styles.myClassesIcon}>⭐</Text>
              </View>
              <Text style={styles.myClassesTitle}>Mis Calificaciones y Reseñas</Text>
              <Text style={styles.myClassesDescription}>
                Consulta todas las reseñas y calificaciones de tus estudiantes
              </Text>
              
              {/* Resumen rápido */}
              <View style={styles.reviewsSummaryQuick}>
                <View style={styles.quickStatItem}>
                  <Text style={styles.quickStatValue}>{professorData.rating}</Text>
                  <Text style={styles.quickStatLabel}>Calificación</Text>
                </View>
                <View style={styles.quickStatDivider} />
                <View style={styles.quickStatItem}>
                  <Text style={styles.quickStatValue}>{professorData.totalReviews}</Text>
                  <Text style={styles.quickStatLabel}>Reseñas</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.myClassesButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Reviews')}
              >
                <Text style={styles.myClassesButtonIcon}>⭐</Text>
                <Text style={styles.myClassesButtonText}>Ver Todas las Reseñas</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLarge}>{professorData.avatar}</Text>
            {professorData.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{professorData.name}</Text>
            <Text style={styles.profileRole}>{professorData.role}</Text>
            <Text style={styles.profileDescription}>{professorData.description}</Text>
          </View>
        </View>
      </View>

      {/* Horizontal Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tab,
                activeTab === item.id && styles.tabActive,
                { borderBottomColor: item.color },
              ]}
              onPress={() => setActiveTab(item.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === item.id && styles.tabIconActive,
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === item.id && [styles.tabLabelActive, { color: item.color }],
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContentContainer}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default ProfessorProfileScreen;