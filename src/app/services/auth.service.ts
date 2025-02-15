import { Injectable } from '@angular/core';
import axios from 'axios';

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

      // Salvar token e ID do usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.record.id); // Salva o ID

      return response.data.record;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  // Registro de um novo usuário
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

      console.log('Resposta da API no registro:', response.data); // Verifica a resposta da API

      if (!response.data || !response.data.id) {
        throw new Error(
          'A resposta da API não contém um ID de usuário válido.'
        );
      }

      localStorage.setItem('userId', response.data.id); // Salva o ID corretamente

      return response.data; // Retorna o objeto do usuário corretamente
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

  // Obtém o ID do usuário armazenado no localStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
