import type { Meta, StoryObj } from '@storybook/react';
import Menu from '@pintu/technical-test/app/component/menu';

const meta: Meta<typeof Menu> = {
  title: 'Component/Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [
    (Menu) => (
      <div style={{ minHeight: '700px' }}>
        <header className="py-8 px-6 mb-4">
          <Menu />
        </header>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {};
