import type { Meta, StoryObj } from '@storybook/react';
import Message from '@pintu/technical-test/app/component/message';

const meta: Meta<typeof Message> = {
  title: 'Component/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    type: {
      control: 'radio',
      options: ['info', 'error', 'success', 'warning'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Info: Story = {
  args: {
    title: 'Test Title',
    children: 'Test Message',
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    title: 'Test Title',
    children: 'Test Message',
    type: 'warning',
  },
};

export const Success: Story = {
  args: {
    title: 'Test Title',
    children: 'Test Message',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    title: 'Test Title',
    children: 'Test Message',
    type: 'error',
  },
};
