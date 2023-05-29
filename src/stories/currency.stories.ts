import type { Meta, StoryObj } from '@storybook/react';
import Currency from '@pintu/technical-test/app/component/currency';

const meta: Meta<typeof Currency> = {
  title: 'Component/Currency',
  component: Currency,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
    },
    enableValueChangeIndicator: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Currency>;

export const Default: Story = {
  args: {
    value: '1000000',
  },
};
