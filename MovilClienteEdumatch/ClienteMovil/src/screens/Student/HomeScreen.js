import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './HomeScreen.styles';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const menuScale = useRef(new Animated.Value(0)).current;
  const filterSlide = useRef(new Animated.Value(0)).current;

  // Datos de usuario (simulado)
  const currentUser = {
    name: 'Juan Estudiante',
    email: 'estudiante@edumatch.com',
    avatar: '👨‍🎓',
  };

  const subjects = [
    { id: 'math', name: 'Matemáticas', icon: '🔢' },
    { id: 'physics', name: 'Física', icon: '⚛️' },
    { id: 'chemistry', name: 'Química', icon: '🧪' },
    { id: 'biology', name: 'Biología', icon: '🧬' },
    { id: 'english', name: 'Inglés', icon: '🇬🇧' },
    { id: 'history', name: 'Historia', icon: '📜' },
    { id: 'programming', name: 'Programación', icon: '💻' },
    { id: 'art', name: 'Arte', icon: '🎨' },
  ];

  const levels = [
    { id: 'primary', name: 'Primaria', icon: '📚' },
    { id: 'secondary', name: 'Secundaria', icon: '📖' },
    { id: 'high_school', name: 'Bachillerato', icon: '🎓' },
    { id: 'university', name: 'Universidad', icon: '🏛️' },
    { id: 'adult', name: 'Adultos', icon: '👔' },
  ];

  const modalities = [
    { id: 'in_person', name: 'Presencial', icon: '🏫' },
    { id: 'online', name: 'Virtual', icon: '💻' },
    { id: 'hybrid', name: 'Híbrido', icon: '🔄' },
  ];

  const recommendedTeachers = [
    {
      id: 1,
      name: 'Laura Torres',
      subject: 'Programación - Secundaria',
      modality: 'Virtual',
      rating: 5,
      reviews: 156,
      image: '👩‍🏫',
    },
    {
      id: 2,
      name: 'Diego Ramírez',
      subject: 'Historia - Primaria',
      modality: 'Presencial / Virtual / Híbrido',
      rating: 4.6,
      reviews: 423,
      image: '👨‍🏫',
    },
    {
      id: 3,
      name: 'Patricia Morales',
      subject: 'Biología - Secundaria',
      modality: 'Presencial / Virtual',
      rating: 4.8,
      reviews: 198,
      image: '👩‍🏫',
    },
  ];

  const expertsTeachers = [
    {
      id: 4,
      name: 'Juan Pérez',
      subject: 'Matemáticas - Secundaria',
      modality: 'Presencial / Virtual',
      rating: 4.8,
      reviews: 245,
      image: '👨‍🏫',
    },
    {
      id: 5,
      name: 'María Sánchez',
      subject: 'Inglés - Primaria',
      modality: 'Virtual / Híbrido',
      rating: 4.9,
      reviews: 189,
      image: '👩‍🏫',
    },
    {
      id: 6,
      name: 'Roberto Gómez',
      subject: 'Física - Secundaria',
      modality: 'Presencial / Virtual',
      rating: 4.7,
      reviews: 312,
      image: '👨‍🏫',
    },
  ];

  const featuredTeachers = [
    {
      id: 7,
      name: 'Juan García',
      subject: 'Física - Bachillerato',
      modality: 'Virtual / Presencial',
      rating: 4.8,
      reviews: 35,
      image: '👨‍🏫',
    },
    {
      id: 8,
      name: 'María López',
      subject: 'Matemáticas - Primaria y Secundaria',
      modality: 'Virtual / Presencial',
      rating: 4.9,
      reviews: 42,
      image: '👩‍🏫',
    },
    {
      id: 9,
      name: 'Carlos Pérez',
      subject: 'Química - Bachillerato',
      modality: 'Virtual',
      rating: 4.7,
      reviews: 28,
      image: '👨‍🏫',
    },
  ];

  const toggleUserMenu = () => {
    const toValue = showUserMenu ? 0 : 1;
    setShowUserMenu(!showUserMenu);

    Animated.spring(menuScale, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    
    Animated.timing(filterSlide, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            setShowUserMenu(false);
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const handleViewProfile = () => {
    setShowUserMenu(false);
    navigation.navigate('StudentProfile');
  };

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedLevel('');
    setSelectedModality('');
  };

  const applyFilters = () => {
    toggleFilters();
    console.log('Filtros aplicados:', {
      subject: selectedSubject,
      level: selectedLevel,
      modality: selectedModality,
    });
    Alert.alert('Filtros aplicados', 'Buscando profesores con los filtros seleccionados...');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedSubject) count++;
    if (selectedLevel) count++;
    if (selectedModality) count++;
    return count;
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  const renderTeacherCard = ({ item, index }) => {
    return (
      <View style={styles.teacherCardWrapper}>
        <TouchableOpacity
          style={styles.teacherCard}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('TeacherProfile', { teacher: item });
          }}
        >
          <View style={styles.teacherImageContainer}>
            <Text style={styles.teacherImage}>{item.image}</Text>
          </View>

          <View style={styles.teacherInfo}>
            <Text style={styles.teacherName}>{item.name}</Text>
            <Text style={styles.teacherSubject}>{item.subject}</Text>
            <Text style={styles.teacherModality}>{item.modality}</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingValue}>{item.rating}</Text>
              <Text style={styles.ratingReviews}>({item.reviews})</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header con animación */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{ scale: headerScale }],
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🎓</Text>
            <Text style={styles.logoText}>EduMatch</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => Alert.alert('Notificaciones', 'Tienes 3 notificaciones nuevas')}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userButton} onPress={toggleUserMenu}>
              <Text style={styles.userAvatar}>{currentUser.avatar}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="¿Qué quieres aprender hoy?"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Botón de Filtros */}
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
          <Text style={styles.filterButtonIcon}>🔧</Text>
          <Text style={styles.filterButtonText}>Filtros de Búsqueda</Text>
          {getActiveFiltersCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Menú de Usuario */}
      <Modal
        visible={showUserMenu}
        transparent
        animationType="none"
        onRequestClose={toggleUserMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleUserMenu}
        >
          <Animated.View
            style={[
              styles.userMenu,
              {
                transform: [
                  {
                    scale: menuScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
                opacity: menuScale,
              },
            ]}
          >
            <View style={styles.userMenuHeader}>
              <Text style={styles.userMenuAvatar}>{currentUser.avatar}</Text>
              <View style={styles.userMenuInfo}>
                <Text style={styles.userMenuName}>{currentUser.name}</Text>
                <Text style={styles.userMenuEmail}>{currentUser.email}</Text>
              </View>
            </View>

            <View style={styles.userMenuDivider} />

            <TouchableOpacity style={styles.userMenuItem} onPress={handleViewProfile}>
              <Text style={styles.userMenuIcon}>👤</Text>
              <Text style={styles.userMenuText}>Ver Perfil</Text>
            </TouchableOpacity>

            <View style={styles.userMenuDivider} />

            <TouchableOpacity
              style={[styles.userMenuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Text style={styles.userMenuIcon}>🚪</Text>
              <Text style={[styles.userMenuText, styles.logoutText]}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de Filtros - Pantalla Completa */}
      <Modal
        visible={showFilters}
        transparent
        animationType="none"
        onRequestClose={toggleFilters}
      >
        <Animated.View
          style={[
            styles.filterModalFullScreen,
            {
              transform: [
                {
                  translateY: filterSlide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.filterModalHeader}>
            <Text style={styles.filterModalTitle}>🔧 Filtros de Búsqueda</Text>
            <TouchableOpacity onPress={toggleFilters} style={styles.filterModalCloseButton}>
              <Text style={styles.filterModalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterModalContent} showsVerticalScrollIndicator={false}>
            {/* Materia */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>📚 Materia</Text>
              <Text style={styles.filterSectionSubtitle}>¿Qué quieres aprender?</Text>
              <View style={styles.filterOptions}>
                {subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    style={[
                      styles.filterOption,
                      selectedSubject === subject.id && styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedSubject(subject.id)}
                  >
                    <Text style={styles.filterOptionIcon}>{subject.icon}</Text>
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedSubject === subject.id && styles.filterOptionTextSelected,
                      ]}
                    >
                      {subject.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Nivel Educativo */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>🎓 Nivel Educativo</Text>
              <Text style={styles.filterSectionSubtitle}>¿En qué grado te encuentras?</Text>
              <View style={styles.filterOptions}>
                {levels.map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.filterOption,
                      selectedLevel === level.id && styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedLevel(level.id)}
                  >
                    <Text style={styles.filterOptionIcon}>{level.icon}</Text>
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedLevel === level.id && styles.filterOptionTextSelected,
                      ]}
                    >
                      {level.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modalidad */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>💻 Modalidad</Text>
              <Text style={styles.filterSectionSubtitle}>¿Cómo quieres recibir tu clase?</Text>
              <View style={styles.filterOptions}>
                {modalities.map((modality) => (
                  <TouchableOpacity
                    key={modality.id}
                    style={[
                      styles.filterOption,
                      selectedModality === modality.id && styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedModality(modality.id)}
                  >
                    <Text style={styles.filterOptionIcon}>{modality.icon}</Text>
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedModality === modality.id && styles.filterOptionTextSelected,
                      ]}
                    >
                      {modality.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterModalFooter}>
            <TouchableOpacity style={styles.filterClearButton} onPress={clearFilters}>
              <Text style={styles.filterClearButtonText}>🗑️ Limpiar Todo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterApplyButton} onPress={applyFilters}>
              <Text style={styles.filterApplyButtonText}>✓ Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        {/* Los más recomendados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⭐ Los más recomendados por padres y estudiantes
          </Text>
          <FlatList
            data={recommendedTeachers}
            renderItem={renderTeacherCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.teachersList}
          />
        </View>

        {/* Expertos en buenos resultados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Expertos en buenos resultados</Text>
          <FlatList
            data={expertsTeachers}
            renderItem={renderTeacherCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.teachersList}
          />
        </View>

        {/* Profesores destacados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Profesores destacados</Text>
          <FlatList
            data={featuredTeachers}
            renderItem={renderTeacherCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.teachersList}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;