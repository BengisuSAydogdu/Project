import React, { Component } from 'react';
import User from './User';

export default class UserEditForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: Object.assign({}, nextProps.user)
        });
        if (nextProps.user !== null) {
            this.refs.nameInput.value = nextProps.user.name;
            this.refs.lastNameInput.value = nextProps.user.surname;
            this.refs.ageInput.value = nextProps.user.age;
        } else {
            this.refs.nameInput.value = '';
            this.refs.lastNameInput.value = '';
            this.refs.ageInput.value = '';
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let that = this;
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let user = JSON.parse(this.responseText);
                that.props.onUserEdited(user);
            }
        };
        xhttp.open("PUT", "http://localhost:9000/users/" + this.state.user.id, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            name:this.refs.nameInput.value,
            surname:this.refs.lastNameInput.value,
            age:this.refs.ageInput.value
        }));
    }
   
    render(){


        return( 

            <section className="panel panel-primary">

                <header className="panel-heading">
                    <h4 className="panel-title text-center">Edit</h4>
                </header>


                 <div  className="panel-body">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">                
                    <label className="control-label"> Name: </label>
                    <input className="form-control" ref="nameInput" type="text" name="name" />
                </div>

                <div className="form-group">   
                    <label className="control-label"> Last Name: </label>
                    <input className="form-control" ref="lastNameInput" type="text" name="lastName" />
                </div>

                <div className="form-group">   
                    <label className="control-label"> Age: </label>
                    <input className="form-control" ref="ageInput" type="number" name="age"/>
               </div>                
                <input className="btn btn-primary input-sm active" type="submit" value={'Edit User'} />
               
            </form>
           </div>
            </section>
            
            
         );
    }


}
