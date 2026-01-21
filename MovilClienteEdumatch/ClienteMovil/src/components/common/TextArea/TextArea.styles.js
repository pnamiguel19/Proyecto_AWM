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
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    minHeight: 100,
  },
  textAreaError: {
    borderColor: colors.error,
  },
  charCount: {
    fontSize: typography.sizes.tiny,
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
  },
});