import React from 'react';

export const getDataById = async <T>(
  url: string,
  setData: React.Dispatch<React.SetStateAction<T>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  const data = await fetch(url, {
    method: 'GET',
  })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  setData(await data?.json());
};
