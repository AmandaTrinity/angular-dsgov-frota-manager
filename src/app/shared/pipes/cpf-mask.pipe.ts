import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true,
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    const limpo = value.replace(/\D/g, '');

    return `***.${limpo.substring(3, 6)}.${limpo.substring(6, 9)}-**`;
  }
}
