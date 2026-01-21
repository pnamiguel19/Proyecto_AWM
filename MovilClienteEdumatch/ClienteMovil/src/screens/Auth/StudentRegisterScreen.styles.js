import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import spacing from '../../styles/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    color: '#00BCD4',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: typography.sizes.small,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  required: {
    color: colors.error,
  },
  dateButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  dateButtonError: {
    borderColor: colors.error,
  },
  dateButtonText: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cancelButton: {
    flex: 1,
  },
  registerButton: {
    flex: 1,
  },
});