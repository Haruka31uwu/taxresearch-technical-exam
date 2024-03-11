import { Header } from '../components/table/Layout';
import CustomizedTable from '../components/table/CustomizedTable';
import { useState, useEffect } from 'react';
import { Modal } from '../components/commons/CommonsComponents';
import CreateEditUserForm from '../components/user/CreateEditUserForm';
import { validateText, validateAgeMin, validateDni, validateDate } from '../helpers/validators';
import { insertClient, getClients, updateClient, delClient } from '../services/clients-service';

import { useSpinner, Spinner } from '../components/commons/SpinnerContext';

export default function ClientsPage() {
    const [isClienModalOpen, setIsClientModalOpen] = useState(false);
    const { isLoading, showSpinner, hideSpinner } = useSpinner();
    const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalElements: 0, totalPages: 0, currentPage: 1, from: 1, to: 1 });
    const setClientModalOpen = () => {
        setIsClientModalOpen(!isClienModalOpen);
        if (isClienModalOpen) {
            setClient(null);
        }
    }
    const onPaginationChange = async(page) => {
        setPagination(prevState => ({
            page: page,
            pageSize: prevState.pageSize,
            totalElements: prevState.totalElements,
            totalPages: prevState.totalPages,
            currentPage: prevState.currentPage,
            from: prevState.from,
            to: prevState.to
        }));
   
        await getClientList(page);
    }
    const [clientList, setClientList] = useState([]);
    useEffect(() => {
        getClientList();
    }
        , [])
    const getClientList = async (page) => {
        // Obtiene la lista de clientes y la almacena en el estado clientList
        showSpinner();
        try {
            const params = {
                page: page?page:pagination.page,
                pageSize: pagination.pageSize
            }
            const response = await getClients(params);
            setClientList(response.data);
            setPagination({
                page: response.currentPage,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                currentPage: response.currentPage,
                from: response.from,
                to: response.to,
            });
            hideSpinner();
        } catch (error) {
            console.error(error)
            hideSpinner();
        }
    }
    const [client, setClient] = useState(null);

    const columns = [
        {
            key: "nombre",
            title: "Nombre"
        },
        {
            key: "apellido",
            title: "Apellido"
        },
        {
            key: "edad",
            title: "Edad"
        },
        {
            key: "fecnac",
            title: "Fecha de Nacimiento"
        },
        {
            key: "dni",
            title: "Dni"
        },
        {
            key: "Actions",
            title: "Acciones"
        }
    ];
    const modalClientsFields = [{
        type: "text", placeholder: "Nombre del Cliente", value: "", name: "nombre", validate: validateText
    },
    {
        type: "text", placeholder: "Apellido del Cliente", value: "", name: "apellido", validate: validateText
    },
    {
        type: "number", placeholder: "Edad del Cliente", value: "", name: "edad", validate: validateAgeMin
    },
    {
        type: "date", placeholder: "Fecha de Nacimiento del Cliente", value: "", name: "fecnac",
        validate: validateDate
    },
    {
        type: "text", placeholder: "Dni del Cliente", value: "", name: "dni",
        validate: validateDni
    }
    ];
    const saveClient = async (values) => {
        setClientModalOpen()

        try {
            const params = {
                id: client ? client.id : null,
                nombre: values.nombre,
                apellido: values.apellido,
                edad: values.edad,
                fecnac: values.fecnac,
                dni: values.dni
            }
            showSpinner();
            if (client) {
                await updateClient(params);
                hideSpinner();

            } else {
                await insertClient(params);
                hideSpinner();
            }
            await getClientList();




        } catch (error) {
            console.error(error);
            hideSpinner();
        }
    }
    const deleteClient = async (client) => {
        try {
            // Elimina el cliente con el id proporcionado
            // y actualiza la lista de clientes
            showSpinner();

            const params = { id: client.id };
            await delClient(params);
            await getClientList();
            hideSpinner();
        }
        catch (error) {
            console.error(error);

        }
    }
    return (

        <main className='w-full bg-[#F2F3F4]'>
            {isLoading ? <Spinner /> : <></>
            }
            <Header title={"Lista de Clientes"} optionButton={"AGREGAR UN NUEVO CLIENTE"} events={{
                onClick: setClientModalOpen,
            }} />
            <CustomizedTable columns={columns}
                pagination={pagination}
                onPaginationChange={(page)=>onPaginationChange(page)}
                items={clientList} actions={
                    [
                        {
                            text: "Editar", onClick: (client) => {
                                setClient(client);
                                setClientModalOpen();
                            }
                        },
                        {
                            text: "Elimiar", onClick: (client) => {
                                ;
                                deleteClient(client)
                            }
                        }
                    ]
                } />

            <Modal title={client?`Editar el cliente ${client.nombre} ${client.apellido}`:"Agregar un nuevo cliente"} children={<CreateEditUserForm fields={modalClientsFields} actions={[
                {
                    text: !client ? "Save Client" : "Update Client", onClick: (client) => {
                        saveClient(client);
                    }
                }
            ]}
                client={client}
            />}
                events={{
                    isOpen: isClienModalOpen,
                    onClose: setClientModalOpen,

                }} />
        </main >
    )
}
