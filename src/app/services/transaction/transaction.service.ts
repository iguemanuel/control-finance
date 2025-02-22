import { Injectable } from '@angular/core';
import axios from 'axios';
import { ConfigService } from '../../config/config.service';
import { TransactionModel } from '../../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl: string;
  private transactionEndpoints: any;
  private token = localStorage.getItem('token');

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.getBaseUrl();
    this.transactionEndpoints = this.configService.getTransactionEndpoints();
  }

  async createTransaction(transaction: TransactionModel) {
    try {
      const response = await axios.post(
        `${this.baseUrl}${this.transactionEndpoints.create}`,
        transaction
      );
      console.log('Transação criada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  }

  async getTransactions() {
    try {
      const response = await axios.get(
        `${this.baseUrl}${this.transactionEndpoints.getAll}`
      );
      console.log('Transações obtidas:', response.data);

      return response.data.items || []; // Garante que o retorno é um array
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      throw error;
    }
  }

  async getTransactionByUserId(userId: string) {
    if (!userId) {
      console.error('ID do usuário inválido');
      return [];
    }

    const token = localStorage.getItem('token'); // Obtém o token armazenado

    if (!token) {
      console.error('Usuário não autenticado!');
      throw new Error('Usuário não autenticado!');
    }

    try {
      const url = `${this.baseUrl}${this.transactionEndpoints.getByUserId(
        userId
      )}`;

      // Aqui aplicamos o filtro para garantir que estamos apenas pegando as transações do usuário
      const filterParam = `userId="${userId}"`; // O filtro de userId
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no header
        },
        params: { filter: filterParam }, // Aplica o filtro como parâmetro na requisição
      });

      return response.data.items || []; // Garantimos que retorne um array
    } catch (error) {
      console.error('Erro ao obter transações do usuário: ', userId, error);
      throw error;
    }
  }

  async updateTransaction(id: string, transaction: TransactionModel) {
    try {
      const response = await axios.put(
        `${this.baseUrl}${this.transactionEndpoints.update}/${id}`,
        transaction
      );
      console.log('Transação atualizada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  }

  async deleteTransaction(id: string) {
    try {
      // Recupera o token do localStorage (ou de outro local onde você o armazene)
      const token = localStorage.getItem('token');

      // Configura o cabeçalho Authorization com o token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Recupera o endpoint da API para deletar
      const deleteUrl = `${this.baseUrl}/api/collections/records/records/${id}`;

      // Faz a requisição DELETE com o token no cabeçalho
      const response = await axios.delete(deleteUrl, config);

      console.log('Transação deletada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  }
}
