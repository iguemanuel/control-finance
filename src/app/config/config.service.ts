import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private baseUrl = 'https://control-finance.sv1.igoremanuel.site';
  constructor() {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getAuthEndpoints() {
    return {
      login: '/api/collections/users/auth-with-password',
      register: '/api/collections/users/records',
    };
  }

  getTransactionEndpoints() {
    return {
      create: '/api/collections/records/records',
      getAll: '/api/collections/records/records',
      getByUserId: (userId: string) =>
        `/api/collections/records/records?userId=${userId}`,
      update: (id: string) => `/api/collections/records/records/${id}`,
      delete: (id: string) => `/api/collections/records/records/${id}`,
    };
  }
}
