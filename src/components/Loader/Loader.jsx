import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0',
      }}
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
};

export default Loader;
