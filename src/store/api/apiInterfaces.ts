import { MainClient } from "pokenode-ts";

export interface ApiState {
  api: MainClient
  status: 'loading' | 'connected' | 'disconnected'
}