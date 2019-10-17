import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddUserModal } from './AddUserModal';
import {EditUserModal} from './EditUserModal'
import {DetailsUserModal} from './DetailsUserModal'

export class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [], addModalShow: false, editModalShow: false, detailsModalShow: false }
    }

    componentDidMount() {
        this.refreshList(); 
    }

    refreshList() {
        fetch('http://localhost:53762/api/users')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteUser(userid)
    {
        if(window.confirm('Are you sure ?'))
        {
            fetch('http://localhost:53762/api/users/'+userid,{
                method: 'DELETE',
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application-json'
                }
            })
        }
    }

    render() {
        const {users, userid, username} = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let detailsModalClose = () => this.setState({ detailsModalShow: false });
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>UserName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <tr key={user.Id}>
                                <td>{user.Id}</td>
                                <td>{user.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick = { () => this.setState({editModalShow:true, userid: user.Id, username: user.Name}) }>
                                            Edit
                                        </Button>
                                        
                                        <Button className="mr-2" variant="danger" onClick = { () => {this.deleteUser(user.Id)}}>
                                            Delete
                                        </Button>
                                        <Button className="mr-2" variant="success" onClick = { () => this.setState({detailsModalShow:true, userId: user.Id, username: user.Name})}>
                                            Details
                                        </Button>
                                        <EditUserModal 
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        userid = {userid}
                                        username = {username}
                                        />
                                        <DetailsUserModal
                                        show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        userid={user.Id}
                                        username={username} 
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({addModalShow: true })}>
                        Add User
                    </Button>
                    <AddUserModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        );
    }
}
