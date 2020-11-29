import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
                <div className="container">
                    <div className="row">
                        
                        <span className="copyright ml-auto my-auto mr-2">Ciancoders</span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
