import { StyleSheet } from "react-native";

export const COLORS = {
  primary: '#1F4E79',
  secondary: '#2E75B6',
  background: '#F5F5F5',
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#999999',
  border: '#DDDDDD',
  inputBg: '#FAFAFA',
  danger: '#C62828',
  dangerBg: '#FFEBEE',
  success: '#2E7D32',
  warning: '#F57C00',
  shadow: '#000000',
};
 
export const SIZES = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,
  borderRadius: 10,
  fontSmall: 13,
  fontMedium: 16,
  fontLarge: 18,
  fontTitle: 22,
  fabSize: 60,
};
 
// ============================================================
// LIST SCREEN STYLES
// ============================================================
 
export const listStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchContainer: {
    padding: SIZES.paddingMedium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingSmall + 2,
    fontSize: SIZES.fontMedium,
    backgroundColor: COLORS.inputBg,
  },
  list: { padding: SIZES.paddingMedium },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardName: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardDetail: {
    fontSize: SIZES.fontSmall + 1,
    color: COLORS.textMedium,
    marginTop: 4,
  },
  cardTeacher: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
  },
  fab: {
    position: 'absolute',
    bottom: SIZES.paddingLarge,
    right: SIZES.paddingLarge,
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
 
// ============================================================
// DETAIL SCREEN STYLES
// ============================================================
 
export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.paddingLarge,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingLarge,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.paddingMedium,
  },
  field: { marginBottom: SIZES.paddingMedium },
  label: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textDark,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: SIZES.paddingLarge,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.dangerBg,
    padding: 14,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
  },
});
 
// ============================================================
// FORM SCREEN STYLES
// ============================================================
 
export const formStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { padding: SIZES.paddingLarge },
  title: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.paddingLarge,
  },
  label: {
    fontSize: SIZES.fontSmall + 1,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.paddingSmall,
    padding: 12,
    fontSize: SIZES.fontMedium,
    backgroundColor: COLORS.inputBg,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: SIZES.paddingSmall,
    marginTop: SIZES.paddingLarge,
    alignItems: 'center',
  },
  saveButtonDisabled: { backgroundColor: COLORS.textLight },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 14,
    borderRadius: SIZES.paddingSmall,
    marginTop: SIZES.paddingSmall,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textMedium,
    fontSize: SIZES.fontMedium,
  },
});

