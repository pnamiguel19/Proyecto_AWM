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
  sectionTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
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
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
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
  photoSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  photoTitle: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
});