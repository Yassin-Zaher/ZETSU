import { TimestampDatePipe } from './timestamp-date.pipe';

describe('TimestampDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampDatePipe();
    expect(pipe).toBeTruthy();
  });
});
