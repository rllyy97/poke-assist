import { MainClient } from "pokenode-ts"

export interface ApiState {
  api: MainClient
  status: ApiStatus
}

export type ApiStatus = 'loading' | 'connected' | 'disconnected'
