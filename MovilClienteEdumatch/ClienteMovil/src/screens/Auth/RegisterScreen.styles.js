import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import spacing from '../../styles/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BCD4',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.body,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    position: 'relative',
    minHeight: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roleCardSelected: {
    borderColor: '#00BCD4',
    backgroundColor: '#E0F7FA',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: typography.weights.bold,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  icon: {
    fontSize: 40,
  },
  roleTitle: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  continueButton: {
    marginBottom: spacing.lg,
    backgroundColor: '#FFC107',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontSize: typography.sizes.body,
    color: colors.white,
  },
  loginLinkText: {
    fontSize: typography.sizes.body,
    color: colors.white,
    fontWeight: typography.weights.bold,
    textDecorationLine: 'underline',
  },
});