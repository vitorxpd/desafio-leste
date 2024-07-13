import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { delay } from '@/lib/utils'

interface IHttpClient {
  get(config: AxiosRequestConfig): Promise<AxiosResponse>
}

export class HttpClient implements IHttpClient {
  private baseConfig: AxiosRequestConfig

  constructor(baseConfig: AxiosRequestConfig) {
    this.baseConfig = baseConfig
  }

  public get(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.makeRequest({
      method: 'GET',
      ...config,
    })
  }

  private async makeRequest(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    await delay()

    return await axios({
      ...this.baseConfig,
      ...config,
    })
  }
}
