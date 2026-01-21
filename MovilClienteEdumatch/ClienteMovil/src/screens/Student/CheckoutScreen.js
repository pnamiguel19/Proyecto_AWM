import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './CheckoutScreen.styles';

const CheckoutScreen = ({ navigation, route }) => {
  const { bookingData } = route.params || {};

  // Datos de la reserva
  const reservation = bookingData || {
    teacher: {
      name: 'Juan García',
      avatar: '👨‍🏫',
      course: 'Física Universitaria - Mecánica',
      address: 'Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador',
    },
    modality: 'presencial',
    location: 'teacher',
    platform: null,
    timeSlots: [
      { day: 'Martes', date: '20/01/2026', time: '10:00 - 11:00', duration: '1h' },
    ],
    description: 'xas',
    pricing: {
      pricePerHour: 15.00,
      totalHours: 1,
      subtotal: 15.00,
      serviceFee: 0.75,
      serviceFeePercent: 5,
      total: 15.75,
    },
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      'Confirmar Agendamiento',
      '¿Estás seguro de que deseas confirmar esta reserva?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert(
              '¡Reserva Confirmada!',
              'Tu clase ha sido agendada exitosamente. Recibirás una confirmación por correo electrónico.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('StudentHome'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const formatTimeSlots = () => {
    return reservation.timeSlots.map((slot, index) => (
      <View key={index} style={styles.timeSlotItem}>
        <Text style={styles.timeSlotIcon}>📅</Text>
        <View style={styles.timeSlotInfo}>
          <Text style={styles.timeSlotDay}>{slot.day}, {slot.date}</Text>
          <View style={styles.timeSlotDetails}>
            <Text style={styles.timeSlotIcon}>🕐</Text>
            <Text style={styles.timeSlotTime}>{slot.time} ({slot.duration})</Text>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Agendamiento</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryIcon}>📋</Text>
            <Text style={styles.summaryTitle}>Resumen del Agendamiento</Text>
          </View>

          {/* Teacher Info */}
          <View style={styles.teacherSection}>
            <View style={styles.teacherAvatar}>
              <Text style={styles.teacherAvatarEmoji}>{reservation.teacher.avatar}</Text>
            </View>
            <View style={styles.teacherInfo}>
              <Text style={styles.teacherName}>{reservation.teacher.name}</Text>
              <Text style={styles.teacherCourse}>{reservation.teacher.course}</Text>
            </View>
          </View>

          {/* Modality Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoTitle}>Modalidad</Text>
            </View>
            <View style={styles.modalityBadge}>
              <Text style={styles.modalityBadgeText}>
                {reservation.modality === 'presencial' ? 'presencial' : 'virtual'}
              </Text>
            </View>
            
            {reservation.modality === 'presencial' && (
              <View style={styles.locationInfo}>
                <Text style={styles.locationIcon}>📌</Text>
                <Text style={styles.locationText}>
                  Ubicación: {reservation.teacher.address}
                </Text>
              </View>
            )}

            {reservation.modality === 'virtual' && reservation.platform && (
              <View style={styles.platformInfo}>
                <Text style={styles.platformIcon}>💻</Text>
                <Text style={styles.platformText}>
                  Plataforma: {reservation.platform}
                </Text>
              </View>
            )}
          </View>

          {/* Scheduled Times */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>📅</Text>
              <Text style={styles.infoTitle}>Horarios Agendados</Text>
            </View>
            <View style={styles.timeSlotsContainer}>
              {formatTimeSlots()}
            </View>
            <View style={styles.totalHours}>
              <Text style={styles.totalHoursLabel}>Total:</Text>
              <Text style={styles.totalHoursValue}>{reservation.pricing.totalHours} horas</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>📝</Text>
              <Text style={styles.infoTitle}>Descripción</Text>
            </View>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {reservation.description || 'Sin descripción'}
              </Text>
            </View>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.costSection}>
            <View style={styles.costHeader}>
              <Text style={styles.costIcon}>💰</Text>
              <Text style={styles.costTitle}>Desglose de Costos</Text>
            </View>

            <View style={styles.costItem}>
              <Text style={styles.costLabel}>
                Clases ({reservation.modality === 'presencial' ? 'presencial' : 'virtual'})
              </Text>
              <Text style={styles.costValue}>${reservation.pricing.subtotal.toFixed(2)} USD</Text>
            </View>
            <Text style={styles.costSubtext}>
              {reservation.pricing.totalHours} hora × ${reservation.pricing.pricePerHour.toFixed(2)} USD
            </Text>

            <View style={styles.costDivider} />

            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Tarifa de servicio</Text>
              <Text style={styles.costValue}>${reservation.pricing.serviceFee.toFixed(2)} USD</Text>
            </View>
            <Text style={styles.costSubtext}>({reservation.pricing.serviceFeePercent}%)</Text>

            <View style={styles.costDivider} />

            <View style={styles.totalCost}>
              <Text style={styles.totalCostLabel}>Total a pagar</Text>
              <Text style={styles.totalCostValue}>${reservation.pricing.total.toFixed(2)} USD</Text>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentSection}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentIcon}>💳</Text>
              <Text style={styles.paymentText}>
                Métodos de pago aceptados: Tarjeta de crédito/débito, PayPal
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonIcon}>💳</Text>
          <Text style={styles.confirmButtonText}>Realizar Agendamiento</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Al confirmar, aceptas los términos y condiciones de EduMatch
        </Text>
      </View>
    </View>
  );
};

export default CheckoutScreen;