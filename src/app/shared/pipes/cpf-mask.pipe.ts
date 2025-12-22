import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true,
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string | number | undefined | null): string {
    if (!value) {
      return '';
    }
    const cpf = String(value).replace(/\D/g, '');

    if (cpf.length !== 11) {
      return String(value);
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

