import {FieldValues} from 'react-hook-form';
import axios from 'axios';

export const updateData = async (data: string, url: string) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
