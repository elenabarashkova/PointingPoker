import { FIELDS_CONFIG } from 'components/RegisterForm/fields-config';

export const validate = (fieldsState: Record<string, string>): Record<string, string> => {
  const fields = Object.entries(fieldsState);
  return fields.reduce((acc, [name, value]) => {
    const currItemToChecked = FIELDS_CONFIG.filter((item) => (item.name === name && item.required && !value));
    if (currItemToChecked.length) {
      acc[name] = 'Fill in the field';
    }
    return acc;
  }, {});
};
