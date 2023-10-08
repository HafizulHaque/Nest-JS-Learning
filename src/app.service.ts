import { Injectable } from '@nestjs/common';
import { data, DataItem, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';

@Injectable()
export class AppService {

  isValidReportType(type: ReportType): boolean {
    switch(type){
      case ReportType.INCOME:
      case ReportType.EXPENSE:
        return true
      default:
        return false
    }
  }

  getReports(type: ReportType): DataItem[] {
    if(!this.isValidReportType(type)) return null; // Throw error
    return data.reports.filter(report => report.type === type)
  }

  getReportById(type: ReportType, id: UUID): DataItem {
    if(!this.isValidReportType(type)) return null; // Throw error
    let res = data.reports
      .filter(report => report.type === type)
      .find(report => report.id === id)
    return res ? res : null
  }

  createReport(type: ReportType, source: string, amount: number): DataItem {
    if(!this.isValidReportType(type)) return null; // Throw error
    const newReport: DataItem = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }
    data.reports.push(newReport)
    return newReport
  }

  updateReport(type: ReportType, id: UUID, amount: number, source: string): DataItem {
    if(!this.isValidReportType(type)) return null; // Throw error
    let itemToUpdateIndex = data.reports
      .findIndex(report => report.type === type && report.id === id)
    
    if(itemToUpdateIndex === -1) return null // throw error - no such report
    let updatedItem: DataItem = {
      ...data.reports[itemToUpdateIndex],
      updated_at: new Date(),
    }
    if(amount) updatedItem.amount = amount
    if(source) updatedItem.source = source
    data.reports[itemToUpdateIndex] = updatedItem
    return data.reports[itemToUpdateIndex]
  }

  deleteReport(type: ReportType, id: UUID): DataItem {
    if(!this.isValidReportType(type)) return null // Throw error
    let itemToDeleteIndex = data.reports
      .findIndex(report => report.type === type && report.id === id)

    if(itemToDeleteIndex === -1) return null // throw error - no such report
    let itemToDelete: DataItem = data.reports[itemToDeleteIndex]
    return data.reports.splice(itemToDeleteIndex, 1)[0]
  }
}
