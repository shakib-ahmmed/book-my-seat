const UpdateTicketForm = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center text-[#260d0d] rounded-xl bg-[#fddb1a]/20 p-6'>
            <form className='w-full'>
                <div className='grid grid-cols-1 gap-8'>
                    <div className='space-y-5'>
                        {/* Ticket Title */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block font-medium'>
                                Ticket Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-[#260d0d] border-2 border-[#ba0c10] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d44e]'
                                name='title'
                                id='title'
                                type='text'
                                placeholder='Enter ticket title'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block font-medium'>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-2 border-[#ba0c10] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d44e]'
                                name='category'
                                id='category'
                            >
                                <option value='Bug'>Bug</option>
                                <option value='Feature'>Feature</option>
                                <option value='Support'>Support</option>
                            </select>
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block font-medium'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                placeholder='Describe the issue or request...'
                                className='block w-full h-32 px-4 py-3 text-[#260d0d] border-2 border-[#ba0c10] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d44e]'
                            ></textarea>
                        </div>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <div className='space-y-1 text-sm w-1/2'>
                            <label htmlFor='priority' className='block font-medium'>
                                Priority
                            </label>
                            <select
                                name='priority'
                                id='priority'
                                className='w-full px-4 py-3 border-2 border-[#ba0c10] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d44e]'
                            >
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                        </div>

                        <div className='space-y-1 text-sm w-1/2'>
                            <label htmlFor='status' className='block font-medium'>
                                Status
                            </label>
                            <select
                                name='status'
                                id='status'
                                className='w-full px-4 py-3 border-2 border-[#ba0c10] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d44e]'
                            >
                                <option value='Open'>Open</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Resolved'>Resolved</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className='p-4 w-full rounded-lg'>
                        <div className='file_upload px-5 py-3 relative border-4 border-dotted border-[#ba0c10] rounded-lg'>
                            <div className='flex flex-col w-max mx-auto text-center'>
                                <label>
                                    <input
                                        className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='attachment'
                                        id='attachment'
                                        accept='image/*,.pdf,.docx'
                                        hidden
                                    />
                                    <div className='bg-[#e8d44e] text-[#260d0d] border border-[#ba0c10] rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#cac483]'>
                                        Upload Attachment
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full cursor-pointer p-3 mt-4 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#260d0d] hover:bg-[#5b0809]'
                    >
                        Update Ticket
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateTicketForm
