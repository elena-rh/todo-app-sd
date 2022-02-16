import axios from "axios";
import ListOptionsMenu from "./ListOptionsMenu";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListItem({ userId, setUser, list, lists, setLists, ownership, disabledNotificationsLists, displayError }) {
    const navigate = useNavigate();
    const onTitleClick = useCallback(id => navigate(`/my-lists/${ id }`), [navigate]);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        axios.get(`/lists/${ list._id }/members/`)
            .then(
                members => setMembers(members.data),
                error => displayError(error.response.data.error)
            );
    }, [list, setMembers, displayError]);
    const listColor = [ "red-list", "purple-list", "blue-list", "green-list", "yellow-list" ];
    if (!list) {
        return;
    }
    return (
        <div className="col-12 m-0 p-0 pl-2 flex flex-row align-items-center list-item">
            <div className="col-11 flex align-items-center" id="list-icon">
                <i className={ "pi pi-circle-fill item " + (listColor[list.colorIndex]) } />
                <i className="pi pi-list item ml-2 pl-1" />
                <h1 className="ml-2 cursor-pointer text-xl" onClick={ () => onTitleClick(list._id) }>{ list.title }</h1>
            </div>
            <div className="col-1 flex flex-row-reverse align-items-center">
                <ListOptionsMenu
                    userId={ userId }
                    setUser={ setUser }
                    members={ members }
                    setMembers={ setMembers }
                    ownership={ ownership }
                    disabledNotificationsLists={ disabledNotificationsLists }
                    list={ list }
                    lists={ lists }
                    setLists={ setLists }
                    displayError={ displayError }
                />
            </div>
        </div>
    );
}
