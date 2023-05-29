import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '@pintu/technical-test/app/component/menu';
import { resizeScreenSize } from '@pintu/technical-test/jest/util';

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

  it('should render component on mobile layout', () => {
    resizeScreenSize(400);
    render(<Menu />);

    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();
  });

  it('should open menu on clicking menu icon on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(<Menu />);

    await user.click(screen.getByTitle('Show Menu'));

    await waitFor(() => {
      expect(screen.getByTitle('Close Menu')).toBeInTheDocument();
      expect(screen.getAllByText('Fitur')[0]).toBeInTheDocument();
      expect(screen.getAllByText('PTU')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Edukasi')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Ikuti Kami')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Blog & News')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Karier')[0]).toBeInTheDocument();
      expect(screen.getByText('Bahasa Indonesia')).toBeInTheDocument();
    });
  });

  it('should close menu on clicking close icon on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(<Menu />);

    await user.click(screen.getByTitle('Show Menu'));

    await waitFor(() => user.click(screen.getByTitle('Close Menu')));

    await waitFor(() => {
      expect(screen.queryAllByText('Fitur')).toHaveLength(1);
      expect(screen.queryAllByText('PTU')).toHaveLength(1);
      expect(screen.queryAllByText('Edukasi')).toHaveLength(1);
      expect(screen.queryAllByText('Ikuti Kami')).toHaveLength(1);
      expect(screen.queryAllByText('Blog & News')).toHaveLength(1);
      expect(screen.queryAllByText('Karier')).toHaveLength(1);
      expect(screen.queryByText('Bahasa Indonesia')).not.toBeInTheDocument();
    });
  });

  it('should disable scroll on body while opening menu on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(<Menu />);

    await user.click(screen.getByTitle('Show Menu'));

    expect(document.body).toHaveClass('overflow-hidden');
  });

  it('should enable scroll on body while closing menu on mobile layout', async () => {
    const user = userEvent.setup();
    resizeScreenSize(400);
    render(<Menu />);

    await user.click(screen.getByTitle('Show Menu'));
    await waitFor(() => user.click(screen.getByTitle('Close Menu')));

    expect(document.body).not.toHaveClass('overflow-hidden');
  });

  it('should toggle click submenu on mobile layout', async () => {
    const user = userEvent.setup();
    resizeScreenSize(400);
    render(<Menu />);

    await user.click(screen.getByTitle('Show Menu'));

    await waitFor(() => user.click(screen.getAllByText('Fitur')[0]));
    await waitFor(() => {
      expect(screen.getByText('Harga Cryptocurrency')).toBeInTheDocument();
      expect(screen.getByText('Earn')).toBeInTheDocument();
      expect(screen.getByText('Biaya Transaksi')).toBeInTheDocument();
      expect(screen.getByText('Limit Trading Beli/Jual')).toBeInTheDocument();
      expect(screen.getByText('OTC')).toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Fitur')[0]));
    await waitFor(() => {
      expect(
        screen.queryByText('Harga Cryptocurrency'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Earn')).not.toBeInTheDocument();
      expect(screen.queryByText('Biaya Transaksi')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Limit Trading Beli/Jual'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('OTC')).not.toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Edukasi')[0]));
    await waitFor(() => {
      expect(screen.getByText('Tentang')).toBeInTheDocument();
      expect(screen.getByText('Pintu Academy')).toBeInTheDocument();
      expect(screen.getByText('FAQ')).toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Edukasi')[0]));
    await waitFor(() => {
      expect(screen.queryByText('Tentang')).not.toBeInTheDocument();
      expect(screen.queryByText('Pintu Academy')).not.toBeInTheDocument();
      expect(screen.queryByText('FAQ')).not.toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Ikuti Kami')[0]));
    await waitFor(() => {
      expect(screen.getByText('Telegram')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('Youtube')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('Discord')).toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Ikuti Kami')[0]));
    await waitFor(() => {
      expect(screen.queryByText('Telegram')).not.toBeInTheDocument();
      expect(screen.queryByText('Twitter')).not.toBeInTheDocument();
      expect(screen.queryByText('Instagram')).not.toBeInTheDocument();
      expect(screen.queryByText('Youtube')).not.toBeInTheDocument();
      expect(screen.queryByText('Facebook')).not.toBeInTheDocument();
      expect(screen.queryByText('Discord')).not.toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Blog & News')[0]));
    await waitFor(() => {
      expect(screen.getByText('Pintu Blog')).toBeInTheDocument();
      expect(screen.getByText('Pintu News')).toBeInTheDocument();
      expect(screen.getByText('Pintu Press Kit')).toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Blog & News')[0]));
    await waitFor(() => {
      expect(screen.queryByText('Pintu Blog')).not.toBeInTheDocument();
      expect(screen.queryByText('Pintu News')).not.toBeInTheDocument();
      expect(screen.queryByText('Pintu Press Kit')).not.toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Karier')[0]));
    await waitFor(() => {
      expect(screen.getAllByText('Karier')[1]).toBeInTheDocument();
      expect(screen.getByText('Karier Engineering')).toBeInTheDocument();
    });

    await waitFor(() => user.click(screen.getAllByText('Karier')[0]));
    await waitFor(() => {
      expect(screen.queryAllByText('Karier')).toHaveLength(2);
      expect(screen.queryByText('Karier Engineering')).not.toBeInTheDocument();
    });
  });
});
