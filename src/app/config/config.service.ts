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
      create: '/api/collections/records/records', // Endpoint para criar transação
      getAll: '/api/collections/records/records', // Endpoint para obter todas as transações
      update: (id: string) => `/api/collections/records/records/${id}`, // Endpoint para atualizar transação
      delete: (id: string) => `/api/collections/records/records/${id}`, // Endpoint para deletar transação
    };
  }
}
