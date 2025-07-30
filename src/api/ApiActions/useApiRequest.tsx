import React, { useState } from 'react'

export const useApiRequest = () => {
    const [data, setData] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get<T>(
          `${API_URL}${params}${id ?? ""}`
        );
        setData(response); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, id]);

  return { data, loading };
}

