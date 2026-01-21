import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './DocumentsScreen.styles';

const DocumentsScreen = ({ navigation }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState(null);

  // Documentos subidos
  const [uploadedDocuments, setUploadedDocuments] = useState([
    {
      id: 1,
      type: 'university_degree',
      title: 'Título Universitario (Licenciatura/Maestría)',
      description: 'Certificado de estudios superiores en Física.',
      fileName: 'titulo_fisica.pdf',
      uploadDate: '15 Oct 2024',
      status: 'approved',
      icon: '📄',
    },
    {
      id: 2,
      type: 'professional_license',
      title: 'Cédula Profesional o Permiso de Ejercicio',
      description: 'Documento que habilita el ejercicio de la profesión.',
      fileName: 'cedula_profesional.pdf',
      uploadDate: '15 Oct 2024',
      status: 'approved',
      icon: '📄',
    },
    {
      id: 3,
      type: 'id_document',
      title: 'Identificación Oficial (Cédula de Identidad/Pasaporte)',
      description: 'Documento de identidad vigente. Imagen borrosa.',
      fileName: 'id_oficial.jpg',
      uploadDate: '14 Oct 2024',
      status: 'rejected',
      rejectionReason: 'La imagen del documento está borrosa y no se puede verificar la información.',
      icon: '🖼️',
    },
    {
      id: 4,
      type: 'criminal_record',
      title: 'Certificado de Antecedentes Penales',
      description: 'Certificado limpio de antecedentes penales.',
      fileName: 'antecedentes_penales.pdf',
      uploadDate: '10 Oct 2024',
      status: 'approved',
      icon: '📄',
    },
    {
      id: 5,
      type: 'english_certification',
      title: 'Certificación de Inglés Avanzado C1',
      description: 'Certificado oficial de dominio del idioma inglés.',
      fileName: 'cert_ingles_c1.pdf',
      uploadDate: '22 Oct 2024',
      status: 'pending',
      icon: '📄',
    },
  ]);

  // Documentos requeridos
  const requiredDocuments = [
    { id: 'university_degree', name: 'Título Universitario o Certificado de Estudios', required: true },
    { id: 'professional_license', name: 'Cédula Profesional (si aplica)', required: true },
    { id: 'id_document', name: 'Identificación Oficial Vigente', required: true },
    { id: 'criminal_record', name: 'Certificado de Antecedentes Penales', required: true },
    { id: 'additional_certifications', name: 'Certificaciones Adicionales (Opcional)', required: false },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return styles.statusApproved;
      case 'pending':
        return styles.statusPending;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusPending;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return '✓ Aprobado';
      case 'pending':
        return '⏱ En Revisión';
      case 'rejected':
        return '✕ Rechazado';
      default:
        return '⏱ Pendiente';
    }
  };

  const handleUploadDocument = (docType) => {
    setSelectedDocType(docType);
    setShowUploadModal(true);
  };

  const handleViewDocument = (doc) => {
    Alert.alert('Ver Documento', `Abriendo ${doc.fileName}`);
  };

  const handleDeleteDocument = (docId) => {
    Alert.alert(
      'Eliminar Documento',
      '¿Estás seguro de que deseas eliminar este documento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== docId));
          },
        },
      ]
    );
  };

  const handleReupload = (doc) => {
    Alert.alert('Re-subir Documento', `Selecciona un nuevo archivo para ${doc.title}`);
  };

  const isDocumentUploaded = (docType) => {
    return uploadedDocuments.some(doc => doc.type === docType);
  };

  const renderUploadModal = () => (
    <Modal
      visible={showUploadModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowUploadModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📤 Subir Documento</Text>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <View style={styles.uploadInfo}>
              <Text style={styles.uploadInfoIcon}>ℹ️</Text>
              <View style={styles.uploadInfoTextContainer}>
                <Text style={styles.uploadInfoTitle}>Información Importante</Text>
                <Text style={styles.uploadInfoText}>
                  Todos los documentos deben estar vigentes y legibles. Los documentos rechazados 
                  deben ser resueltos con mejor calidad. El proceso de verificación toma entre 24-48 horas.
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonIcon}>📁</Text>
              <Text style={styles.uploadButtonText}>Seleccionar Archivo</Text>
            </TouchableOpacity>

            <View style={styles.formatInfo}>
              <Text style={styles.formatInfoTitle}>Formatos aceptados:</Text>
              <Text style={styles.formatInfoText}>PDF, JPG, PNG (Máx. 5MB)</Text>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowUploadModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => {
                setShowUploadModal(false);
                Alert.alert('Éxito', 'Documento subido correctamente');
              }}
            >
              <Text style={styles.confirmButtonText}>Subir Documento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
          <Text style={styles.headerTitle}>Documentos de Acreditación</Text>
          <Text style={styles.headerSubtitle}>Gestiona tus certificados</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowUploadModal(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de información */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>ℹ️</Text>
          <View style={styles.infoBannerTextContainer}>
            <Text style={styles.infoBannerTitle}>Información Importante</Text>
            <Text style={styles.infoBannerText}>
              Todos los documentos deben estar vigentes y legibles. Los documentos rechazados 
              deben ser resueltos con mejor calidad. El proceso de verificación toma entre 24-48 horas.
            </Text>
          </View>
        </View>

        {/* Documentos Cargados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>Documentos Cargados para Acreditación</Text>
          </View>

          {uploadedDocuments.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentIconContainer}>
                  <Text style={styles.documentIcon}>{doc.icon}</Text>
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{doc.title}</Text>
                  <Text style={styles.documentDescription}>{doc.description}</Text>
                  <View style={styles.documentMeta}>
                    <Text style={styles.documentFileName}>📎 {doc.fileName}</Text>
                    <Text style={styles.documentDate}>🕐 Subido el {doc.uploadDate}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.statusBadge, getStatusColor(doc.status)]}>
                <Text style={styles.statusText}>{getStatusText(doc.status)}</Text>
              </View>

              {doc.status === 'rejected' && (
                <View style={styles.rejectionReason}>
                  <Text style={styles.rejectionIcon}>⚠️</Text>
                  <View style={styles.rejectionTextContainer}>
                    <Text style={styles.rejectionTitle}>Motivo de rechazo:</Text>
                    <Text style={styles.rejectionText}>{doc.rejectionReason}</Text>
                  </View>
                </View>
              )}

              <View style={styles.documentActions}>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => handleViewDocument(doc)}
                >
                  <Text style={styles.viewButtonText}>👁️ Ver</Text>
                </TouchableOpacity>

                {doc.status === 'rejected' && (
                  <TouchableOpacity 
                    style={styles.reuploadButton}
                    onPress={() => handleReupload(doc)}
                  >
                    <Text style={styles.reuploadButtonText}>🔄 Re-subir</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={() => Alert.alert('Descargar', `Descargando ${doc.fileName}`)}
                >
                  <Text style={styles.downloadButtonText}>⬇️</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteDocument(doc.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Documentos Requeridos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📄</Text>
            <Text style={styles.sectionTitle}>Documentos Requeridos</Text>
          </View>

          {requiredDocuments.map((doc) => {
            const uploaded = isDocumentUploaded(doc.id);
            return (
              <View 
                key={doc.id} 
                style={[
                  styles.requiredDocCard,
                  uploaded && styles.requiredDocCardUploaded
                ]}
              >
                <View style={styles.requiredDocContent}>
                  <Text style={styles.requiredDocIcon}>
                    {uploaded ? '✓' : doc.required ? '○' : '○'}
                  </Text>
                  <Text style={[
                    styles.requiredDocText,
                    uploaded && styles.requiredDocTextUploaded
                  ]}>
                    {doc.name}
                  </Text>
                </View>
                {!uploaded && (
                  <TouchableOpacity 
                    style={styles.uploadSmallButton}
                    onPress={() => handleUploadDocument(doc.id)}
                  >
                    <Text style={styles.uploadSmallButtonText}>Subir</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Botón para agregar certificado */}
        <TouchableOpacity 
          style={styles.addCertificateButton}
          onPress={() => setShowUploadModal(true)}
        >
          <Text style={styles.addCertificateButtonIcon}>➕</Text>
          <Text style={styles.addCertificateButtonText}>Agregar Certificado</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderUploadModal()}
    </View>
  );
};

export default DocumentsScreen;