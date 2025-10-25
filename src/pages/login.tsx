import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { api } from '@/api'

export const Login = ({ onSuccess, onSwitchToSignup, loading, setLoading }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setSubmitError('');

    api.auth.login({
      email: formData.email,
      password: formData.password
    })
      .then((response) => {
        onSuccess(response);
      })
      .catch((error) => {
        setSubmitError(error.message || 'Login failed. Please check your credentials.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="m-10 flex-1 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
            <AlertCircle size={20} />
            <span>{submitError}</span>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
