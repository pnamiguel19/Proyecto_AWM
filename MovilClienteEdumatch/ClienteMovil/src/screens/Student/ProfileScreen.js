import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('info');

  // Datos del estudiante (simulados)
  const studentData = {
    name: 'Juan Estudiante',
    role: 'Estudiante',
    avatar: '👨‍🎓',
    verified: true,
    fullName: 'Juan Carlos Estudiante Pérez',
    birthDate: '15 de marzo de 2005',
    city: 'Quito, Ecuador',
    email: 'estudiante@edumatch.com',
    phone: '+593 9 1234 5678',
    educationLevel: 'Universitario',
  };

  const menuItems = [
    { id: 'info', label: 'Información', icon: '👤', color: '#00BCD4' },
    { id: 'classes', label: 'Mis Clases', icon: '📚', color: '#FF9800' },
    { id: 'teachers', label: 'Profesores', icon: '👨‍🏫', color: '#4CAF50' },
    { id: 'reviews', label: 'Reseñas', icon: '⭐', color: '#FFC107' },
  ];

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'La edición de perfil estará disponible pronto');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View style={styles.contentSection}>
            {/* Información Personal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📋 Información Personal</Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>👤</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>NOMBRE COMPLETO</Text>
                    <Text style={styles.infoValue}>{studentData.fullName}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>🎂</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>FECHA DE NACIMIENTO</Text>
                    <Text style={styles.infoValue}>{studentData.birthDate}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📍</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>CIUDAD</Text>
                    <Text style={styles.infoValue}>{studentData.city}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📧</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>CORREO ELECTRÓNICO</Text>
                    <Text style={[styles.infoValue, styles.infoValueLink]}>
                      {studentData.email}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>📱</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>TELÉFONO</Text>
                    <Text style={styles.infoValue}>{studentData.phone}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>🎓</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>NIVEL EDUCATIVO</Text>
                    <Text style={styles.infoValue}>{studentData.educationLevel}</Text>
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
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIconContainer}>
                <Text style={styles.emptyStateIcon}>📚</Text>
              </View>
              <Text style={styles.emptyStateTitle}>Mis Clases</Text>
              <Text style={styles.emptyStateText}>
                Aquí verás todas tus clases programadas y completadas
              </Text>
              <TouchableOpacity style={styles.emptyStateButton}>
                <Text style={styles.emptyStateButtonIcon}>🔍</Text>
                <Text style={styles.emptyStateButtonText}>Buscar Profesores</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'teachers':
        return (
          <View style={styles.contentSection}>
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIconContainer}>
                <Text style={styles.emptyStateIcon}>👨‍🏫</Text>
              </View>
              <Text style={styles.emptyStateTitle}>Mis Profesores</Text>
              <Text style={styles.emptyStateText}>
                Aquí verás la lista de profesores con los que has tomado clases
              </Text>
              <TouchableOpacity style={styles.emptyStateButton}>
                <Text style={styles.emptyStateButtonIcon}>🌟</Text>
                <Text style={styles.emptyStateButtonText}>Explorar Profesores</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.contentSection}>
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIconContainer}>
                <Text style={styles.emptyStateIcon}>⭐</Text>
              </View>
              <Text style={styles.emptyStateTitle}>Reseñas</Text>
              <Text style={styles.emptyStateText}>
                Aquí verás las reseñas que has dejado a tus profesores
              </Text>
              <TouchableOpacity style={styles.emptyStateButton}>
                <Text style={styles.emptyStateButtonIcon}>✍️</Text>
                <Text style={styles.emptyStateButtonText}>Escribir Reseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const getActiveTabLabel = () => {
    const activeItem = menuItems.find((item) => item.id === activeTab);
    return activeItem ? activeItem.label : '';
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
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLarge}>{studentData.avatar}</Text>
            {studentData.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{studentData.name}</Text>
            <Text style={styles.profileRole}>{studentData.role}</Text>
          </View>
        </View>
      </View>

      {/* Horizontal Menu Tabs */}
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
                  activeTab === item.id && styles.tabLabelActive,
                ]}
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

export default ProfileScreen;