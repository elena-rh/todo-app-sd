import { Component } from "react";
import { Messages } from "primereact/messages";

class ErrorMessages extends Component {

    componentDidMount() {
        switch (this.props.lastErrorCode) {
            case 0:
                this.messages.show({ severity: "error", content: "An error has occurred, please try again later." });
                break;
            case 1:
                this.messages.show({
                    severity: "error",
                    content: "The given username or password were incorrect, please try again with another username or password."
                });
                break;
            case 2:
                this.messages.show({
                    severity: "error",
                    content: "The given password was incorrect, please try again with a different password."
                });
                break;
            case 3:
                this.messages.show({
                    severity: "error",
                    content: "Login is required for performing this operation, please login before retrying again."
                });
                break;
            case 4:
                this.messages.show({
                    severity: "error",
                    content: "An error has occurred while performing the request, please try again."
                });
                break;
            case 5:
                this.messages.current.show({
                    severity: "error",
                    content: "An error has occurred while fetching the requested resource, please try again."
                });
                break;
            default:
        }
    }

    render() {
        return (
            <div className="col-12 fixed top-0">
                <Messages ref={ e => this.messages = e } />
            </div>
        );
    }
}

export default ErrorMessages;
