import useUser from "api/useUser";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function ApiTest() {
  const { loading, data, addUser, login, logout } = useUser("ing.gabriel.arroyo1@gmail.com");
  const newUser = {
    name: "test2",
    email: "test1@gmail.com",
    age: 23,
    id: uuidv4(),
  };

  const handleLogin = async () => {
    const success = await login("ing.gabriel.arroyo@gmail.com", "123");
    if (success) {
      // eslint-disable-next-line
      console.log("user added");
    }
  };

  return (
    <div style={{ background: "white" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((user) => (
            <div key={user.id}>
              <div>{user.first_name}</div>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
      )}
      {/* login button */}
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      {/* logout button */}
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
      <button type="button" onClick={() => addUser(newUser)}>
        add
      </button>
    </div>
  );
}

export default ApiTest;
