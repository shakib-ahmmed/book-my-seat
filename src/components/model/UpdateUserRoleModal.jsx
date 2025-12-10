import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
    const [updatedRole, setUpdatedRole] = useState(user?.role || 'customer')
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        setUpdatedRole(user?.role)
    }, [user])

    const handleRoleUpdate = async () => {
        try {
            await axiosSecure.patch('/update-role', {
                email: user?.email,
                role: updatedRole,
            })
            toast.success('Role Updated!')
            refetch()
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Failed to update role')
        } finally {
            closeModal()
        }
    }

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


                    {/* Title */}
                    <DialogTitle className="text-center text-2xl font-bold text-[#260d0d]">
                        Update User Role
                    </DialogTitle>

                    <div className="mt-4">
                        <select
                            value={updatedRole}
                            onChange={e => setUpdatedRole(e.target.value)}
                            className="w-full my-3 px-4 py-2 rounded-xl border-2 border-[#ba0c10] text-[#260d0d] font-medium focus:outline-none focus:ring-2 focus:ring-[#fddb1a]"
                        >
                            <option value="customer">User</option>
                            <option value="seller">Vendor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-around mt-6">
                        <button
                            onClick={handleRoleUpdate}
                            type="button"
                            className="bg-[#fddb1a] text-[#260d0d] px-6 py-2 rounded-lg font-semibold hover:bg-[#cac483] transition"
                        >
                            Update
                        </button>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="bg-[#ba0c10] text-[#e8d44e] px-6 py-2 rounded-lg font-semibold hover:bg-[#7e0304] transition"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default UpdateUserRoleModal;
