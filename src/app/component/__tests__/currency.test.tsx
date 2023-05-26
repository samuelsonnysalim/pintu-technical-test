import { render, screen } from '@testing-library/react';
import Currency from '@pintu/technical-test/app/component/currency';

describe('Currency', () => {
  it('should load component', () => {
    render(<Currency />);

    expect(screen.getByText('Rp 0')).toBeInTheDocument();
  });

  it('should render value in currency formatted', () => {
    render(<Currency value={1000000} />);

    expect(screen.getByText('Rp 1.000.000')).toBeInTheDocument();
  });

  it('should render value with green text color after updated with greater than previous value', () => {
    const { rerender } = render(<Currency value={1000000} />);
    rerender(<Currency value={2000000} />);

    expect(screen.getByText('Rp 2.000.000')).toBeInTheDocument();
    expect(screen.getByText('Rp 2.000.000')).toHaveClass('text-green-600');
  });

  it('should render value with red text color after updated with lower than previous value', () => {
    const { rerender } = render(<Currency value={1000000} />);
    rerender(<Currency value={500000} />);

    expect(screen.getByText('Rp 500.000')).toBeInTheDocument();
    expect(screen.getByText('Rp 500.000')).toHaveClass('text-red-600');
  });
});
