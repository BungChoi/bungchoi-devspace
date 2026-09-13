import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Flutter</Badge>);
    expect(screen.getByText('Flutter')).toBeInTheDocument();
  });

  it('renders with dot indicator when dot prop is true', () => {
    const { container } = render(<Badge dot>Active</Badge>);
    const dot = container.querySelector('span.rounded-full.shrink-0');
    expect(dot).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-test-class">Tag</Badge>);
    const badge = screen.getByText('Tag');
    expect(badge).toHaveClass('custom-test-class');
  });
});
