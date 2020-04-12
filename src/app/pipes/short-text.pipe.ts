import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string): string  {

    if (value.length > 16){
      value = value.substr(0, 16) + '...';
      return value;
    }
    else{
      return value;
    }
  }

}
