import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        margin: '60px',
      }}
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
};

export default Loader;
