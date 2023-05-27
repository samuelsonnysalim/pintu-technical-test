import { render, screen } from '@testing-library/react';
import RootLayout from '@pintu/technical-test/app/layout';

jest.mock('@pintu/technical-test/app/globals.css', () => '');
jest.mock('next/font/google', () => ({ Inter: () => ({}) }));

describe('RootLayout', () => {
  it('should load component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link')[0]).toHaveClass('bg-logo');
    expect(screen.getByText('Fitur')).toBeInTheDocument();
    expect(screen.getByText('PTU')).toBeInTheDocument();
    expect(screen.getByText('Edukasi')).toBeInTheDocument();
    expect(screen.getByText('Ikuti Kami')).toBeInTheDocument();
    expect(screen.getByText('Blog & News')).toBeInTheDocument();
    expect(screen.getByText('Karier')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link')[screen.getAllByRole('link').length - 1],
    ).toHaveClass('bg-flag-id');
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
