import { AxiosError } from "axios";
import http from "../plugins/http";

class TransactionService {
  async getUserWallet() {
    try {
      const response = await http.get(`/wallet`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "Request failed with status code",
          axiosError.response.status
        );
      } else if (axiosError.request) {
        console.error("No response received");
      } else {
        console.error("Error", axiosError.message);
      }
      throw new Error("Failed to get user wallet");
    }
  }
  async getTransactions() {
    try {
      const response = await http.get(`/transactions`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "Request failed with status code",
          axiosError.response.status
        );
      } else if (axiosError.request) {
        console.error("No response received");
      } else {
        console.error("Error", axiosError.message);
      }
      throw new Error("Failed to get transactions");
    }
  }
  async getUser() {
    try {
      const response = await http.get(`/user`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "Request failed with status code",
          axiosError.response.status
        );
      } else if (axiosError.request) {
        console.error("No response received");
      } else {
        console.error("Error", axiosError.message);
      }
      throw new Error("Failed to get user");
    }
  }
}

export const transactionService = new TransactionService();
