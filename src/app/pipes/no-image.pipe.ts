import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(images: any[]): string {

    if (!images){
      return 'assets/img/noimage.png';
    }

    if (images.length > 0){
      return images[1].url;
    } else{
      return 'assets/img/noImage.png';
    }
    return null;
  }

}
