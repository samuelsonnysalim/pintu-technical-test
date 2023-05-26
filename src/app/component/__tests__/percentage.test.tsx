import { render, screen } from '@testing-library/react';
import Percentage from '@pintu/technical-test/app/component/percentage';

describe('Percentage', () => {
  it('should load component', () => {
    render(<Percentage />);

    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });

  it('should render value with green caret up for positive value greater than zero', () => {
    render(<Percentage value={1.23} />);

    expect(screen.getByText('Up')).toBeInTheDocument();
    expect(screen.getByText('Up')).toHaveClass('border-b-green-600');
    expect(screen.getByText('1.23%')).toBeInTheDocument();
  });

  it('should render value with red caret down for negative value', () => {
    render(<Percentage value={-2.34} />);

    expect(screen.getByText('Down')).toBeInTheDocument();
    expect(screen.getByText('Down')).toHaveClass('border-t-red-600');
    expect(screen.getByText('2.34%')).toBeInTheDocument();
  });
});
