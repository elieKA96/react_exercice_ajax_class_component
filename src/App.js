import './App.css';
import React from 'react';
import { User } from './components/User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      isDeleted: false
    };
    this.handleDelete = this.handleDelete.bind(this);// binding
  }

  fetchUser() {
    this.setState({ isLoading: true })
    this.setState({ isDeleted: false })

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      }).then((data) => {
        console.log("users: ", data);
        this.setState({ ...this.state, users: data });
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        this.setState({ isLoading: false })
      })
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleRefresh = (e) => {
    this.fetchUser();
  }
  handleDelete(id) {
    this.setState({ isDeleted: false })
    let value = window.confirm("voulez-vous supprimer?");

    if (value) {
      const userOld = [...this.state.users];
      const usersFiltered = userOld.filter((user) => user.id !== parseInt(id));
      this.setState({ ...this.state, users: usersFiltered });
      this.setState({ isDeleted: true })
    }
  }
  render() {
    return (
      <div className="App">
        <div className="card">
          <h2>Liste des Utilisateurs</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-7">
              {" "}
              <button
                type="button"
                className="my-3"
                onClick={this.handleRefresh}>
                Rafraichir</button>
            </div>
          </div>
          {this.state.isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <User users={this.state.users} handleDelete={this.handleDelete} />
          )}
        </div>
      </div>
    )
  }
}

export default App;
