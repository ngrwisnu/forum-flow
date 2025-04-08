import { fireEvent, render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { useSearchParams } from 'react-router-dom';
import ThreadsFilter from '../ThreadsFilter';

vi.mock('../../../helpers/capitalizeFirstLetter', () => ({
  capitalizedFirstLetter: (str: string) => `${str}`,
}));

const mockSetSearchParams = vi.fn();
let mockParams = new URLSearchParams();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('ThreadsFilter', () => {
  const categories = ['redux', 'general', 'react'];

  beforeEach(() => {
    mockParams = new URLSearchParams();

    (useSearchParams as unknown as Mock).mockReturnValue([
      mockParams,
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render both select elements and all category options', () => {
    render(<ThreadsFilter categories={categories} />);

    const sortSelect = screen.getByText(/sorted by:/i);
    const categorySelect = screen.getByText(/filtered by:/i);

    expect(sortSelect).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();

    expect(screen.getByRole('option', { name: /newest/i })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /highest votes/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: /all categories/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /redux/i })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /general/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /react/i })).toBeInTheDocument();
  });

  test('should update query params when user selects a new sort option', async () => {
    render(<ThreadsFilter categories={categories} />);

    const sortSelect = screen.getAllByRole('combobox');

    fireEvent.change(sortSelect[0], { target: { value: 'highest_votes' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
    );

    const callArg = mockSetSearchParams.mock.calls[0][0];

    expect(callArg.get('sort')).toBe('highest_votes');
  });

  test('should update query params when user selects a new filter option', async () => {
    render(<ThreadsFilter categories={categories} />);

    const filterSelect = screen.getAllByRole('combobox');

    fireEvent.change(filterSelect[1], { target: { value: 'react' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
    );

    const callArg = mockSetSearchParams.mock.calls[0][0];

    expect(callArg.get('category')).toBe('react');
  });

  test('should use default values if query params are not set', () => {
    render(<ThreadsFilter categories={categories} />);

    const sortSelect = screen.getAllByRole('combobox')[0];
    const filterSelect = screen.getAllByRole('combobox')[1];

    expect(sortSelect).toHaveValue('newest');
    expect(filterSelect).toHaveValue('all');
  });
});
