export interface FieldConfigItem {
  name: string,
  label: string,
  required?: boolean,
}

export const FIELDS_CONFIG: Array<FieldConfigItem> = [
  {
    name: 'firstName',
    label: 'First Name:',
    required: true,

  },
  {
    name: 'lastName',
    label: 'First Name:',
    required: true,
  },
  {
    name: 'jobPosition',
    label: 'Job Position:',
  },
];
