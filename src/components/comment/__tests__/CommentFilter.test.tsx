import { render, screen, fireEvent } from '@testing-library/react';
import CommentFilter from '../CommentFilter';

describe('CommentFilter', () => {
  test('should render with correct default value', () => {
    render(<CommentFilter value="highest_votes" sorterHandler={vi.fn()} />);

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('highest_votes');
  });

  test('should render all filter options', () => {
    render(<CommentFilter value="highest_votes" sorterHandler={vi.fn()} />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('newest');
    expect(options[1]).toHaveValue('highest_votes');
  });

  test('should trigger sorterHandler when selection changes', () => {
    const mockHandler = vi.fn();

    render(<CommentFilter value="highest_votes" sorterHandler={mockHandler} />);

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'newest' } });

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
