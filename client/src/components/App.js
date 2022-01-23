import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { io } from "socket.io-client";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MyDay from "../pages/myDay/MyDay";
import Signup from "../pages/signup/Signup";
import Settings from "../pages/settings/Settings";
import Calendar from "../pages/calendar/Calendar";
import { List } from "./list/List";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            displayError: false,
            ready: false,
            socket: null
        };
        this.setUser = this.setUser.bind(this);
        this.unsetUser = this.unsetUser.bind(this);
    }

    setUser(user) {
        this.setState({
            user,
            socket: io()
        });
    }

    unsetUser() {
        this.state.socket.disconnect();
        this.setState({
            user: null,
            socket: null
        });
    }

    componentDidMount() {
       axios.get("/users/me")
            .then(
                response => {
                    this.setState({
                        user: response.data,
                        socket: io(),
                        ready: true
                    });
                },
                error => this.setState({
                    displayError: error.response.data.error !== 3,
                    ready: true
                })
            );
    }

    componentDidUpdate(_, prevState) {
        if (prevState.socket === null && this.state.socket !== null) {
            this.state.socket.on('reminder', () => {
                alert("Reminder!!!");
            });
        }
    }

    componentWillUnmount() {
        if (this.state.socket !== null) {
            this.state.socket.disconnect();
        }
    }

    render() {
        if (!this.state.ready) {
            return null;
        }
        return (
            <>
                <Dialog
                    header={ <h2>It seems quite an error to me.</h2> }
                    visible={ this.state.displayError }
                    onHide={ () => this.setState({ displayError: false }) }>
                    <p>If you're seeing this message, probably something went wrong with the site. Something that should never
                        happen has just happened, so here's that.</p>
                    <p> If you feel kind enough, please report this error to the developers of this website, they'll welcome you.
                        If not, just stick around for a bit, the time needed to fix this problem, and we'll be back to you.</p>
                </Dialog>
                <Routes>
                    <Route path="/" element={ this.state.user === null ? <Home /> : <Navigate to="/my-day" /> } />
                    <Route
                        path="/login"
                        element={ this.state.user === null ? <Login setUser={ this.setUser } /> : <Navigate to="/my-day" /> }
                    />
                    <Route
                        path="/signup"
                        element={ this.state.user === null ? <Signup setUser={ this.setUser } /> : <Navigate to="/my-day" /> }
                    />
                    <Route
                        path="/my-day"
                        element={
                            this.state.user !== null
                            ? <MyDay user={ this.state.user } unsetUser={ this.unsetUser } />
                            : <Navigate to="/" />
                        }
                    />
                    <Route path="/settings" element={ <Navigate to="/settings/account" /> } />
                    <Route
                        path="/settings/account"
                        element={
                            this.state.user !== null
                            ? <Settings
                                    user={ this.state.user }
                                    unsetUser={ this.unsetUser }
                                    setUser={ this.setUser }
                                    tab="account"
                              />
                            : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/settings/password"
                        element={
                            this.state.user !== null
                            ? <Settings user={ this.state.user } tab="password" />
                            : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/settings/notifications"
                        element={
                            this.state.user !== null
                            ? <Settings user={ this.state.user } setUser={ this.setUser } tab="notifications" />
                            : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            this.state.user !== null
                                ? <Calendar user={ this.state.user } unsetUser={ this.unsetUser } />
                                : <Navigate to="/" />
                        }
                    />
                    <Route  // for testing
                        path="/list"
                        element={<List name="School things" socket={this.state.socket}/>}
                    />
                </Routes>
            </>
        );
    }
}

export default App;
