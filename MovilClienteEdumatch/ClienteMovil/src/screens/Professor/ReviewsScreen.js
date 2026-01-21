import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './ReviewsScreen.styles';

const ReviewsScreen = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Datos de reseñas
  const reviewsData = {
    averageRating: 4.8,
    totalReviews: 87,
    positiveReviews: 82,
    recommendationRate: 94,
    responsesGiven: 12,
    ratingDistribution: [
      { stars: 5, count: 65, percentage: 75 },
      { stars: 4, count: 16, percentage: 18 },
      { stars: 3, count: 4, percentage: 5 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  };

  const reviews = [
    {
      id: 1,
      studentName: 'María González',
      studentAvatar: 'MG',
      studentVerified: true,
      classesCount: 6,
      rating: 5,
      subject: 'Física',
      comment: 'Excelente preparación para mi examen de admisión universitaria. Juan tiene un don para enseñar física de manera comprensible. Los ejercicios que preparó fueron muy similares a los del examen real. ¡Totalmente recomendado!',
      helpful: 10,
      timeAgo: 'Hace 3 semanas',
      hasResponse: true,
      response: '¡Gracias María! Me alegra saber que entraste a la universidad. Todo el esfuerzo valió la pena. ¡Éxitos en esta nueva etapa!',
    },
    {
      id: 2,
      studentName: 'Sofía Fernández',
      studentAvatar: 'SF',
      studentVerified: true,
      classesCount: 10,
      rating: 5,
      subject: 'Matemáticas',
      comment: 'Las mejores clases de matemáticas que he tenido! Juan hace que incluso los temas más difíciles parezcan fáciles. Su método de enseñanza es muy efectivo y siempre tiene ejemplos prácticos. Pasé de reprobar a sacar 9 en mis exámenes. ¡Gracias!',
      helpful: 8,
      timeAgo: 'Hace 1 mes',
      hasResponse: false,
    },
    {
      id: 3,
      studentName: 'Carlos Ruiz',
      studentAvatar: 'CR',
      studentVerified: true,
      classesCount: 8,
      rating: 5,
      subject: 'Física',
      comment: 'Excelente profesor! Muy paciente y dedicado. Me ayudó a entender conceptos de física que nunca había comprendido antes. Las clases son dinámicas y siempre resuelve todas mis dudas.',
      helpful: 5,
      timeAgo: 'Hace 2 meses',
      hasResponse: true,
      response: 'Muchas gracias Carlos! Fue un placer trabajar contigo. Sigue esforzándote así!',
    },
    {
      id: 4,
      studentName: 'Ana López',
      studentAvatar: 'AL',
      studentVerified: true,
      classesCount: 4,
      rating: 4,
      subject: 'Matemáticas',
      comment: 'Muy buen profesor, explica claramente y tiene mucha paciencia. Solo le daría 4 estrellas porque a veces las clases terminaban un poco tarde, pero en general muy satisfecha con el aprendizaje.',
      helpful: 3,
      timeAgo: 'Hace 2 meses',
      hasResponse: false,
    },
    {
      id: 5,
      studentName: 'Diego Vargas',
      studentAvatar: 'DV',
      studentVerified: true,
      classesCount: 5,
      rating: 5,
      subject: 'Física',
      comment: 'Increíble! Juan es un experto en física y sabe cómo transmitir el conocimiento. Me preparó para mi examen final y aprobé con excelente nota. Definitivamente lo recomiendo.',
      helpful: 7,
      timeAgo: 'Hace 3 meses',
      hasResponse: true,
      response: 'Excelente Diego! Me alegra mucho que hayas aprobado. Tu dedicación hizo la diferencia!',
    },
  ];

  const subjects = ['Todas las materias', 'Física', 'Matemáticas', 'Cálculo'];
  const sortOptions = ['Más recientes', 'Más antiguos', 'Mayor calificación', 'Menor calificación'];

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={styles.starIcon}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];

    if (selectedRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(selectedRating));
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(review => review.subject === selectedSubject);
    }

    return filtered;
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
          <Text style={styles.headerTitle}>Mis Calificaciones y Reseñas</Text>
          <Text style={styles.headerSubtitle}>{reviewsData.totalReviews} reseñas totales</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.averageRating}>{reviewsData.averageRating}</Text>
            {renderStars(Math.floor(reviewsData.averageRating))}
            <Text style={styles.totalReviewsText}>
              Basado en {reviewsData.totalReviews} reseñas
            </Text>
          </View>

          <View style={styles.summaryRight}>
            {reviewsData.ratingDistribution.map((item) => (
              <View key={item.stars} style={styles.ratingRow}>
                <Text style={styles.ratingStarsLabel}>{item.stars} estrellas</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${item.percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.ratingPercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💬</Text>
            <Text style={styles.statValue}>{reviewsData.totalReviews}</Text>
            <Text style={styles.statLabel}>Total Reseñas</Text>
          </View>

          <View style={[styles.statCard, styles.statCardHighlight]}>
            <Text style={styles.statIcon}>👍</Text>
            <Text style={styles.statValue}>{reviewsData.positiveReviews}</Text>
            <Text style={styles.statLabel}>Reseñas Positivas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statValue}>{reviewsData.recommendationRate}%</Text>
            <Text style={styles.statLabel}>Tasa de Recomendación</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💭</Text>
            <Text style={styles.statValue}>{reviewsData.responsesGiven}</Text>
            <Text style={styles.statLabel}>Respuestas Dadas</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterIcon}>📊</Text>
            <Text style={styles.filterLabel}>Calificación</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            <TouchableOpacity
              style={[styles.filterChip, selectedRating === 'all' && styles.filterChipActive]}
              onPress={() => setSelectedRating('all')}
            >
              <Text style={[styles.filterChipText, selectedRating === 'all' && styles.filterChipTextActive]}>
                Todas las calificaciones
              </Text>
            </TouchableOpacity>
            {[5, 4, 3, 2, 1].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[styles.filterChip, selectedRating === rating.toString() && styles.filterChipActive]}
                onPress={() => setSelectedRating(rating.toString())}
              >
                <Text style={[styles.filterChipText, selectedRating === rating.toString() && styles.filterChipTextActive]}>
                  {rating} ⭐
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filtersSection}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterIcon}>📚</Text>
            <Text style={styles.filterLabel}>Materia</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            <TouchableOpacity
              style={[styles.filterChip, selectedSubject === 'all' && styles.filterChipActive]}
              onPress={() => setSelectedSubject('all')}
            >
              <Text style={[styles.filterChipText, selectedSubject === 'all' && styles.filterChipTextActive]}>
                Todas las materias
              </Text>
            </TouchableOpacity>
            {['Física', 'Matemáticas', 'Cálculo'].map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[styles.filterChip, selectedSubject === subject && styles.filterChipActive]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text style={[styles.filterChipText, selectedSubject === subject && styles.filterChipTextActive]}>
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filtersSection}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterIcon}>🔄</Text>
            <Text style={styles.filterLabel}>Ordenar por</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            <TouchableOpacity
              style={[styles.filterChip, sortBy === 'recent' && styles.filterChipActive]}
              onPress={() => setSortBy('recent')}
            >
              <Text style={[styles.filterChipText, sortBy === 'recent' && styles.filterChipTextActive]}>
                🕐 Más recientes
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Reviews Count */}
        <View style={styles.reviewsCountBanner}>
          <Text style={styles.reviewsCountText}>
            {getFilteredReviews().length} reseñas encontradas
          </Text>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {getFilteredReviews().map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.studentInfo}>
                  <View style={styles.studentAvatar}>
                    <Text style={styles.studentAvatarText}>{review.studentAvatar}</Text>
                  </View>
                  <View style={styles.studentDetails}>
                    <View style={styles.studentNameRow}>
                      <Text style={styles.studentName}>{review.studentName}</Text>
                      {review.studentVerified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedIcon}>✓</Text>
                          <Text style={styles.verifiedText}>Estudiante verificado</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.classesCount}>• {review.classesCount} clases tomadas</Text>
                  </View>
                </View>
                <Text style={styles.timeAgo}>{review.timeAgo}</Text>
              </View>

              <View style={styles.subjectBadge}>
                <Text style={styles.subjectBadgeText}>{review.subject}</Text>
              </View>

              <View style={styles.ratingRow}>
                {renderStars(review.rating)}
                <Text style={styles.ratingDollar}>$</Text>
              </View>

              <Text style={styles.reviewComment}>{review.comment}</Text>

              <View style={styles.helpfulSection}>
                <Text style={styles.helpfulIcon}>👍</Text>
                <Text style={styles.helpfulText}>
                  {review.helpful} personas encontraron esto útil
                </Text>
              </View>

              {review.hasResponse && (
                <View style={styles.responseSection}>
                  <View style={styles.responseHeader}>
                    <Text style={styles.responseIcon}>✓</Text>
                    <Text style={styles.responseTitle}>Respuesta del profesor</Text>
                  </View>
                  <Text style={styles.responseText}>{review.response}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewsScreen;