import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const DeleteModal = ({ closeModal, isOpen, onDelete }) => {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-50"
            onClose={closeModal}
        >

            <div className="fixed inset-0 bg-[#260d0d]/60 backdrop-blur-sm" />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-[#e8d44e] rounded-3xl shadow-2xl border-4 border-[#ba0c10] p-6 transform transition-all duration-300">
                    <DialogTitle className="text-center text-2xl font-bold text-[#260d0d]">
                        Confirm Deletion
                    </DialogTitle>

                    <p className="mt-4 text-center text-[#260d0d] text-sm">
                        Are you sure you want to delete this item? This action cannot be undone!
                    </p>

                    <hr className="my-6 border-[#ba0c10]" />

                    <div className="flex justify-around">
                        <button
                            onClick={onDelete}
                            className="bg-[#fddb1a] text-[#260d0d] px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-[#cac483] transition"
                        >
                            Yes, Delete
                        </button>

                        <button
                            onClick={closeModal}
                            className="bg-[#ba0c10] text-[#e8d44e] px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-[#7e0304] transition"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default DeleteModal;
