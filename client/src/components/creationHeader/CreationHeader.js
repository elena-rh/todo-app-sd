import { Button } from 'primereact/button';
import "./CreationHeader.scss";
import {useState} from "react";
import CreateListDialog from "../listDialogs/CreateListDialog";

function CreationHeader({lists, setLists}) {

    const [display, setDisplay] = useState(false);

    return (
        <div className="grid pb-5">
            <CreateListDialog
                display={display}
                setDisplay={setDisplay}
                lists={lists}
                setLists={setLists}
                creation={true}
            />
            <div className="col-6 m-0 p-0 pl-1 flex align-content-center">
                <Button
                    className="p-2"
                    id="create-button"
                    label="Add new list"
                    icon="pi pi-plus"
                    iconPos="left"
                    onClick={() => setDisplay(true)}
                />
            </div>
            <div className="col-6 m-0 pl-1 flex align-content-center justify-content-end">
                <Button className="p-2" id="search-button" icon="pi pi-search" alt="search"/>
            </div>
        </div>
    );
}

export default CreationHeader;