import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import spacing from '../../../styles/spacing';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
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
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: typography.sizes.body,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.md,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
  },
});