import { Injectable } from '@angular/core';
import {Workbook} from "exceljs";
// @ts-ignore
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportClaimsToExcel(data: any[]) {
    const title = "Активные заявки";
    const header = ["N", "Номер договора", "Адрес", "Описание", "Дата создания", "Статус", 'Исполнитель'];

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);
    let titleRow = worksheet.addRow([title]);
    titleRow.font = {  size: 16, bold: true }
    let subTitleRow = worksheet.addRow(['Date : ' + new Date()])

    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ff91d2ff' },
        bgColor: { argb: 'FF0000FF' },
      }
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, right: { style: 'thin' }, bottom: { style: 'thin' } }
    });

    worksheet.addRows(data);
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 60;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 30;

    workbook.xlsx.writeBuffer().then( (data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-  officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, 'ActiveClaims.xlsx');
    });
  }

  exportGageDataToExcel(data: any[]) {
    const title = "Переданные показания";
    const header = ["N", "Пользователь", "Номер договора", "Адрес", "Серийный номер ИПУ", "Тип ИПУ", "Показания", "Дата отправки"];

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);

    let titleRow = worksheet.addRow([title]);
    titleRow.font = {  size: 16, bold: true }
    let subTitleRow = worksheet.addRow(['Date : ' + new Date()])

    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ff91d2ff' },
        bgColor: { argb: 'FF0000FF' },
      }
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, right: { style: 'thin' }, bottom: { style: 'thin' } }
    });

    worksheet.addRows(data);
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 60;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 30;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 30;

    workbook.xlsx.writeBuffer().then( (data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-  officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, 'GettingGageData.xlsx');
    });
  }
}
