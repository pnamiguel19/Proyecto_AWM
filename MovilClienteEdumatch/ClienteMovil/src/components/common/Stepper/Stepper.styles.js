import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import spacing from '../../../styles/spacing';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBarContainer: {
    marginBottom: spacing.md,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00BCD4',
    borderRadius: 3,
  },
  currentStepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepIndicator: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginBottom: 2,
    fontWeight: typography.weights.medium,
  },
  stepLabel: {
    fontSize: typography.sizes.h3,
    color: '#00BCD4',
    fontWeight: typography.weights.bold,
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIcon: {
    fontSize: 24,
  },
});