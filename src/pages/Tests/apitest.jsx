import useUser from "api/useUser";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function ApiTest() {
  const [, , addUser, , ,] = useUser();
  const newUser = {
    name: "test2",
    email: "test1@gmail.com",
    age: 23,
    id: uuidv4(),
  };

  return (
    <div style={{ background: "white" }}>
      <button type="button" onClick={() => addUser(newUser)}>
        add
      </button>
    </div>
  );
}

export default ApiTest;
