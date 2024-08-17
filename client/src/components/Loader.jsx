import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const Loader = ({ loading, size = 15, color = '#64748b' }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <PulseLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default Loader;
