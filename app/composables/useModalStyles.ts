// Fichier de configuration pour les styles de modaux
// À importer dans les composants modaux

/**
 * Classes Tailwind pour les Modaux
 * Optimisées pour mobile et desktop
 */

export const modalClasses = {
  // Wrapper principal
  container: 'fixed inset-0 z-50 overflow-y-auto',
  
  // Overlay (backdrop)
  overlay: 'fixed inset-0 bg-black/50 z-40 backdrop-blur-sm',
  
  // Modal box
  box: 'bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto',
  boxResponsive: 'w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl',
  
  // Header
  header: 'sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl sm:rounded-t-2xl',
  headerContent: 'px-4 sm:px-6 py-4 sm:py-5',
  headerTitle: 'text-lg sm:text-xl lg:text-2xl font-bold text-gray-900',
  headerSubtitle: 'text-xs sm:text-sm text-gray-600 mt-1',
  
  // Close button
  closeButton: 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700',
  
  // Body (contenu scrollable)
  body: 'px-4 sm:px-6 py-4 sm:py-6',
  
  // Footer
  footer: 'sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4',
  footerContent: 'flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end',
  
  // Inputs
  input: 'w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base',
  label: 'block text-sm sm:text-base font-medium text-gray-900 mb-1',
  
  // Boutons
  button: {
    primary: 'px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm sm:text-base transition-colors',
    secondary: 'px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium text-sm sm:text-base transition-colors',
    danger: 'px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm sm:text-base transition-colors',
  },
  
  // Badge
  badge: 'inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium',
  badgeSuccess: 'bg-green-100 text-green-800',
  badgeDanger: 'bg-red-100 text-red-800',
  badgeWarning: 'bg-orange-100 text-orange-800',
  
  // Animations
  fadeEnter: 'transition-opacity duration-200 ease-out',
  slideUp: 'transition-all duration-300 ease-out',
}

/**
 * Animations CSS3 pour les modaux
 */
export const modalAnimations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (min-width: 640px) {
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  `,
}

/**
 * Types pour les champs de formulaire
 */
export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'

/**
 * Interface pour les champs de formulaire
 */
export interface FormFieldConfig {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  required?: boolean
  validation?: (value: any) => string | null
  help?: string
  options?: Array<{ value: string | number; label: string }>
  min?: number | string
  max?: number | string
  step?: number | string
  rows?: number
  disabled?: boolean
  readonly?: boolean
}

/**
 * États du modal
 */
export enum ModalState {
  CLOSED = 'closed',
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing',
}

/**
 * Types de modaux
 */
export enum ModalType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CONFIRMATION = 'confirmation',
  FORM = 'form',
}

/**
 * Configuration de modal
 */
export interface ModalConfig {
  title: string
  subtitle?: string
  message?: string
  type?: ModalType
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  width?: 'sm' | 'md' | 'lg' | 'xl'
  actions?: Array<{
    label: string
    type: 'primary' | 'secondary' | 'danger'
    onClick: () => void
  }>
}

/**
 * Utilitaire pour créer les classes dynamiquement
 */
export function getInputClasses(error?: string): string {
  const baseClasses =
    'w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors'
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-indigo-500'
  return `${baseClasses} ${errorClasses}`
}

export function getButtonClasses(variant: 'primary' | 'secondary' | 'danger' = 'primary', size: 'sm' | 'md' | 'lg' = 'md'): string {
  const baseClasses = 'font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base sm:text-lg',
  }
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`
}
