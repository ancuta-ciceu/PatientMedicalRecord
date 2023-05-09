export const getDataById = async <T>(
  url: string,
  setData: React.Dispatch<React.SetStateAction<T>>,
) => {
  const data = await fetch(url, {
    method: 'GET',
  }).catch(err => console.log(err));
  setData(await data?.json());
};
