import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
// import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // useCustomToast을 사용하여 Toast message로 에러 핸들링
  // const toast = useCustomToast();
  const fallback = [];
  // const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
  //   onError: (error) => {
  //     const title =
  //       error instanceof Error
  //         ? error.message
  //         : 'error connect to the server...';

  //     toast({ title, status: 'error' });
  //   },
  // });

  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments);
  // queryClient에서 Error handling
  return data;
}
