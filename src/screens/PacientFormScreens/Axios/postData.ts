import {FieldValues} from 'react-hook-form';
import axios from 'axios';

export const postData = async (data: string, url: string) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
