import { Injectable } from '@angular/core';
import axios from 'axios';
import { ConfigService } from '../../config/config.service'; // Importe o ConfigService
import { TransactionModel } from '../../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl: string;
  private transactionEndpoints: any;

  constructor(private configService: ConfigService) {
    // Inicializa a URL base e os endpoints do serviço de configuração
    this.baseUrl = this.configService.getBaseUrl();
    this.transactionEndpoints = this.configService.getTransactionEndpoints();
  }

  // Cria uma nova transação
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

  // Obtém todas as transações
  async getTransactions() {
    try {
      const response = await axios.get(
        `${this.baseUrl}${this.transactionEndpoints.getAll}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      throw error;
    }
  }

  // Atualiza uma transação existente
  async updateTransaction(id: string, transaction: TransactionModel) {
    try {
      const response = await axios.put(
        `${this.baseUrl}${this.transactionEndpoints.update(id)}`,
        transaction
      );
      console.log('Transação atualizada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  }

  // Deleta uma transação
  async deleteTransaction(id: string) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}${this.transactionEndpoints.delete(id)}`
      );
      console.log('Transação deletada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  }
}
