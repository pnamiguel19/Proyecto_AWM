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
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  // Financial Summary
  financialSummary: {
    marginBottom: 20,
  },
  summaryMainCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FBBF24',
  },
  summaryIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  summaryMainInfo: {
    flex: 1,
  },
  summaryMainLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryMainValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00BCD4',
  },
  summaryStatsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderTopWidth: 3,
    borderTopColor: '#FBBF24',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },

  // Search and Filter
  searchFilterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#1E293B',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FBBF24',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterButtonText: {
    fontSize: 20,
  },

  // Class List
  classList: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 12,
  },

  // Class Card
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2FE',
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  studentAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 13,
    color: '#64748B',
  },

  // Status Badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusCompleted: {
    backgroundColor: '#BAE6FD',
    borderWidth: 1,
    borderColor: '#00BCD4',
  },
  statusScheduled: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  statusCancelled: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },

  // Class Main Info
  classMainInfo: {
    marginBottom: 12,
  },
  subjectBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  subjectBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
  },
  dateText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  // Class Details Grid
  classDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
  },

  // Modality
  modalityOnline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalityPresential: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalityIcon: {
    fontSize: 14,
  },
  modalityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00BCD4',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
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
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  filterOptionActive: {
    backgroundColor: '#E0F2FE',
    borderWidth: 2,
    borderColor: '#00BCD4',
  },
  filterOptionText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#00BCD4',
    fontWeight: '700',
  },
  checkIcon: {
    fontSize: 18,
    color: '#FBBF24',
    fontWeight: '700',
  },
  applyButton: {
    backgroundColor: '#00BCD4',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  // Pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    gap: 12,
  },
  paginationButton: {
    flex: 1,
    backgroundColor: '#00BCD4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  paginationButtonDisabled: {
    backgroundColor: '#E0F2FE',
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  currentPage: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  currentPageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});