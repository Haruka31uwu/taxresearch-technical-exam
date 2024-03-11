export const validateText = (fieldName, value) => {
    return (
        value.trim().length > 0 ? {
            error: false,
            content: <></>
        } : {
            error: true,
            content: <p className="text-red-500">El campo  {fieldName}  no puede estar vacio</p>
        }
    )
}
export const validateAge=(fieldName,value)=>{
    return (
        parseInt(value)<0? {
            error: false,
            content: <></>
        } : {
            error: true,
            content: <p className="text-red-500">El campo {fieldName} no puede ser menor que 0</p>
        }
    )
}  
export const validateDni = (fieldName, value) => {
    // Verifica si el valor es un número y t    iene exactamente 8 dígitos
    const isNumber = !isNaN(value);
    const hasCorrectLength = value.length === 8;

    return (
        isNumber && hasCorrectLength ? {
            error: false,
            content: <></>
        } : {
            error: true,
            content: <p className="text-red-500">El campo {fieldName} debe ser un número y tener 8 dígitos</p>
        }
    );
}

export const validateAgeMin = (fieldName, value, min) => {
    const isNumber = !isNaN(value);
    const isAboveMin = parseInt(value) >= min;

    return (
        isNumber && isAboveMin ? {
            error: false,
            content: <></>
        } : {
            error: true,
            content: <p className="text-red-500">El campo {fieldName} debe ser un número y no puede ser menor que {min}</p>
        }
    );
}
export const validateDate=(fieldName,value)=>{ 
    return (
        new Date(value)<new Date()? {
            error: false,
            content: <></>
        } : {
            error: true,
            content: <p className="text-red-500">El campo {fieldName} no puede ser mayor que la fecha actual</p>
        }
    )
}