import React, { Component } from 'react';


export default class UserAddForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            age: 0,
            users: []
        };

        this.changeName = this.changeName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
        
    changeName(event) {

        this.setState({name: event.target.value});
    };
    
    changeLastName(event) {

        this.setState({lastName: event.target.value});
    };

    changeAge(event) {

        this.setState({age: event.target.value});
    };

   
    handleSubmit(event) {
        // prevents sending HTTPRequest. (prevents page load)
        event.preventDefault();

        let that = this;
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let user = JSON.parse(this.responseText);
                that.props.onUserCreated(user);
                that.refs.nameInput.value = '';
                that.refs.lastNameInput.value = '';
                that.refs.ageInput.value = '';
            }
        };
        xhttp.open("POST", "http://localhost:9000/users", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            name:this.state.name,
            surname:this.state.lastName,
            age:this.state.age
        }));
    };

    render() {
        return (

            <section className="panel panel-primary">

            <header className="panel-heading">
                    <h4 className="panel-title text-center">Add</h4>
            </header>




            <div  className="panel-body">
            <form  onSubmit={this.handleSubmit}> 
                <div className="form-group">
                    <label className="control-label"> Name: </label>
                    <input className="form-control" ref="nameInput" type="text" name="name"  onChange={this.changeName}/>
                </div>

                 <div className="form-group">
                    <label className="control-label"> Last Name: </label>
                    <input className="form-control" ref="lastNameInput" type="text" name="lastName"  onChange={this.changeLastName} />
                </div>

                <div className="form-group">
                    <label className="control-label">Age: </label>
                    <input className="form-control" ref="ageInput" type="number" name="age"  onChange={this.changeAge} />
                </div>
                                
                <input className="btn btn-primary input-sm active" type="submit" value={"Add User"} />
             
            </form>
            </div>
            </section>

        );
}
}

