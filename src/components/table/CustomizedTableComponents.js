export const TableHeader = ({ columns }) => {
    return (
        <thead className="">
            <tr>
                {columns.map((column, index) => (
                    <th key={index} className="border px-4 py-2">{column.title}</th>
                ))}
            </tr>
        </thead>
    )
}
export const TableBody = ({ items, columns, actions }) => {
    return (
        <tbody className="bg-white">
            {items.map((item, index) => (
                <TableItem item={item} key={index} columns={columns} actions={actions}  />

            ))}
        </tbody>
    )
}
export const TableItem = ({ item, columns, actions }) => {
    return (
        <tr className="w-full">
            {
                columns.map((column, index) => (
                    <td key={index} className="border px-4 py-4 text-center">{column.key === "Actions" ? <TableActions actions={actions} item={item} /> : item[column.key]}</td>
                ))
            }
        </tr>
    )
}
export const TableActions = ({ actions, item }) => {
    return (
        <div className="flex flex-row mx-auto w-full justify-center gap-x-1">
            {actions.map((action, index) => (
                <div key={index} onClick={() => {
                    action.onClick(item)
                }} className="bg-[#fbbf24] py-3 px-2 rounded-md hover:bg-amber-500 cursor-pointer text-white font-normal font-sans font-family: ui-sans-serif ">{action.text}</div>
            ))}
        </div>
    )
}
export const TablePagination = ({ pagination, onPaginationChange }) => {
    const pages = new Array(pagination.totalPages).fill(0).map((_, index) => index + 1);
    return (
        <div className="w-full flex flex-row">
            <div className="text-center flex flex-row justify-end w-full gap-x-2 align-middle">
                <div className="flex flex-row items-center justify-center">
                    <span>Mostrando {pagination.from} a {pagination.to} de {pagination.totalElements}</span>
                </div>
                <div className=" flex flex-row justify-center gap-x-2  ">
                    <div className="bg-[#fbbf24] py-3 px-2 rounded-md hover:bg-amber-500 cursor-pointer text-white font-normal font-sans font-family: ui-sans-serif "
                    onClick={() => {
                        if (pagination.currentPage === 1) {
                            return;
                        }
                        onPaginationChange(pagination.currentPage - 1)
                    }}
                    >Anterior</div>
                    {
                        pages.map((page, index) => (
                            <div key={index} className={
                                `bg-[#fbbf24] py-3 px-2 rounded-md hover:bg-amber-500 cursor-pointer text-white font-normal font-sans font-family: ui-sans-serif 
                                ${pagination.currentPage === page ? 'bg-amber-500' : ''}`
                            }
                                onClick={() => {
                                    onPaginationChange(page)
                                }}

                            >{page}</div>
                        ))
                    }
                    <div className="bg-[#fbbf24] py-3 px-2 rounded-md hover:bg-amber-500 cursor-pointer text-white font-normal font-sans font-family: ui-sans-serif "
                    onClick={() => {
                        if (pagination.currentPage === pagination.totalPages) {
                            return;
                        }
                        onPaginationChange(pagination.currentPage + 1)
                    }}
                    >Siguiente</div>
                </div>

            </div>
        </div>
    )
}
