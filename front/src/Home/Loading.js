import * as React from "react";
import { useEffect } from 'react';
import './Loading.css'

import { useDencrypt } from "use-dencrypt-effect";

const values = ["Howdoi", "Html scripts", "React Hook", "Javascrit"];

const Loading = () => {
    const { result, dencrypt } = useDencrypt();

    useEffect(() => {
      let i = 0;
  
      const action = setInterval(() => {
        dencrypt(values[i]);
  
        i = i === values.length - 1 ? 0 : i + 1;
      }, 2000);
  
      return () => clearInterval(action);
    }, []);

  return (
  <div className='loading'>{result}</div>
  );
};

export default Loading;
