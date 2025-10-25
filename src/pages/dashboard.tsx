import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, Dumbbell, Flame, Footprints, Save } from 'lucide-react';
import { api } from '@/api';

const ACTIVITY_TYPES = [
  { value: 'workout', label: 'Workout', icon: Dumbbell, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'meal', label: 'Meal', icon: Flame, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'steps', label: 'Steps', icon: Footprints, color: 'bg-green-100 text-green-700 border-green-200' }
];

const STATUS_CHOICES = [
  { value: 'planned', label: 'Planned', color: 'bg-gray-100 text-gray-700' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' }
];

export function Dashboard({ setLoading }: any) {
  const [activities, setActivities] = useState<any>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await api.activities.list();
      setActivities(data);
      setError('');
    } catch (err) {
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingActivity(null);
    setShowModal(true);
  };

  const handleEdit = (activity: any) => {
    setEditingActivity(activity);
    setShowModal(true);
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;

    try {
      setLoading(true)
      await api.activities.delete(id);
      setActivities(activities.filter((a: any) => a.id !== id));
    } catch (err) {
      alert('Failed to delete activity');
    } finally {
      setLoading(false)
    }
  };

  const handleSave = async (activityData: any) => {
    try {
      setShowModal(false)
      setLoading(true)
      if (editingActivity) {
        await api.activities.update(editingActivity.id, activityData);
      } else {
        await api.activities.create(activityData);
      }
      setShowModal(false);
      loadActivities()
    } catch (err) {
      alert('Failed to save activity');
    } finally {
      setLoading(false)
    }
  };

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter((a: any) => a.activity_type === filter);

  const stats = {
    total: activities.length,
    workout: activities.filter((a: any) => a.activity_type === 'workout').length,
    meal: activities.filter((a: any) => a.activity_type === 'meal').length,
    steps: activities.filter((a: any) => a.activity_type === 'steps').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Dashboard</h1>
          <p className="text-gray-600">Track your workouts, meals, and daily steps</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Activities" value={stats.total} color="bg-purple-100 text-purple-700" />
          <StatCard title="Workouts" value={stats.workout} color="bg-blue-100 text-blue-700" />
          <StatCard title="Meals" value={stats.meal} color="bg-orange-100 text-orange-700" />
          <StatCard title="Steps Logged" value={stats.steps} color="bg-green-100 text-green-700" />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              All
            </button>
            {ACTIVITY_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${filter === type.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Plus size={20} />
            Add Activity
          </button>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No activities found</p>
            <p className="text-gray-400 mt-2">Click "Add Activity" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity: any) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ActivityModal
          activity={editingActivity}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color} p-3 text-center`}>{value}</p>
    </div>
  );
}

function ActivityCard({ activity, onEdit, onDelete }: any) {
  const typeInfo = ACTIVITY_TYPES.find(t => t.value === activity.activity_type);
  const statusInfo = STATUS_CHOICES.find(s => s.value === activity.status);
  const Icon = typeInfo?.icon || Dumbbell;

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${typeInfo?.color || 'bg-gray-100'}`}>
          <Icon size={24} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(activity)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            aria-label="Delete activity"
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{typeInfo?.label}</h3>

      {activity.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
      )}

      <div className="space-y-2 mb-4">
        {activity.duration_minutes && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Dumbbell size={16} />
            <span>{activity.duration_minutes} minutes</span>
          </div>
        )}
        {activity.calories && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Flame size={16} />
            <span>{activity.calories} calories</span>
          </div>
        )}
        {activity.steps && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Footprints size={16} />
            <span>{activity.steps.toLocaleString()} steps</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>{new Date(activity.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusInfo?.color}`}>
        {statusInfo?.label}
      </div>
    </div>
  );
}

function ActivityModal({ activity, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    activity_type: activity?.activity_type || 'workout',
    description: activity?.description || '',
    duration_minutes: activity?.duration_minutes || '',
    calories: activity?.calories || '',
    steps: activity?.steps || '',
    status: activity?.status || 'planned',
    date: activity?.date || new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const submitData = {
      activity_type: formData.activity_type,
      description: formData.description,
      status: formData.status,
      date: formData.date,
      duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      calories: formData.calories ? parseInt(formData.calories) : null,
      steps: formData.steps ? parseInt(formData.steps) : null,
    };
    onSave(submitData);
  };

  const showDuration = formData.activity_type === 'workout';
  const showCalories = formData.activity_type === 'workout' || formData.activity_type === 'meal';
  const showSteps = formData.activity_type === 'steps';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {activity ? 'Edit Activity' : 'Add Activity'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <select
              name="activity_type"
              value={formData.activity_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {ACTIVITY_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Add details about your activity..."
            />
          </div>

          {showDuration && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="30"
              />
            </div>
          )}

          {showCalories && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="250"
              />
            </div>
          )}

          {showSteps && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Steps
              </label>
              <input
                type="number"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="10000"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {STATUS_CHOICES.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {activity ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}