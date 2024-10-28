import { AxiosRequestConfig } from "axios"

export interface UseHttpProps {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    headers?: AxiosRequestConfig['headers']
  }
  
  export interface UseHttpState<T> {
    loading: boolean
    error: string | null
    data: T | null
    code: number | null
    fetchData?: () => void
  }