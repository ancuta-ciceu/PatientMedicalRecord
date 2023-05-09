import {FieldValues} from 'react-hook-form';
import axios from 'axios';

export const postData = async (data: FieldValues, url: string) => {
  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
};
