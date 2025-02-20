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

    try {
      const url = `${this.baseUrl}${this.transactionEndpoints.getByUserId(
        userId
      )}`;
      const response = await axios.get(url);
      console.log('Transações obtidas:', response.data);
      return response.data.items;
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
      const response = await axios.delete(
        `${this.baseUrl}${this.transactionEndpoints.delete}/${id}`
      );
      console.log('Transação deletada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  }
}
