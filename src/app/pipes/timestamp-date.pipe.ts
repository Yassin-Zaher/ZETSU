import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {
  constructor(private pipeDate: DatePipe) { }

  transform(value: any) {
    const date = value.toDate()
    return this.pipeDate.transform(date, "mediumDate")
  }

}
