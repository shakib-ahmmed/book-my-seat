import React from 'react';
const Loader = () => {


    return (
        <div className='h-screen flex justify-center items-center bg-green-50'>
            <img className='animate-spin w-40' src='/logo.png' alt="logo icon loading" />
        </div>
    );
};

export default Loader;