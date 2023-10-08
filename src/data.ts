export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface DataItem {
  id: string,
  source: string,
  amount: number,
  created_at: Date,
  updated_at: Date,
  type: ReportType
}

export interface Data {
  reports: DataItem[]
}

export const data: Data = {
  reports: [
    {
      id: '6a2ccd21-4864-4b8e-baef-149ba3dc091f',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: '6a2ccd21-4864-4b8e-baef-149ba3dc091d',
      source: 'Youtube',
      amount: 4500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: '6a2ccd21-4864-4b8e-baef-149ba3dc091c',
      source: 'Grocery',
      amount: 2000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    }
  ]
}