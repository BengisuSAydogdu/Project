import React, { Component } from 'react';
import User from './User';

export default class UserList extends Component {

    constructor(){
        super();
        this.selectUser=this.selectUser.bind(this)
    }

    selectUser(user){
        this.props.onUserSelected(user)
    }

    render() {
        return (
             
            
           <section className="panel panel-default">
                <header className="panel-heading">
                    <h4 className="panel-title text-center">User List</h4>
                </header>

        {!this.props.users.length && <div className="panel-body">

             <p className="alert alert-info">There are no users.</p>
         </div>}
            {this.props.users.length>0 && <ul className="list-group">
                 {
                     this.props.users.map((user, index) => {
                         return <li className="list-group-item" onClick={() => this.selectUser(user)} key={index}><User user={user}></User></li>;
            })
                    }
        </ul>}
            
   </section>
        );
    }
}