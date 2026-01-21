import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import spacing from '../../styles/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    backgroundColor: '#00BCD4',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 25,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  logoText: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: typography.sizes.body,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.95,
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  mainTitle: {
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  mainSubtitle: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionTitleIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  required: {
    color: colors.error,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardSelected: {
    borderColor: '#00BCD4',
    backgroundColor: '#E0F7FA',
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  cardText: {
    fontSize: typography.sizes.small,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },
  cardTextSelected: {
    color: '#00BCD4',
    fontWeight: typography.weights.bold,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#00BCD4',
    borderColor: '#00BCD4',
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: typography.weights.bold,
  },
  levelGrid: {
    gap: spacing.sm,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  levelCardSelected: {
    borderColor: '#00BCD4',
    backgroundColor: '#E0F7FA',
  },
  levelIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    fontWeight: typography.weights.semibold,
    marginBottom: 2,
  },
  levelNameSelected: {
    color: '#00BCD4',
  },
  levelSubtitle: {
    fontSize: typography.sizes.tiny,
    color: colors.text.secondary,
  },
  modalityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  modalityCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  modalityCardSelected: {
    borderColor: '#00BCD4',
    backgroundColor: '#E0F7FA',
  },
  modalityIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  modalityName: {
    fontSize: typography.sizes.small,
    color: colors.text.primary,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
    marginBottom: 2,
  },
  modalityNameSelected: {
    color: '#00BCD4',
  },
  modalitySubtitle: {
    fontSize: typography.sizes.tiny,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rateInput: {
    flex: 2,
  },
  currencySelect: {
    flex: 1,
  },
  rateHint: {
    fontSize: typography.sizes.tiny,
    color: colors.text.secondary,
    marginTop: -spacing.sm,
    fontStyle: 'italic',
  },
  summarySection: {
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: '#00BCD4',
  },
  summaryTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  summaryIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  summaryGrid: {
    gap: spacing.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#B2EBF2',
  },
  summaryLabel: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
  },
  summaryValue: {
    fontSize: typography.sizes.body,
    color: '#00BCD4',
    fontWeight: typography.weights.bold,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});