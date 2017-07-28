import React, {Component} from 'react';

export default class User extends Component {
    render() {
        return (
            <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd  className="col-sm-9">{this.props.user.name}</dd>
                <dt className="col-sm-3">Surname</dt>
                <dd className="col-sm-9">{this.props.user.surname}</dd>
                <dt className="col-sm-3">Age</dt>
                <dd className="col-sm-9">{this.props.user.age}</dd>
            </dl>
        );
    }
}