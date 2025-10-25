import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dashboard } from '@/pages/dashboard';
import { api } from '@/api';
import { vi, Mock } from 'vitest';

vi.mock('@/api');

describe('Dashboard component', () => {
  const mockSetLoading = vi.fn();

  const mockActivities = [
    { id: 1, activity_type: 'workout', description: 'Run', status: 'planned', date: '2025-10-26', duration_minutes: 30 },
    { id: 2, activity_type: 'meal', description: 'Breakfast', status: 'completed', date: '2025-10-25', calories: 500 },
    { id: 3, activity_type: 'steps', description: '', status: 'in_progress', date: '2025-10-26', steps: 10000 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders stats and activities', async () => {
    (api.activities.list as Mock).mockResolvedValue(mockActivities);

    render(<Dashboard setLoading={mockSetLoading} />);

    // Wait for activities to load
    await waitFor(() => expect(api.activities.list).toHaveBeenCalled());

    expect(screen.getByText(/Total Activities/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // total count
    expect(screen.getAllByText(/Workouts/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Meals/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Steps Logged/i)[0]).toBeInTheDocument();

    // Activity cards rendered
    expect(screen.getByText(/Run/i)).toBeInTheDocument();
    expect(screen.getByText(/Breakfast/i)).toBeInTheDocument();
    expect(screen.getAllByText(/26\/10\/2025/i).length).toBeGreaterThan(0);
  });

  test('filters activities by type', async () => {
    (api.activities.list as Mock).mockResolvedValue(mockActivities);

    render(<Dashboard setLoading={mockSetLoading} />);

    await waitFor(() => expect(api.activities.list).toHaveBeenCalled());

    // Click "Meal" filter
    fireEvent.click(screen.getAllByText('Meal')[0]);
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Run')).not.toBeInTheDocument();
    expect(screen.queryByText('10000')).not.toBeInTheDocument();
  });

  test('shows empty state if no activities', async () => {
    (api.activities.list as Mock).mockResolvedValue([]);

    render(<Dashboard setLoading={mockSetLoading} />);

    await waitFor(() => expect(api.activities.list).toHaveBeenCalled());

    expect(screen.getByText(/No activities found/i)).toBeInTheDocument();
    expect(screen.getByText(/Click "Add Activity" to get started/i)).toBeInTheDocument();
  });

  test('calls delete API when deleting an activity', async () => {
    (api.activities.list as Mock).mockResolvedValue(mockActivities);
    (api.activities.delete as Mock).mockResolvedValue({});

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<Dashboard setLoading={mockSetLoading} />);
    await waitFor(() => expect(api.activities.list).toHaveBeenCalled());

    fireEvent.click(screen.getAllByLabelText('Delete activity')[0]);

    await waitFor(() => expect(api.activities.delete).toHaveBeenCalledWith(1));
  });
});
