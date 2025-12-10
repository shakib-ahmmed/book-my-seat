import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#fddb1a]/10 px-4">
            <img
                src="../../public/error.png"
                alt="Error"
                className="max-w-sm md:max-w-md mb-8 animate-pulse"
            />
            <h1 className="text-[#260d0d] text-[48px] font-bold text-center mb-4">
                Oops! Page not found
            </h1>
            <p className="text-[#676567] text-[18px] text-center mb-6">
                The page you are looking for doesn’t exist or is unavailable. <br />
                Please check the URL or go back to the homepage.
            </p>
            <Link
                to="/"
                className="bg-[#e8d44e] hover:bg-[#fddb1a] text-[#260d0d] font-semibold w-[160px] h-[50px] rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
            >
                Go Home
            </Link>
        </div>
    )
}

export default ErrorPage
