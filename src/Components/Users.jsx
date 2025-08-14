import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);

  const [users, setUsers] = useState(initialUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    //creating user in db
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          e.target.reset();
        }
      });
  };

  const handleDelete = (id) => {
    console.log("delete this", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id != id);
          setUsers(remainingUsers);
        }

        console.log("After Delete", data);
      });
  };
  return (
    <div>
      <h1 className="text-2xl text-center p-2">Users:{users.length}</h1>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Name"
                />
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />

                <button className="btn btn-neutral mt-4">Add User</button>
              </fieldset>
              {/* view users */}
              {users.map((user) => (
                <p key={user._id}>
                  {user.name} : {user.email}
                  <Link
                    className="text-info mr-2"
                    to={`/updateUser/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link className="text-primary" to={`/users/${user._id}`}>
                    Details
                  </Link>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    x
                  </button>
                </p>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
