import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: 'full' | 'long' | 'medium' | 'short' = 'short'): string {
    const date = new Date(value);
    return new Intl.DateTimeFormat('en-US', { dateStyle: format }).format(date);
  }

}
