import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../menu';

describe('Menu', () => {
  it('should render component', () => {
    render(<Menu />);

    expect(screen.getByText('Fitur')).toBeInTheDocument();
    expect(screen.getByText('PTU')).toBeInTheDocument();
    expect(screen.getByText('Edukasi')).toBeInTheDocument();
    expect(screen.getByText('Ikuti Kami')).toBeInTheDocument();
    expect(screen.getByText('Blog & News')).toBeInTheDocument();
    expect(screen.getByText('Karier')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link')[screen.getAllByRole('link').length - 1],
    ).toHaveClass('bg-flag-id');
  });

  it('should show submenu on hover', async () => {
    const user = userEvent.setup({ delay: null });
    render(<Menu />);

    await user.hover(screen.getByText('Fitur'));
    await waitFor(() => {
      expect(screen.getByText('Harga Cryptocurrency')).toBeInTheDocument();
      expect(screen.getByText('Earn')).toBeInTheDocument();
      expect(screen.getByText('Biaya Transaksi')).toBeInTheDocument();
      expect(screen.getByText('Limit Trading Beli/Jual')).toBeInTheDocument();
      expect(screen.getByText('OTC')).toBeInTheDocument();
    });

    await user.hover(screen.getByText('Edukasi'));
    await waitFor(() => {
      expect(screen.getByText('Tentang')).toBeInTheDocument();
      expect(screen.getByText('Pintu Academy')).toBeInTheDocument();
      expect(screen.getByText('FAQ')).toBeInTheDocument();
    });

    await user.hover(screen.getByText('Ikuti Kami'));
    await waitFor(() => {
      expect(screen.getByText('Telegram')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('Youtube')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('Discord')).toBeInTheDocument();
    });

    await user.hover(screen.getByText('Blog & News'));
    await waitFor(() => {
      expect(screen.getByText('Pintu Blog')).toBeInTheDocument();
      expect(screen.getByText('Pintu News')).toBeInTheDocument();
      expect(screen.getByText('Pintu Press Kit')).toBeInTheDocument();
    });

    await user.hover(screen.getAllByText('Karier')[0]);
    await waitFor(() => {
      expect(screen.getAllByText('Karier')[1]).toBeInTheDocument();
      expect(screen.getByText('Karier Engineering')).toBeInTheDocument();
    });
  });
});
