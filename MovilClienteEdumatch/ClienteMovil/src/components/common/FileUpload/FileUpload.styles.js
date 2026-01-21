import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import spacing from '../../../styles/spacing';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  uploadArea: {
    backgroundColor: '#E0F7FA',
    borderWidth: 2,
    borderColor: '#00BCD4',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  uploadAreaError: {
    borderColor: colors.error,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  uploadText: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  uploadHint: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});