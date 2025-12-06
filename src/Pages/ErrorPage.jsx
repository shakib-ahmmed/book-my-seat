import React from 'react';

import { Link } from 'react-router-dom';



const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <img src="/App-Error.png" alt="Error" className="max-w-md" />
            <h1 className='text-black text-[48px]  text-center'>Oops, page not found!</h1>
            <p className='text-[20px] text-center pb-3'>The page you are looking for is not available. <br />Thanks</p>

            <Link
                to="/"
                className="btn bg-[#075a12] hover:bg-green-950 text-white font-semibold w-[145px] h-[45px] hover:scale-105 transition ease-in-out flex items-center justify-center"
            >
                Go Back!
            </Link>

        </div>
    )
};
export default ErrorPage;