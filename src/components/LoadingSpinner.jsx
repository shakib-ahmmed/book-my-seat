import React from "react";

const LoadingSpinner = ({
    fullScreen = false,
    text = "Loading, please wait...",
    size = 28,
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center ${fullScreen ? "min-h-screen" : "py-12"
                }`}
        >
            <div className="relative">
                              <div
                    className="rounded-full border-4 border-transparent border-t-[6px] 
                     border-t-[#ff6b6b] animate-spin"
                    style={{ width: size * 4, height: size * 4 }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="rounded-full bg-gradient-to-br` from-[#4b2d0b] to-[#ffd93d] animate-ping"
                        style={{ width: size, height: size }}
                    />
                </div>
            </div>

            {text && (
                <p className="mt-6 font-semibold text-lg tracking-wide 
                      text-[#4c3100] dark:text-[#FDDB1A] animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
