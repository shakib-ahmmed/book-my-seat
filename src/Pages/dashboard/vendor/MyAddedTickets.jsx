import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/LoadingSpinner'


import VendorOrderDataRow from '../../../components/dashboard/tablerows/VendorOrderDataRow'

const MyAddedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['my-added-tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-tickets/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email,
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <h2 className="text-2xl font-bold text-[#5c0809] mb-4">My Added Tickets</h2>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Ticket Name
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Category
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Price
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Quantity
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.length > 0 ? (
                                    tickets.map(ticket => (
                                        <VendorOrderDataRow key={ticket._id} ticket={ticket} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            You have not added any tickets yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAddedTickets
