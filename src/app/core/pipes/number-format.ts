import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string | null, minFractionDigits: number = 2, maxFractionDigits: number = 2, locale: string = 'en'): string {
    // value = value.toString().replace(/\D/g, "");
    if(!value)
      return '';
      
    value = (value)?.toString().replace(',', "");    
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits
    }).format(Number(value));
}

}
