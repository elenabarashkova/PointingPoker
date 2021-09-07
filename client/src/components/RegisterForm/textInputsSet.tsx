import { FIELDS_CONFIG } from 'components/RegisterForm/fields-config';
import { TextInput } from 'components/shared/TextInput';
import React, { FunctionComponent, ReactElement } from 'react';

interface RegisterTextInputsProps {
  fields: Record<string, string | boolean>;
  validation: Record<string, string>;
  handler: CallableFunction;
}

export const RegisterTextInputs: FunctionComponent<RegisterTextInputsProps> = (
  {
    fields,
    validation,
    handler,
  },
): ReactElement => (
  <>
    {FIELDS_CONFIG.map(({ label, name }) => (
      <TextInput
        key={name}
        name={name}
        value={(fields[name] as string)}
        isInline={false}
        // isInline={false} по умолчанию, можно убрать?
        label={label}
        onChange={handler}
        error={validation[name]}
        placeholder={label}
      />
    ))}
  </>
);
