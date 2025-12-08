const Admin = () => {
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">

                {/* Page Title */}
                <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

                {/* Stats / Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-sm text-gray-500">Total Tickets</h3>
                        <p className="text-2xl font-bold mt-2">120</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-sm text-gray-500">Total Users</h3>
                        <p className="text-2xl font-bold mt-2">58</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-sm text-gray-500">Total Bookings</h3>
                        <p className="text-2xl font-bold mt-2">340</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-sm text-gray-500">Pending Approvals</h3>
                        <p className="text-2xl font-bold mt-2">12</p>
                    </div>
                </div>

                {/* Example Table Section */}
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Item
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Value
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        Example Data
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        123
                                    </td>
                                </tr>

                                <tr>
                                    <td className="px-5 py-5 bg-white text-sm">Another Row</td>
                                    <td className="px-5 py-5 bg-white text-sm">456</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
