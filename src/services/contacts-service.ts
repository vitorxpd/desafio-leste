import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { IContact } from '@/interfaces/IContact'

import { HttpClient } from './utils/http-client'

interface IContactsService {
  listContacts(config: AxiosRequestConfig): Promise<AxiosResponse<IContact[]>>
}

class ContactsService implements IContactsService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: 'https://my.api.mockaroo.com/lestetelecom/test.json',
      params: {
        key: 'f55c4060',
      },
    })
  }

  public async listContacts(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<IContact[]>> {
    return await this.httpClient.get(config)
  }
}

export default new ContactsService()
