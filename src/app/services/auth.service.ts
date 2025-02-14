import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://control-finance.sv1.igoremanuel.site'; // URL do PocketBase

  constructor() {}

  // Login do usuário
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/collections/users/auth-with-password`,
        {
          identity: email,
          password: password,
        }
      );

      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.record));

      return response.data.record;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  // Registro de novo usuário
  async register(name: string, email: string, password: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/collections/users/records`,
        {
          username: name,
          email: email,
          password: password,
          passwordConfirm: password,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
