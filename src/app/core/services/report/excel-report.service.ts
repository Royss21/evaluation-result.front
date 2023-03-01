import { Injectable } from '@angular/core';
// import { Workbook } from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';

declare var ExcelJS: any ;
declare var saveAs: any;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  alg_deft_c = { vertical: 'middle', horizontal: 'center', wrapText: true };
  alg_deft_v = { vertical: 'middle', horizontal: 'center', wrapText: true };
  fill_deft = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D8D8D8D8' },
  };
  bor_deft_t = {
    top: { style: 'thin', color: { argb: '1E1E1E00' } },
    left: { style: 'thin', color: { argb: '1E1E1E00' } },
    bottom: { style: 'thin', color: { argb: '1E1E1E00' } },
    right: { style: 'thin', color: { argb: '1E1E1E00' } },
  };
  workbook: any;
  worksheet: any;

  async downloadExcelReport(nameDoc: any, prmHeader: any, prmKeys: any, values: any[]) {

    try {

      const cabecera = JSON.parse(JSON.stringify(prmHeader));
      const keys = JSON.parse(JSON.stringify(prmKeys));
      this.workbook = new ExcelJS.Workbook();

      // Donde se inicia la configuración
      const cellStartCabecera = 4;
      this.worksheet = this.workbook.addWorksheet(nameDoc.name, {
        pageSetup: { paperSize: 9, orientation: 'landscape' },
        properties: { tabColor: { argb: '17418C' } },
      });

      // Colocar estilos al título => nameDoc.name
      this.worksheet.mergeCells('A2:D2');
      this.worksheet.getCell('A2:D2').value = nameDoc.name;
      this.worksheet.getCell('A2:D2').font = {
        name: 'Calibri',
        family: 4,
        size: 14,
        underline: false,
        bold: true,
      };
      this.worksheet.getCell('A2:D2').alignment = { vertical: 'top', horizontal: 'left' };

      //insertar la columna # => para el correlativo de rows
      keys.unshift({
        key: 'number',
        width: 5,
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      });
      this.worksheet.columns = keys;
      cabecera.data.unshift('#');
      this.worksheet.getRow(cellStartCabecera).values = cabecera.data;

      // Estilos de Cabecera
      const lastCell = this.worksheet.lastRow;

      for (const b in cabecera.data) {

        const index = +b + 1;

        lastCell.getCell(index).border = cabecera.bor_deft
                                            ? cabecera.bor_deft
                                            : this.bor_deft_t;
        lastCell.getCell(index).alignment = cabecera.alignment
                                            ? cabecera.alignment
                                            : this.alg_deft_c;
        lastCell.getCell(index).fill = cabecera.fill
                                            ? cabecera.fill
                                            : this.fill_deft;
        lastCell.getCell(index).height = cabecera.height ? cabecera.height : 40;
        lastCell.getCell(index).font = {
          name: 'Calibri',
          family: 4,
          size: 11,
          underline: false,
          bold: true,
        };
      }

      // Agregar el cuerpo con la información enviada
      let count = 1;
      for (const i of values) {

        i.number = count;
        this.worksheet.addRow(i);
        const row = this.worksheet.lastRow;

        for (const a of keys) {

          const hasStyle = i.custom_style ? i.custom_style[a.key] : null;
          row.getCell(a.key).alignment = a.alignment ? a.alignment : this.alg_deft_v;
          row.getCell(a.key).border = a.border ? a.border : this.bor_deft_t;

          if (a.fill)
            row.getCell(a.key).fill = a.fill
          else
            row.getCell(a.key).fill = hasStyle ? hasStyle.fill : null;

          row.getCell(a.key).numFmt = a.numFmt ? a.numFmt : null;
          row.getCell(a.key).font = {
            name: 'Calibri',
            family: 4,
            size: 11,
            underline: false,
            bold: false,
          };
        }
        count++;
      }

      // Ajustar la configuración de la página de configuración después
      this.worksheet.pageSetup.margins = {
        left: 0.5,
        right: 0.5,
        top: 0.7,
        bottom: 0.7,
        header: 1.3,
        footer: 1.3,
      };

      // Inicar la descargar en el browser
      this.workbook.xlsx
        .writeBuffer()
        .then((data: any) => {
          const blob = new Blob([data], { type: EXCEL_TYPE });
          FileSaver.saveAs(blob, nameDoc.down + EXCEL_EXTENSION);
        })
        .catch((err: any) => {
          console.log(err);
        });

    } catch (error) {

    }
  }
}
