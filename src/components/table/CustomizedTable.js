
import { TableHeader, TableBody, TablePagination } from "./CustomizedTableComponents"
export default function CustomizedTable({ columns, items, actions, pagination, onPaginationChange }) {
    return (
        <div className="w-full">
            <table className="table-fixed w-full">
                <TableHeader columns={columns} />
                <TableBody items={items} columns={columns} actions={actions} />
            </table>
            <TablePagination pagination={pagination} onPaginationChange={onPaginationChange
            } />

        </div>
    )
}
