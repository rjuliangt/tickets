import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "./redux/modules/cuenta/login";

// maquetado base
import SiderBar from "./common/components/layout/Sidebar/SideBar";
import SiderBarCliente from "./common/components/layout/Sidebar/SideBarCliente";
import Footer from "./common/components/layout/Footer/Footer";

import Navbar from "./common/components/layout/Navbar/Navbar";
import { VerifyLogin } from "./common/components/layout";
import ActivoAviso from "./common/components/Activo/Activo";

class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({ toggleOpen: !this.state.toggleOpen });
    };

    isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const {
            getMe,
            login: { me },
        } = this.props;
        if (!!token && !!me.email) {
            return true;
        } else if (token) {
            getMe();
            return "Verifying";
        }
        return false;
    };

    render() {
        const {
            component: Component,
            logOut,
            login: { me },
            ...rest
        } = this.props;
        const isAuthenticated = this.isAuthenticated();
        console.log("Desde protected User", me);
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        isAuthenticated === true ? (
                            <div>
                                <SiderBarCliente
                                    toggleOpen={this.state.toggleOpen}
                                    navToggle={this.navToggle}
                                    logOut={logOut}
                                    user={me}
                                />
                                <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                    {/* <main className="main-content p-0"> */}
                                    <div className="main-navbar  sticky-top">
                                        <div className="p-0 container">
                                            <Navbar
                                                navToggle={this.navToggle}
                                                logOut={logOut}
                                                user={me}
                                            />
                                        </div>
                                    </div>
                                    <div className="main-content-container px-2 container-fluid">
                                        <Component {...props} />
                                    </div>

                                    <Footer />
                                </main>
                            </div>
                        ) : (
                            <VerifyLogin />
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mstp = (state) => ({ ...state });

const mdtp = { logOut, getMe };

const ProtectedUser = connect(mstp, mdtp)(PrivateRouteBase);

export default ProtectedUser;