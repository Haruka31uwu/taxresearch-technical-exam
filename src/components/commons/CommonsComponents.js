
export const Button = ({ text, onClick }) => {
    return (
        <div onClick={onClick}
            className="bg-[#fbbf24] py-3 px-2 rounded-md hover:bg-amber-500 cursor-pointer text-white font-normal font-sans font-family: ui-sans-serif ">{text}</div>
    )
}
export const Modal = ({ children, title, events }) => {
    return (
        events.isOpen ? <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div onClick={events.onClose} className='ms-2 text-xl hover:text-red-400 cursor-pointer'>X</div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2 w-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> :
            <div></div>
    )
}
export const Input = ({ type, placeholder, value, onChange, validateResult }) => {

    return (
        <div>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full" />
            <span>{validateResult}</span>
        </div>
    )
}

