import { FormGroup, ValidationErrors } from '@angular/forms';

export function atLeastOneField(...fields: string[]) {
  return (fg: FormGroup): ValidationErrors | null => {
    return fields.some(fieldName => {
        const field = fg.get(fieldName)?.value;
        if (typeof field === 'boolean') return field
        else return field && field.length > 0 ? true : false;
    })
      ? null
      : ({ atLeastOne: 'At least one field has to be provided.' } as ValidationErrors);
  };
}
