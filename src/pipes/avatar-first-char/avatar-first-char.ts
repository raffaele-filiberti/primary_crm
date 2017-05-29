import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AvatarFirstCharPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'avatarfirstchar',
})
export class AvatarFirstCharPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string): string {
    return value.charAt(0);
  }
}
