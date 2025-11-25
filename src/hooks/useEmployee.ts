import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE } from '../services/queries';

export const useEmployee = (id: string) => {
  const { data, loading, error } = useQuery(GET_EMPLOYEE, {
    variables: { id },
    skip: !id,
  });

  return {
    employee: data?.employee,
    loading,
    error,
  };
};
