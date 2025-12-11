import React from "react";

const FullScreenSpinner = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center animate-fadeIn">

            <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-transparent border-t-[6px] border-t-[#ff6b6b] animate-spin"></div>
               
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4b2d0b] to-[#ffd93d] animate-ping"></div>
                </div>
            </div>

            <p className="mt-6 text-[#4c3100] font-semibold text-xl tracking-wide animate-pulse">
                Loading, please wait...
            </p>
        </div>
    );
};

export default FullScreenSpinner;
