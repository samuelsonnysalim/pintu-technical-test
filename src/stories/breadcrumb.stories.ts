import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '@pintu/technical-test/app/component/breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Component/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    paths: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    paths: [
      {
        label: 'Root',
        url: '/',
      },
      {
        label: 'Parent',
        url: '/parent',
      },
      {
        label: 'Child',
        url: '/parent/child',
      },
    ],
  },
};
