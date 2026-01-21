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

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  summaryLeft: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#FDE68A',
    marginRight: 20,
  },
  averageRating: {
    fontSize: 56,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 16,
    marginHorizontal: 1,
  },
  totalReviewsText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  summaryRight: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingStarsLabel: {
    fontSize: 11,
    color: '#78350F',
    width: 70,
    fontWeight: '600',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  ratingPercentage: {
    fontSize: 11,
    color: '#92400E',
    width: 35,
    textAlign: 'right',
    fontWeight: '700',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 44) / 2,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statCardHighlight: {
    backgroundColor: '#E0F2FE',
    borderWidth: 2,
    borderColor: '#00BCD4',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Filters
  filtersSection: {
    marginBottom: 16,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00BCD4',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#00BCD4',
    borderColor: '#00BCD4',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFF',
  },

  // Reviews Count Banner
  reviewsCountBanner: {
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4',
  },
  reviewsCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00BCD4',
  },

  // Reviews List
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  studentDetails: {
    flex: 1,
  },
  studentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  verifiedIcon: {
    fontSize: 10,
    color: '#00BCD4',
    marginRight: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#00BCD4',
  },
  classesCount: {
    fontSize: 12,
    color: '#64748B',
  },
  timeAgo: {
    fontSize: 11,
    color: '#94A3B8',
  },

  // Subject Badge
  subjectBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  subjectBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284C7',
  },

  // Rating
  ratingDollar: {
    fontSize: 18,
    color: '#FBBF24',
    fontWeight: '700',
    marginLeft: 8,
  },

  // Comment
  reviewComment: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 12,
  },

  // Helpful Section
  helpfulSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  helpfulIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  helpfulText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },

  // Response Section
  responseSection: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  responseIcon: {
    fontSize: 14,
    color: '#10B981',
    marginRight: 6,
  },
  responseTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  responseText: {
    fontSize: 13,
    color: '#047857',
    lineHeight: 18,
  },
});