import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValueImage'
})
export class FormatValueImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
