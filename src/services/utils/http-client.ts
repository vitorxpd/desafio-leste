import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { delay } from '@/lib/utils'

interface IHttpClient {
  get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
}

export class HttpClient implements IHttpClient {
  private baseConfig: AxiosRequestConfig

  constructor(baseConfig: AxiosRequestConfig) {
    this.baseConfig = baseConfig
  }

  public get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = this.makeRequest<T>({
      method: 'GET',
      ...config,
    })

    return response
  }

  private async makeRequest<T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    await delay()

    const response = await axios<T>({
      ...this.baseConfig,
      ...config,
    })

    return response
  }
}
