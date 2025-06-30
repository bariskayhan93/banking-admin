export interface Person {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreatePersonRequest {
  readonly name: string;
  readonly email: string;
}

export interface UpdatePersonRequest {
  readonly name?: string;
  readonly email?: string;
}

export interface BankAccount {
  readonly iban: string;
  readonly bankName: string;
  readonly balance: number;
  readonly person: Person;
}

export interface CreateBankAccountRequest {
  readonly personId: string;
}

export interface Transaction {
  readonly id: string;
  readonly amount: number;
  readonly fromIban?: string;
  readonly toIban?: string;
  readonly description?: string;
  readonly createdAt: string;
}

export interface CreateTransactionRequest {
  readonly amount: number;
  readonly fromIban?: string;
  readonly toIban?: string;
  readonly description?: string;
}

export interface ProcessRequest {
  readonly processId: 1 | 2 | 3;
}

export interface ProcessResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data?: LoanPotential[];
}

export interface LoanPotential {
  personId: string;
  personNetWorth: number;
  maxLoanAmount: number;
  friendContributions: Array<{
    friendId: string;
    friendName: string;
    friendNetWorth: number;
    maxLoanFromFriend: number;
    lendingPercentage: number;
  }>;
  calculationMethod: string;
}

export interface SeedStatus {
  readonly seeded: boolean;
  readonly lastSeeded?: string;
}

export interface AdminUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
}
