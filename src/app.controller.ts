import { Controller, Get, Post, Put, Delete,Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType, DataItem } from './data';
import { UUID } from 'crypto';
import { AppService } from './app.service';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';


@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ){}
  
  @Get()
  getReports(@Param('type', new ParseEnumPipe(ReportType)) type: ReportType): DataItem[] {
    return this.appService.getReports(type)
  }

  @Get(':id')
  getReportById(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: UUID
  ): DataItem {
    console.log(id, typeof(id))
    return this.appService.getReportById(type, id)
  }

  @Post()
  createReport(
    @Param('type') type: ReportType,
    @Body() createReportDto: CreateReportDto
  ): DataItem {
    console.log(createReportDto)
    const { amount, source } = createReportDto
    return this.appService.createReport(type, source, amount)
  }

  @Put(':id')
  updateReport(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() { amount, source }: UpdateReportDto
  ): DataItem {
    return this.appService.updateReport(type, id, amount, source)
  }

  @Delete(':id') 
  @HttpCode(204)
  deleteReport(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: UUID
  ): DataItem {
    return this.appService.deleteReport(type, id)
  }

}