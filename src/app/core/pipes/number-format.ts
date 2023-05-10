import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(
    value: number | string | null,
    minFractionDigits = 2,
    maxFractionDigits = 2,
    locale = 'en'
  ): string {
    // value = value.toString().replace(/\D/g, "");
    value = value || 0;

    value = value?.toString().replace(',', '');
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(Number(value));
  }
}
