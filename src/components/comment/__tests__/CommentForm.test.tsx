/*
- should render the Editor and post comment button
- should call onSubmit with content from editor and clears it
*/

import { render, screen, fireEvent } from '@testing-library/react';
import CommentForm from '../CommentForm';

describe('CommentForm', () => {
  test('should render the Editor and post comment button', () => {
    render(<CommentForm onSubmit={() => {}} />);

    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /post comment/i }),
    ).toBeInTheDocument();
  });

  test('should call onSubmit with content from editor and clears it', () => {
    const mockSubmit = vi.fn();

    render(<CommentForm onSubmit={mockSubmit} />);

    const editor = screen.getByTestId('editor');
    const button = screen.getByRole('button', { name: /post comment/i });

    // Simulate typing in contentEditable
    editor.innerHTML = '<p>This is a comment</p>';

    fireEvent.blur(editor);
    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith('<p>This is a comment</p>');
    expect(editor.innerHTML).toBe('');
  });
});
