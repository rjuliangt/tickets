import React, { Component } from "react";

class InputCheckBox extends Component{
	state = {
            isChecked: false,
            loaded: false,
	}
	componentDidUpdate() {
        const { input } = this.props;
        if (!this.state.loaded && !!this.props.input.checked) {
            this.setState({ isChecked: input.checked, loaded: true });
        }
      }
	toggleCheckbox = (event) => {
		const checked = event.target.checked
		this.setState({isChecked: checked});
	}
		
	render() {
		const {isChecked} = this.state;
		const {input, label} = this.props;
		return(        
            <div>
                <input 
			     type="checkbox"
			     onChange={this.toggleCheckbox}
			     checked={isChecked}
			     value={input.value}

                  />
                  <label>&nbsp;{  label } </label>      
            </div>        
		);
	}	
}

export default InputCheckBox;
