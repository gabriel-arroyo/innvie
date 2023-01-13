// import { v4 as uuidv4 } from "uuid";

import useCalendar from "api/useCalendar";

function ApiTest() {
  const { available, addReservation, roomsAvailable, getAvailableRoom } = useCalendar();
  const handleSave = async () => {
    addReservation({ number: "1", type: "type1" }, "2023-01-13", "2023-01-16");
  };

  const handleGet = async () => {
    const available1 = await getAvailableRoom("type1", "2023-02-14", "2023-02-15");
    console.log(available1);
  };
  return (
    <div style={{ background: "white" }}>
      {roomsAvailable && roomsAvailable.map((room) => <div key={room.id}>{room.number}</div>)}
      <h1>{available ? "yes" : "no"}</h1>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleGet}>
        Get
      </button>
    </div>
  );
}

export default ApiTest;
