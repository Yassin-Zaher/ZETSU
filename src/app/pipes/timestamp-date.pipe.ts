import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app'

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {
  constructor(private pipeDate: DatePipe) { }

  transform(value: firebase.firestore.FieldValue | undefined) {
    if (!value) {
      return
    }
    const date = (value as firebase.firestore.Timestamp).toDate()
    return this.pipeDate.transform(date, "mediumDate")
  }

}
