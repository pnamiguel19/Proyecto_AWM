import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './TeacherProfileScreen.styles';

const { width } = Dimensions.get('window');

const TeacherProfileScreen = ({ navigation, route }) => {
  const [activeSection, setActiveSection] = useState('about');

  // Datos del profesor (simulados - vendrían de route.params)
  const teacherData = {
    id: 7,
    name: 'Juan García',
    subject: 'Física',
    level: 'Bachillerato',
    avatar: '👨‍🏫',
    rating: 4.8,
    reviews: 35,
    modality: 'Virtual / Presencial',
    priceVirtual: 10,
    pricePresencial: 15,
    address: 'Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador',
    description: 'Las clases presenciales se realizan en esta ubicación o puedo desplazarme dentro de Quito según tus necesidades. También ofrezco clases virtuales mediante plataformas como Zoom o Google Meet.',
    recommendation: 98,
  };

  const reviews = [
    {
      id: 1,
      name: 'María Fernández',
      avatar: '👩',
      rating: 5,
      date: 'Hace 1 mes',
      comment: 'Excelente profesor. Explica de manera clara y siempre está dispuesto a resolver dudas. Gracias a sus clases mejoré notablemente en física y pude aprobar mi examen de ingreso.',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: '👨',
      rating: 5,
      date: 'Hace 2 meses',
      comment: 'Sus clases son muy dinámicas y usa ejemplos de la vida real que hacen fácil entender conceptos complicados. Lo recomiendo totalmente.',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      avatar: '👩',
      rating: 4,
      date: 'Hace 3 meses',
      comment: 'Muy paciente y dedicado. Me ayudó a prepararme para mi examen final y obtuve una excelente calificación. Sus métodos de enseñanza son efectivos.',
    },
    {
      id: 4,
      name: 'Diego López',
      avatar: '👨',
      rating: 5,
      date: 'Hace 4 meses',
      comment: 'El mejor profesor de física que he tenido. Hace que las clases sean interesantes y siempre está disponible para responder preguntas fuera del horario de clase.',
    },
    {
      id: 5,
      name: 'Sofía Ramírez',
      avatar: '👩',
      rating: 5,
      date: 'Hace 5 meses',
      comment: 'Increíble profesor. Tiene mucha paciencia y se adapta al ritmo de aprendizaje de cada estudiante. Mis notas mejoraron significativamente.',
    },
    {
      id: 6,
      name: 'Pedro Sánchez',
      avatar: '👨',
      rating: 4,
      date: 'Hace 6 meses',
      comment: 'Muy profesional y conocedor de su materia. Sus explicaciones son claras y siempre trae material de apoyo muy útil para las clases.',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'Física General y Aplicada al Bachillerato',
      duration: '1h de clase',
      priceVirtual: 10,
      pricePresencial: 15,
      modality: 'Virtual/Presencial',
    },
    {
      id: 2,
      title: 'Mecánica Clásica y Cinemática',
      duration: '1.5h de clase',
      priceVirtual: 12,
      pricePresencial: 18,
      modality: 'Virtual/Presencial',
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleScheduleClass = () => {
    navigation.navigate('ScheduleClass', { teacher: teacherData });
  };

  const handleViewMoreCourses = () => {
    Alert.alert('Más Cursos', 'Ver todos los cursos disponibles');
  };

  const handleViewCurriculum = () => {
    Alert.alert('Curriculum', 'Ver curriculum profesional completo');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header con Hero Section */}
      <View style={styles.heroSection}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.heroLeft}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarEmoji}>{teacherData.avatar}</Text>
            </View>
            <View style={styles.imageGrid}>
              <View style={styles.imageGridItem}>
                <Text style={styles.imageGridEmoji}>📚</Text>
              </View>
              <View style={styles.imageGridItem}>
                <Text style={styles.imageGridEmoji}>🎓</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroRight}>
            <Text style={styles.teacherName}>{teacherData.name}</Text>
            <Text style={styles.teacherSubject}>
              {teacherData.subject} - {teacherData.level}
            </Text>

            <View style={styles.ratingRow}>
              <View style={styles.stars}>{renderStars(Math.floor(teacherData.rating))}</View>
              <Text style={styles.ratingNumber}>{teacherData.rating}</Text>
              <Text style={styles.ratingReviews}>({teacherData.reviews} reseñas)</Text>
            </View>

            <View style={styles.modalityBadge}>
              <Text style={styles.modalityIcon}>📍</Text>
              <Text style={styles.modalityText}>{teacherData.modality}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleScheduleClass}>
          <Text style={styles.actionButtonIcon}>📅</Text>
          <Text style={styles.actionButtonText}>Agenda tus clases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={handleViewMoreCourses}
        >
          <Text style={styles.actionButtonIcon}>📚</Text>
          <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
            Más cursos disponibles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonTertiary]}
          onPress={handleViewCurriculum}
        >
          <Text style={styles.actionButtonIcon}>📄</Text>
          <Text style={[styles.actionButtonText, styles.actionButtonTextTertiary]}>
            Curriculum Profesional
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Video de Presentación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎥 Video de presentación</Text>
          <View style={styles.videoContainer}>
            <Text style={styles.videoPlaceholder}>🎬</Text>
            <Text style={styles.videoText}>Video de presentación del profesor</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶ Reproducir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cursos Disponibles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Cursos Disponibles</Text>
          <View style={styles.priceInfo}>
            <Text style={styles.priceIcon}>💰</Text>
            <Text style={styles.priceText}>
              Precio por hora: ${teacherData.priceVirtual} Virtual | ${teacherData.pricePresencial}{' '}
              Presencial USD
            </Text>
          </View>

          <View style={styles.coursesCarousel}>
            {courses.map((course, index) => (
              <View key={course.id} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.courseDetails}>
                  <View style={styles.courseDetailItem}>
                    <Text style={styles.courseDetailIcon}>⏰</Text>
                    <Text style={styles.courseDetailText}>{course.duration}</Text>
                  </View>
                  <View style={styles.courseDetailItem}>
                    <Text style={styles.courseDetailIcon}>💵</Text>
                    <Text style={styles.courseDetailText}>
                      Virtual: {course.priceVirtual} | Presencial: {course.pricePresencial}
                    </Text>
                  </View>
                  <View style={styles.courseDetailItem}>
                    <Text style={styles.courseDetailIcon}>📍</Text>
                    <Text style={styles.courseDetailText}>{course.modality}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Ubicación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Ubicación para clases presenciales</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressIcon}>🗺️</Text>
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>Dirección:</Text>
              <Text style={styles.addressText}>{teacherData.address}</Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <Text style={styles.mapEmoji}>🗺️</Text>
            <Text style={styles.mapText}>Mapa de ubicación</Text>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapButtonText}>📍 Ampliar el mapa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>{teacherData.description}</Text>
          </View>
        </View>

        {/* Reseñas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Lo que dicen mis estudiantes</Text>

          <View style={styles.ratingOverview}>
            <Text style={styles.ratingBig}>{teacherData.rating}</Text>
            <View style={styles.ratingOverviewRight}>
              <View style={styles.starsLarge}>
                {renderStars(Math.floor(teacherData.rating))}
              </View>
              <Text style={styles.recommendationText}>
                El {teacherData.recommendation}% lo recomienda
              </Text>
            </View>
          </View>

          <View style={styles.reviewsGrid}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarEmoji}>{review.avatar}</Text>
                  </View>
                  <View style={styles.reviewHeaderInfo}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>{renderStars(review.rating)}</View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeacherProfileScreen;