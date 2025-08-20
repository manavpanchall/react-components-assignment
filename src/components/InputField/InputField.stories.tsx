import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputField from './InputField';
import { InputFieldProps } from '../../types';

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['filled', 'outlined', 'ghost'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    type: {
      control: { type: 'select', options: ['text', 'password', 'email'] },
    },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState('');
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Input',
  placeholder: 'Enter text here',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'Input with helper text',
  placeholder: 'Enter text here',
  helperText: 'This is a helpful message',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Input with error',
  placeholder: 'Enter text here',
  invalid: true,
  errorMessage: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'Cannot type here',
  disabled: true,
  value: 'Disabled value',
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Input',
  placeholder: 'Loading state',
  loading: true,
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: 'Clearable Input',
  placeholder: 'Type and then clear',
  clearable: true,
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password Input',
  placeholder: 'Enter password',
  type: 'password',
};

export const FilledVariant = Template.bind({});
FilledVariant.args = {
  label: 'Filled Input',
  placeholder: 'Filled variant',
  variant: 'filled',
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  label: 'Ghost Input',
  placeholder: 'Ghost variant',
  variant: 'ghost',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  label: 'Small Input',
  placeholder: 'Small size',
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  label: 'Large Input',
  placeholder: 'Large size',
  size: 'lg',
};