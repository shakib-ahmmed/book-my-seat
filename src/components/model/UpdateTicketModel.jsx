import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdateTicketForm from '../Form/UpdateTicketForm' 

const UpdateTicketModal = ({ setIsEditModalOpen, isOpen }) => {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => setIsEditModalOpen(false)}
        >
            <div className="fixed inset-0 bg-[#260d0d]/50 backdrop-blur-sm" />

            <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-[#e8d44e] p-6 rounded-2xl shadow-xl border-4 border-[#ba0c10]">
     
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-[#ba0c10] px-3 py-1 rounded-md text-[#e8d44e] font-semibold hover:bg-[#7e0304] transition"
                        >
                            X
                        </button>
                    </div>
                    <DialogTitle
                        as="h3"
                        className="text-lg font-medium text-center text-[#260d0d] leading-6"
                    >
                        Update Ticket Info
                    </DialogTitle>
                    <div className="mt-4 w-full">
                        <UpdateTicketForm />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default UpdateTicketModal
