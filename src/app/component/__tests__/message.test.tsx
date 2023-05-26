import { render, screen } from '@testing-library/react';
import Message from '@pintu/technical-test/app/component/message';

describe('Message', () => {
  it('should load component', () => {
    render(<Message>Test Message</Message>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-cyan-200 text-cyan-900',
    );
  });

  it('should load component with title', () => {
    render(<Message title="Test Title">Test Message</Message>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-cyan-200 text-cyan-900',
    );
  });

  it('should load component with type error', () => {
    render(<Message type="error">Test Message</Message>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-red-200 text-red-900',
    );
  });

  it('should load component with type success', () => {
    render(<Message type="success">Test Message</Message>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-lime-200 text-lime-900',
    );
  });

  it('should load component with type warning', () => {
    render(<Message type="warning">Test Message</Message>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-orange-200 text-orange-900',
    );
  });

  it('should load component with type info', () => {
    render(<Message type="info">Test Message</Message>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').parentElement).toHaveClass(
      'bg-cyan-200 text-cyan-900',
    );
  });
});
