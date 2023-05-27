import { render, screen } from '@testing-library/react';
import ClientProvider from '@pintu/technical-test/app/client-provider';

describe('ClientProvider', () => {
  it('should load component', () => {
    render(
      <ClientProvider>
        <div>Test Content</div>
      </ClientProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
