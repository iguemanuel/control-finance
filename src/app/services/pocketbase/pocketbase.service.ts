import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  private pb = new PocketBase('https://control-finance.sv1.igoremanuel.site');

  constructor() {}

  // Método para realizar login
  async login(email: string, password: string) {
    const authData = await this.pb
      .collection('users')
      .authWithPassword(email, password);
    return authData;
  }

  // Método para buscar apenas as transações do usuário autenticado
  async getTransactions() {
    const userId = this.pb.authStore.model?.id;
    if (!userId) {
      throw new Error('Usuário não autenticado!');
    }

    return await this.pb.collection('records').getFullList({
      filter: `userId = "${userId}"`,
      sort: '-created',
    });
  }
}
