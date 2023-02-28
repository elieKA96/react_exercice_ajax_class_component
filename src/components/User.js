import React from "react";

export class User extends React.Component {

    alertDeleteUser = () => {
        if (this.props.isDeleted) {
            return (

                <div className="alert alert-success" role="alert">
                    utilisateur supprimé avec succès!.
                </div>
            );
        }

    };
    render() {
        return (
            <>
                {this.alertDeleteUser()}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => this.props.handleDelete(user.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }
}

