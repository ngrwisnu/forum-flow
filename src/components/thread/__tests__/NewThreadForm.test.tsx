import { render, screen, fireEvent } from '@testing-library/react';
import NewThreadForm from '../NewThreadForm';

vi.mock('../../../helpers/capitalizeFirstLetter', () => ({
  capitalizedFirstLetter: () => 'Test',
}));

describe('NewThreadForm', () => {
  const categories = ['general', 'react'];

  test('should render all form input fields', () => {
    render(<NewThreadForm categories={categories} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Body/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Post thread/i }),
    ).toBeInTheDocument();
  });

  test('should render the list of categories', () => {
    render(<NewThreadForm categories={categories} onSubmit={vi.fn()} />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('disabled');
    expect(options[1]).toHaveValue('general');
    expect(options[2]).toHaveValue('react');
  });

  test('should call onSubmit when post thread button is clicked', async () => {
    const mockFormValues = {
      title: 'My New Thread',
      category: 'react',
      body: '<p>This is the content</p>',
    };

    const mockSubmit = vi.fn();

    render(<NewThreadForm categories={categories} onSubmit={mockSubmit} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const categorySelect = screen.getByLabelText(/Category/i);
    const editor = screen.getByTestId('editor');
    const postButton = screen.getByRole('button', { name: /Post thread/i });

    // Simulate user event
    fireEvent.change(titleInput, { target: { value: mockFormValues.title } });
    fireEvent.change(categorySelect, {
      target: { value: mockFormValues.category },
    });
    fireEvent.blur(editor, {
      target: { innerHTML: mockFormValues.body },
    });

    fireEvent.click(postButton);

    expect(mockSubmit).toHaveBeenCalledWith(mockFormValues);
  });
});
