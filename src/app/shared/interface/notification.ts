export interface NotificationToast {
  icon: 'warning' | 'error' | 'success' | 'info' | 'question'
  titleText: string
  text?: string
  toast?: boolean,
  showConfirmButton?: boolean,
  timerProgressBar?: boolean,
  timer?: number
  position?: 'top-end' | 'bottom-end',
  didOpen?: (toast: any) => void
}
