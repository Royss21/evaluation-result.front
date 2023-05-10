import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(
    value: string,
    limit = 25,
    completeWords = false,
    ellipsis = '...'
  ) {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value?.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
/* DELIMITA LA CANTIDAD DE CARACTERES */
/* EJEMPLO DE USO */
// <span>{{element.description | truncateText:200}}</span>
