import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingsApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export default function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingSettings, mutate: updateSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        toast.success('settings were successfully edited!');
        queryClient.invalidateQueries({
          queryKey: ['settings'],
        });
      },
      onError: () => {
        toast.error('There was an error editing the settings');
      },
    }
  );

  return { isUpdatingSettings, updateSettings };
}
