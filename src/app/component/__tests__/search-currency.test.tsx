import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchCurrency from '../search-currency';

describe('SearchCurrency', () => {
  it('should load component', () => {
    render(<SearchCurrency />);

    expect(screen.getByText('Cari aset di Pintu...')).toBeInTheDocument();
  });

  it('should show search input and supported currencies on click', async () => {
    const user = userEvent.setup({ delay: null });
    render(<SearchCurrency />);

    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Cari aset di Pintu...',
    );
  });
});
