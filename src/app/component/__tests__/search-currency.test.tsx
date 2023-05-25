import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchCurrency from '../search-currency';

describe('SearchCurrency', () => {
  it('should load component', () => {
    render(<SearchCurrency />);

    expect(screen.getByText('Cari aset di Pintu...')).toBeInTheDocument();
  });

  it('should open search input panel, focus on search input, and supported currencies on click', async () => {
    const user = userEvent.setup({ delay: null });
    render(<SearchCurrency />);

    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.queryByText('Cari aset di Pintu...')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari aset di Pintu...')).toHaveFocus();
  });

  it('should close search input panel on clicking close button', async () => {
    const user = userEvent.setup({ delay: null });
    render(<SearchCurrency />);

    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.queryByText('Cari aset di Pintu...')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();

    await user.click(screen.getByTitle('Close'));
    expect(screen.getByText('Cari aset di Pintu...')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Cari aset di Pintu...'),
    ).not.toBeInTheDocument();
  });
});
