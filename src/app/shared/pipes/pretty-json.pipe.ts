import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson'
})
export class PrettyjsonPipe implements PipeTransform {

  transform(json: any,): any {
    return JSON.parse(json);
  }

}
