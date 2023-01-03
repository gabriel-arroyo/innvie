import useRoom from "api/useRoom";
import React from "react";
// import { v4 as uuidv4 } from "uuid";

function ApiTest() {
  const { loading, data, addRoom, getRoomByNumber } = useRoom();

  async function HandleGet() {
    const room = await getRoomByNumber("104");
    console.log(Boolean(room));
  }

  const newRoom = {
    beds: { queen: 1, full: 0 },
    accessories: [
      "microwave",
      "desk",
      "tv",
      "dish",
      "wifi",
      "you can ask for a mini fridge",
      "full bath",
    ],
    price: 70,
    number: "1021",
  };

  return (
    <div style={{ background: "white" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((room) => (
            <div key={room.id}>
              <div>{JSON.stringify(room)}</div>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={() => addRoom(newRoom)}>
        add
      </button>
      <button type="button" onClick={() => HandleGet()}>
        update
      </button>
    </div>
  );
}

export default ApiTest;
