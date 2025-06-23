import { memo, useState, useEffect } from 'react';
import { Input } from '../../../components/ui/Input/Input.component';
import { Button } from '../../../components/ui/Button/Button.component';
import { UserIcon } from '@heroicons/react/24/outline';
import { useUserProfile } from '../hooks/useUserProfile.hook';

export const ProfileSection = memo(() => {
  const { user, isLoading, error, updateProfile } = useUserProfile();
  const [username, setUsername] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!username.trim()) return;

    setIsUpdating(true);
    try {
      await updateProfile({ username: username.trim() });
    } catch (error) {
      console.error('Błąd podczas aktualizacji profilu:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-java-orange/10 rounded-lg">
          <UserIcon className="w-5 h-5 text-java-orange" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profil</h2>
          <p className="text-sm text-gray-600">
            Zarządzaj informacjami o swoim profilu
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nazwa użytkownika"
            placeholder="Wprowadź nową nazwę użytkownika"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            disabled
            helperText="Email nie może być zmieniony"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleUpdateProfile}
            isLoading={isUpdating}
            disabled={!username.trim() || username === user?.username}
          >
            Zapisz zmiany
          </Button>
        </div>
      </div>
    </div>
  );
});

ProfileSection.displayName = 'ProfileSection';
