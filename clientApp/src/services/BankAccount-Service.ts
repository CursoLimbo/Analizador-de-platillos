import { gql } from "apollo-boost";


export const GetBankAccount= gql`
  query GetBankAccount($getBankAccountId: String!) {
    GetBankAccount(id: $getBankAccountId) {
      id  
    }
  }
`;

export const GetAllBankAccount = gql`
  query GetAllBankAccount {
    GetAllBankAccount {
      id  
    }
  }
`;

export const createBankAccount = gql`
  mutation CreateBankAccount($newBankAccount: BankAccountType!) {
    createBankAccount(newBankAccount: $newBankAccount) {
      id  
    }
  }
`;

export const updateBankAccount = gql`
  mutation UpdateBankAccount($updateBankAccount: BankAccountType!) {
    updateBankAccount(updateBankAccount: $updateBankAccount) {
      id  
    }
  }

`;

export const deleteBankAccount = gql`
  mutation DeleteBankAccount($deleteBankAccountId: String!) {
    deleteBankAccount(id: $deleteBankAccountId)
  }

`;


