export interface ApiState {
  status: ApiStatus
}

export type ApiStatus = 'loading' | 'connected' | 'disconnected'
