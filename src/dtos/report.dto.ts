import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator"
import { Exclude, Expose } from "class-transformer"
import { ReportType } from "src/data"
import { UUID } from "crypto"

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number

  @IsString()
  @IsNotEmpty()
  source: string
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string
}

export class ReportResponseDto {
  id: UUID
  source: string
  amount: number
  created_at: Date
  @Exclude()
  updated_at: Date
  type: ReportType
}