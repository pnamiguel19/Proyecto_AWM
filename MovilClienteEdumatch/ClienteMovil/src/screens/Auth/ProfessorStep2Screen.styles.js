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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  documentUploadContainer: {
    marginBottom: spacing.lg,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  documentIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  documentLabel: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  required: {
    color: colors.error,
  },
  uploadButton: {
    backgroundColor: colors.gray[700],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  fileInfo: {
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: 6,
  },
  fileName: {
    color: colors.text.primary,
    fontSize: typography.sizes.small,
  },
  fileWarning: {
    color: colors.error,
    fontSize: typography.sizes.small,
    fontStyle: 'italic',
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
  },
  addButton: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  certificationsContainer: {
    marginTop: spacing.md,
  },
  certificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  certificationName: {
    flex: 1,
    fontSize: typography.sizes.small,
    color: colors.text.primary,
  },
  removeButton: {
    fontSize: 20,
    color: colors.error,
    paddingHorizontal: spacing.sm,
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
    flex: 1,
  },
  summaryStatus: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  summaryStatusPending: {
    backgroundColor: '#FFE0B2',
  },
  summaryStatusMissing: {
    backgroundColor: '#FFCDD2',
  },
  summaryStatusText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.semibold,
  },
  summaryStatusTextPending: {
    color: '#E65100',
  },
  summaryStatusTextMissing: {
    color: '#C62828',
  },
  summaryStatusTextInfo: {
    color: '#00BCD4',
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.semibold,
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
  fileSize: {
    color: colors.text.secondary,
    fontSize: typography.sizes.tiny,
    marginTop: 2,
  },
  certificationSize: {
    color: colors.text.secondary,
    fontSize: typography.sizes.tiny,
    marginTop: 2,
  },
});