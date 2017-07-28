import React, { Component } from 'react';


export default class MyForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            age: 0
        };

        this.changeName = this.changeName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
        
    changeName(event) {

        this.setState({name: event.target.name});
    };
    
    changeLastName(event) {

        this.setState({lastName: event.target.lastName});
    };

    changeAge(event) {

        this.setState({age: event.target.age});
    };

        

    handleSubmit(event) {
        alert('Submitted:'  + this.refs.usernameinput.value + ' ' + this.refs.lastNameInput.value + ' ' + this.refs.ageInput.value);
        event.preventDefault();
    };


        render() {

            return (
                <div>                
                    <form onSubmit={this.handleSubmit}>                
                        Name:<br/>
                        <input ref="nameInput" type="text" name="name"  onChange={this.changeName}/>
                        <br/>

                        Last Name:<br/>
                        <input ref="lastNameInput" type="text" name="lastName"  onChange={this.changeLastName} />
                        <br/>

                        Age:<br/>
                        <input ref="ageInput" type="number" name="age"  onChange={this.changeAge} />
                        <br/>
                        <br/>                  
                        <input type="submit" value={'Submit'} />
                </form>
             </div>

        );
    }
}

