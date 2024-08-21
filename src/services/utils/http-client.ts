import axios from 'axios'

import { sleep } from '@/lib/utils'

export const httpClient = axios.create({
  baseURL: 'https://my.api.mockaroo.com/lestetelecom/test.json',
  params: {
    key: 'f55c4060',
  },
})

httpClient.interceptors.response.use(async (response) => {
  await sleep()

  return response
})
