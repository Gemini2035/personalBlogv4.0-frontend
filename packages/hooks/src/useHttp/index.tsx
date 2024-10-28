import {
  useState,
} from 'react'
import axios, {
  AxiosResponse,
} from 'axios'
import { useGlobalData } from '../useGlobal'
import { UseHttpProps, UseHttpState } from './types'

export const useHttp = <T,>({
  url,
  method = 'get',
  data,
  headers,
}: UseHttpProps): UseHttpState<T> => {
  const [{ baseUrl }, _] = useGlobalData()

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
        error: error.response.data.meta.message || error.message,
        code: error.response.status,
        data: null,
      })
    }
  }

  return {
    ...state, fetchData,
  }
}