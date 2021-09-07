import { FIELDS_CONFIG } from 'components/RegisterForm/fields-config';

export const validate = (fieldsState: Record<string, string | boolean>): Record<string, string> => (
  // fieldsState: Record<string, string>
  FIELDS_CONFIG.reduce((acc, { name, required }) => {
    if (required && !fieldsState[name]) {
      acc[name] = 'Fill in the field';
    }
    return acc;
  }, {})
);

export const validateField = (fieldName: string, value: string) => FIELDS_CONFIG.reduce((acc, { name, required }) => {
  if (name === fieldName && required && !value) {
    acc[name] = 'Fill in the field';
  }
  return acc;
}, {});
