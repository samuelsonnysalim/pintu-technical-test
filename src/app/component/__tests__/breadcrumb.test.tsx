import { render, screen } from '@testing-library/react';
import Breadcrumb from '@pintu/technical-test/app/component/breadcrumb';

describe('Breadcrumb', () => {
  it('should load component', () => {
    render(<Breadcrumb />);

    expect(screen.queryAllByText('>')).toHaveLength(0);
  });

  it('should render breadcrumbs based on paths passed to the props', () => {
    render(
      <Breadcrumb
        paths={[
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
        ]}
      />,
    );

    expect(screen.getAllByText('>')).toHaveLength(2);
    expect(screen.getByText('Root')).toHaveAttribute('href', '/');
    expect(screen.getByText('Parent')).toHaveAttribute('href', '/parent');
    expect(screen.getByText('Child')).toHaveAttribute('href', '/parent/child');
  });
});
