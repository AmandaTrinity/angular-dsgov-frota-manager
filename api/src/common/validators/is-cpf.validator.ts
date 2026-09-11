import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

function isValidCpf(rawCpf: string): boolean {
  const cpf = (rawCpf ?? '').replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calcCheckDigit = (base: string): number => {
    let sum = 0;
    let weight = base.length + 1;
    for (const digit of base) {
      sum += Number(digit) * weight;
      weight -= 1;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcCheckDigit(cpf.slice(0, 9));
  const digit2 = calcCheckDigit(cpf.slice(0, 9) + digit1);

  return cpf === cpf.slice(0, 9) + String(digit1) + String(digit2);
}

@ValidatorConstraint({ name: 'IsCpf', async: false })
class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return typeof value === 'string' && isValidCpf(value);
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}
