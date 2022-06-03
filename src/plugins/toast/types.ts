export type ToastType = 'info' | 'danger' | 'warning' | 'success'

export type ToastOptions = {
  type?: ToastType
  icon?: string
  text?: string
  delay?: number
}
