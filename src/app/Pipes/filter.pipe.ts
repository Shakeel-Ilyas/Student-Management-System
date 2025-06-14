import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Models/Student';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform(list: Student[], filterBy: string) {
    if (
      filterBy.toLowerCase() === 'all' ||
      filterBy === '' ||
      list.length === 0
    ) {
      return list;
    } else {
      return list.filter((std) => {
        return std.gender.toLowerCase() === filterBy.toLowerCase();
      });
    }
  }
}
