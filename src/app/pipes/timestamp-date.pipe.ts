import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {

  transform(value: any) {
    const date = value.toDate()
    var str = date.toDateString();

    return str
  }

}
