import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // const result = await axios.get("http://localhost:8081/user/getAll");
    const result = await axios.get("https://crudbackend-05ap.onrender.com/user/getAll");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    // await axios.delete(`http://localhost:8081/user/deleteUser/${id}`);
    await axios.delete(`https://crudbackend-05ap.onrender.com/user/deleteUser/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4 table-responsive">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2 my-1"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-dark mx-2 my-1"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger mx-2 my-1"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
