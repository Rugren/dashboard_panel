import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formarName'
})
export class FormarNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
