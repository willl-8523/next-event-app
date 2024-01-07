import useSWR from 'swr';

function useEvents({ id, url }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${url}/${id || ''}`, fetcher);

  return { data, loading: isLoading, error };
}

export default useEvents;
