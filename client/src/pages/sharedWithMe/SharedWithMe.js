import ErrorMessages from "../../components/ErrorMessages";
import {MainMenu} from "../../components/mainMenu/MainMenu";
import BurgerMenu from "../../components/BurgerMenu";
import PageHeader from "../../components/pageHeader/PageHeader";
import {useRef, useState} from "react";
import ListItem from "../../components/listItem/ListItem";
import {Divider} from "primereact/divider";
import SharedWithMeHeader from "../../components/SharedWithMeHeader";

function SharedWithMe(props) {

    const displayError = (lastErrorCode) => {
        props.errors.displayError(lastErrorCode);
    }

    const [open, setOpen] = useState(false);
    const [lists, setLists] = useState([]);
    const node = useRef();

    const divStyle = {
        zIndex: "10",
        position: "relative",
        visible: "false"
    }

    return(
        <div className="grid h-screen">
            <ErrorMessages {...props} errors = {props.errors}/>

            <div id="mainMenuContainer" className="mx-0 p-0 hidden md:block">
                <MainMenu selected={ "My day" } open={true}/>
            </div>

            <div id="myListsContainer" style={{backgroundColor: "white"}} className="mx-0 p-0 flex-grow-1 hidden md:block">
                <PageHeader
                    props={props}
                    title="Shared with me"
                    showDate={false}
                    isResponsive={false}
                    displayError={displayError}
                />

                <SharedWithMeHeader
                />

                <Divider className={!lists || lists.length === 0? "hidden" : "m-0 p-0"} />

                <ListItem
                    lists={lists}
                    setLists={setLists}
                    userId={props.user._id}
                    ownership={false}
                />
            </div>

            <div className="w-full p-0 md:hidden"  style={{backgroundColor: "white"}} >
                <div className="col-1 p-0 h-full absolute justify-content-center">
                    <div className="h-full w-full" ref={node} style={divStyle}>
                        <BurgerMenu open={open} setOpen={setOpen} />
                        <MainMenu selected={ "My day" } open={open}/>
                    </div>
                </div>
                <div id="myListsContainer" className="mx-0 p-0 w-full md:block">
                    <PageHeader
                        props={props}
                        title="Shared with me"
                        showDate={false}
                        isResponsive={true}
                        displayError={displayError}
                    />
                    <SharedWithMeHeader
                    />

                    <Divider className={!lists || lists.length === 0? "hidden" : "m-0 p-0"} />

                    <ListItem
                        lists={lists}
                        setLists={setLists}
                        userId={props.user._id}
                        ownership={false}
                    />
                </div>
            </div>
        </div>
    );

}

export default SharedWithMe;

