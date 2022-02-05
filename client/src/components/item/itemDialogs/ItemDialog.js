import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Dialog} from "primereact/dialog";
import React from "react";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import { classNames } from 'primereact/utils';

export function ItemDialog({headerTitle, btnText, displayDialog, setDisplayDialog, initName, initCount, action}){
    const formik = useFormik({
        initialValues: {
            name: initName,
            count: initCount
        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'Item name is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            setDisplayDialog(false);
            action(data);
            formik.resetForm();
        }
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <Dialog header={headerTitle} dismissableMask={true} closable={false}
                visible={displayDialog} onHide={() => setDisplayDialog(false)}>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="field">
                    <label htmlFor="inputItemName">Name</label>
                    <span id="inputItemName" className="p-float-label">
                        <InputText id="name"
                                   autoFocus
                                   className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                   value={formik.values.name} onChange={formik.handleChange}/>
                        <label htmlFor="name"
                               className={classNames({ 'p-error': isFormFieldValid('name') })}
                        >Task Name</label>
                    </span>
                {getFormErrorMessage('name')}
                </div>

                <div className="field">
                    <label htmlFor="count">Task number</label>
                    <div className="grid">
                            <InputNumber
                                id="count"
                                inputId="count"
                                value={formik.values.count}
                                onValueChange={formik.handleChange}
                                showButtons
                                buttonLayout="horizontal"
                                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary"
                                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                min={1}/>
                    </div>
                </div>

                <div className="flex justify-content-center">
                    <Button label={btnText} type='submit' />
                </div>
            </form>
        </Dialog>
    )
}