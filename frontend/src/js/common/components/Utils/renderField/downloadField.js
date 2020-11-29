import React, { Component } from "react";
import {
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class DownloadField extends Component{
    render() {
        const {href, className, name,download, label} = this.props;
            return(        
                <div className='form-group'>
                    <label htmlFor={ name } style={ { display: 'inline-block' } } className='font-weight-bolder'>&nbsp;{ label.substring( 16, label.length)} </label>    
                    <a
                        // href={ `http://localhost:8080${href}`} //local
                        href={ `https://test115.ciancoders.com${href}`} //server
                        // download={ download }
                        name={ name }
                        download
                        className={ className }
                        target={ "_blank" }
                        style={ {display: 'inline-block', padding:'1px', width:'35px'} }
                    >
                        <FontAwesomeIcon
                            icon={faDownload}
                            className="icono "
                        />
                    </a>
                </div>        
		);
	}	
}

export default DownloadField;