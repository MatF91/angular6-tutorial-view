import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroId'
})
export class HeroIdPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return "#" + value;
  }

}
