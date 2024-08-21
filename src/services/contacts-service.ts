import { AxiosRequestConfig } from 'axios'

import { IContact } from '@/entities/IContact'

import { httpClient } from './utils/http-client'

export class ContactsService {
  static async listContacts(config?: AxiosRequestConfig) {
    return await httpClient.get<IContact[]>('', config)
  }
}
