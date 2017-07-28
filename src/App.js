import React, { Component } from 'react';
import './App.css';
import UserAddForm from './UserAddForm';
import UserEditForm from './UserEditForm';
import UserList from './UserList';

class App extends Component {

    constructor() {
        super();
        let that=this;
        this.state = {
            users: [],
            selectedUser: null
        };
        this.onUserCreated = this.onUserCreated.bind(this);
        this.onUserEdited = this.onUserEdited.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.deleteSelectedUser = this.deleteSelectedUser.bind(this);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let serverResponseUsers = JSON.parse(this.responseText);
                that.setState({
                    users: serverResponseUsers
                });
            }
        };
        xhr.open("GET", "http://localhost:9000/users", true);
        xhr.send();
    }

    onUserCreated(user) {
        let users = this.state.users;
        users.push(user);
        this.setState({
            users: users
        });
    }

    onUserEdited(editedUser) {
        console.log('in on edit user');
        console.log(editedUser);
        let users = this.state.users;
        let userIndex = users.findIndex(user => user.id === editedUser.id);
        this.setState({
            users: [...users.slice(0, userIndex), editedUser, ...users.slice(userIndex + 1)],
            selectedUser: editedUser
        });
    }   

    onUserSelected(user) {
        this.setState({
            selectedUser: user
        });
    }

    deleteSelectedUser() {
        let that = this;
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let currentUsers = that.state.users;
                let selectedUserIndex = currentUsers.findIndex(user => user.id === that.state.selectedUser.id);

                that.setState({
                    users: [...currentUsers.slice(0, selectedUserIndex), ...currentUsers.slice(selectedUserIndex + 1)],
                    selectedUser: null
                });
            }
        };
        xhttp.open("DELETE", "http://localhost:9000/users/" + this.state.selectedUser.id, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }

    render(){
        return (

            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <h1>My Project</h1>
                        <p>This project connects to a server and receives data. It has two bottons and a user list. Firts button is 'Add User'. It is used for adding new users into server. User can check name, last name and age informations through 'User List'. If user click on a user in the user list, a 'Delete' button will appear on the page. This button is used for deleting users from server. 'Edit User' button is used for editing new informations.</p>
                    </div>
                </div>
              
                <div className="row">
                    <div className="col-md-4">
                        <UserList onUserSelected={this.onUserSelected} users={this.state.users}></UserList> 
                        {this.state.selectedUser && <button className="btn btn-danger btn-block" onClick={this.deleteSelectedUser}>Delete User</button>}</div>
                    <div className="col-md-4" ><UserAddForm onUserCreated={this.onUserCreated}></UserAddForm></div>
                    <div className="col-md-4"><UserEditForm onUserEdited={this.onUserEdited} user={this.state.selectedUser}></UserEditForm></div>
                </div>
         </div>
            );
                        }
}

export default App;  
