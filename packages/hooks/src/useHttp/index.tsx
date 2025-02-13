import {
  useState,
} from 'react'
import axios from 'axios'
import { useGlobal } from '../useGlobal'
import { UseHttpProps, UseHttpState, AxiosResponse } from './types'
import { generateSecureHeader } from './utils'

export const useHttp = <T,>({
  url,
  method = 'get',
  data,
  headers,
}: UseHttpProps): UseHttpState<T> & { fetchData: () => void } => {
  const { GlobalConfig: { baseUrl } } = useGlobal()

  const [state, setState] = useState<UseHttpState<T>>({
    loading: false,
    error: null,
    data: null,
    code: null,
  })

  const fetchData = async () => {
    try {
      setState({
        ...state,
        loading: true,
        error: null,
        code: 0,
      })
      const response: AxiosResponse<T> = await axios({
        url: `${baseUrl}${url}`,
        method,
        ...(method === 'get' ? {
          params: data,
        } : {
          data,
        }),
        headers: {
          ...headers,
          [Math.floor(new Date().setSeconds(0, 0) / 1000)]: generateSecureHeader(data) 
        },
      })
      setState({
        loading: false,
        error: null,
        code: 200,
        data: response.data,
      })
    } catch (error: any) {
      setState({
        loading: false,
        error: error?.response?.data?.meta?.message || error?.message || 'unknown error!',
        code: error?.response?.status || -1,
        data: null,
      })
    }
  }

  return {
    ...state, fetchData,
  }
}