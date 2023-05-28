import type { Meta, StoryObj } from '@storybook/react';
import Loading from '@pintu/technical-test/app/component/loading';

const meta: Meta<typeof Loading> = {
  title: 'Component/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
