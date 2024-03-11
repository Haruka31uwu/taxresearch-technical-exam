import { Input, Button } from "../commons/CommonsComponents";
import React, { useState } from 'react';

export default function CreateEditUserForm({ fields, actions,client }) {
    const initialFormValues = {};
    const initialValidatorStates = []
    fields.forEach(field => {
        if(client){
            if(field.name==="fecnac"){
                //parse 2024-03-06 00:00:00 to 2024-03-06
                client[field.name]=client[field.name].split(" ")[0];
            }
            initialFormValues[field.name] = client[field.name];
            initialValidatorStates[field.name] = field.validate(field.name, client[field.name],18)
        }
        else{
            initialFormValues[field.name] = field.value || '';
            initialValidatorStates[field.name] = field.validate(field.name, field.value,18)

        }

    });
    
    const [trySubmit, setTrySubmit] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [validatorStates, setValidatorStates] = useState(initialValidatorStates);
    const handleValidation = (fieldName, value) => {
        const result = fields.find(field => field.name === fieldName).validate(fieldName, value,18);
        setValidatorStates(prevState => ({
            ...prevState,
            [fieldName]: result
        }));
        return result.error;
    }
    const handleInputChange = (fieldName, value) => {
        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
        handleValidation(fieldName, value);
    };
    return (

        <div className="w-full">
            <div className="flex flex-col w-full gap-y-3">
                {
                    fields.map((field, index) =>
                        <Input
                            className="w-full"
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formValues[field.name]}
                            onChange={(e) => {
                                handleInputChange(field.name, e.target.value)
                            }}
                            key={index} 
                            validateResult={trySubmit?validatorStates[field.name].content:<></>
                                }/>
                    )
                }
            </div>
            <div className="w-full flex flex-row justify-between mt-2">
                {
                    actions.map((action, index) =>
                        <Button text={action.text} key={index} onClick={() => {
                            setTrySubmit(true);
                            if (Object.values(validatorStates).some(state => state.error)) {
                                return;
                            }
                            action.onClick(formValues);
                            
                        }} />
                    )
                }
            </div>
        </div>
    )
}