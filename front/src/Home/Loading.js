import * as React from "react";
import { useEffect } from 'react';
import './Loading.css'

import { useDencrypt } from "use-dencrypt-effect";


const Loading = ({ query }) => {

    const defaultValues = ["Howdoi", "Html scripts", "React Hook", "Javascript"];

    let values;
    let interval = 2000;
    
    if (query) {
      values = [`tags.contains('${query}')`, `tags.find('${query}')`, `tags.filter('${query}')`]
      interval = 10000
    }

    values = values || defaultValues;
    
    const { result, dencrypt } = useDencrypt();

    useEffect(() => {
      let i = 0;

      dencrypt(values[i]);
  
      const action = setInterval(() => {
        
        dencrypt(values[i]);
        i = i === values.length - 1 ? 0 : i + 1;
        
      }, interval);
  
      return () => clearInterval(action);

    }, [query]);

  return (

    <span className='loading'>{result}</span>
  
    );
};

export default Loading;
