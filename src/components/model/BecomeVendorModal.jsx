import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const BecomeVendorModal = ({ isOpen, closeModal }) => {
    const axiosSecure = useAxiosSecure()

    const handleRequest = async () => {
        try {
            await axiosSecure.post('/become-vendor')
            toast.success('Vendor request sent! Please wait for admin approval.')
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Something went wrong!')
        } finally {
            closeModal()
        }
    }

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closeModal}
        >
            <div className="fixed inset-0 bg-[#260d0d]/50 backdrop-blur-sm" />

            <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-[#e8d44e] p-6 rounded-2xl shadow-xl border-4 border-[#ba0c10]">
                    <DialogTitle
                        as="h3"
                        className="text-center text-2xl font-bold text-[#260d0d]"
                    >
                        Become a Vendor
                    </DialogTitle>

                    <div className="mt-4 text-center text-[#260d0d]">
                        <p>
                            Before becoming a vendor, please read all rules and guidelines carefully.
                        </p>
                    </div>

                    <hr className="my-6 border-[#ba0c10]" />

                    <div className="flex justify-around mt-4">
                        <button
                            onClick={handleRequest}
                            className="btn bg-[#18351b] text-white font-semibold w-[120px] h-[40px] hover:scale-105 transition flex items-center justify-center"
                        >
                            Continue
                        </button>

                        <button
                            onClick={closeModal}
                            className="btn bg-[#660103] text-white font-semibold w-[120px] h-[40px] hover:scale-105 transition flex items-center justify-center"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default BecomeVendorModal;
