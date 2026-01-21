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
  configButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBBF24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  configButtonText: {
    fontSize: 20,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#00BCD4',
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
  classCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classStudent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  classPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00BCD4',
  },
  classSubject: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  classDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  classDate: {
    fontSize: 13,
    color: '#64748B',
  },
  classTime: {
    fontSize: 13,
    color: '#64748B',
  },
  classModalityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  classModalityIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  classModalityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00BCD4',
  },
  classButton: {
    backgroundColor: '#00BCD4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  classButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },

  // Week Navigation
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  weekNavButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  weekNavButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00BCD4',
  },
  weekCurrent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },

  // Legend
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
  },
  legendAvailable: {
    backgroundColor: '#86EFAC',
  },
  legendReserved: {
    backgroundColor: '#FDE68A',
  },
  legendBlocked: {
    backgroundColor: '#FCA5A5',
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },

  // Schedule Grid
  scheduleGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  dayColumn: {
    width: 140,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  dayHeader: {
    backgroundColor: '#00BCD4',
    padding: 12,
    alignItems: 'center',
  },
  dayName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  dayDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  daySlots: {
    padding: 8,
  },
  slotContainer: {
    marginBottom: 8,
  },

  // Slots
  slotReserved: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  slotTime: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  slotStudent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  slotSubject: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  slotModality: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotModalityIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  slotModalityText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },

  slotAvailable: {
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignItems: 'center',
  },
  slotAvailableTime: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2,
  },
  slotAvailableText: {
    fontSize: 10,
    color: '#047857',
    fontWeight: '500',
  },

  slotBlocked: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
  },
  slotBlockedTime: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7F1D1D',
    marginBottom: 2,
  },
  slotBlockedText: {
    fontSize: 10,
    color: '#991B1B',
    fontWeight: '500',
  },

  emptyDay: {
    padding: 20,
    alignItems: 'center',
  },
  emptyDayText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },

  // Add Button
  addButton: {
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
  addButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  addButtonText: {
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

  // Config Section
  configSection: {
    gap: 16,
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  configTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  configLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  configDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },

  // Save Button
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});