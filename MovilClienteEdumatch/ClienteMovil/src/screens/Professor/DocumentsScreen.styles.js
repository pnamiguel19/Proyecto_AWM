import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header
  header: {
    backgroundColor: '#00BCD4',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBBF24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '700',
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  // Info Banner
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4',
  },
  infoBannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoBannerTextContainer: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 4,
  },
  infoBannerText: {
    fontSize: 12,
    color: '#0284C7',
    lineHeight: 18,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BCD4',
  },

  // Document Card
  documentCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4',
  },
  documentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  documentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentIcon: {
    fontSize: 24,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 16,
  },
  documentMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  documentFileName: {
    fontSize: 11,
    color: '#64748B',
  },
  documentDate: {
    fontSize: 11,
    color: '#64748B',
  },

  // Status Badge
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  statusApproved: {
    backgroundColor: '#D1FAE5',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusRejected: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },

  // Rejection Reason
  rejectionReason: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  rejectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  rejectionTextContainer: {
    flex: 1,
  },
  rejectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  rejectionText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 16,
  },

  // Document Actions
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  reuploadButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reuploadButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  downloadButton: {
    width: 44,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    width: 44,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
  },

  // Required Documents
  requiredDocCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  requiredDocCardUploaded: {
    backgroundColor: '#D1FAE5',
    borderColor: '#86EFAC',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  requiredDocContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  requiredDocIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#64748B',
  },
  requiredDocText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  requiredDocTextUploaded: {
    color: '#065F46',
  },
  uploadSmallButton: {
    backgroundColor: '#00BCD4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadSmallButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },

  // Add Certificate Button
  addCertificateButton: {
    backgroundColor: '#00BCD4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addCertificateButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  addCertificateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 188, 212, 0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 20,
    borderTopWidth: 4,
    borderTopColor: '#FBBF24',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2FE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00BCD4',
  },
  modalClose: {
    fontSize: 24,
    color: '#64748B',
    fontWeight: '600',
  },
  modalBody: {
    padding: 20,
  },

  // Upload Info
  uploadInfo: {
    flexDirection: 'row',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  uploadInfoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  uploadInfoTextContainer: {
    flex: 1,
  },
  uploadInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 4,
  },
  uploadInfoText: {
    fontSize: 12,
    color: '#0284C7',
    lineHeight: 18,
  },

  // Upload Button
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#00BCD4',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },
  uploadButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BCD4',
    marginLeft: 12,
  },

  // Format Info
  formatInfo: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  formatInfoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  formatInfoText: {
    fontSize: 11,
    color: '#94A3B8',
  },

  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0F2FE',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});