import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight = false, color = '#e8d44e', size = 100 }) => {
    return (
        <div
            className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'
                } flex flex-col justify-center items-center bg-[#fddb1a]/10`}
        >
            <ScaleLoader
                color={color}
                height={size / 2}
                width={size / 8}
                radius={2}
                margin={2}
                speedMultiplier={1}
            />
            <p className='mt-4 text-[#260d0d] font-semibold text-lg animate-pulse'>
                Loading...
            </p>
        </div>
    )
}

export default LoadingSpinner
