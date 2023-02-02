import compareRoomNumbers from "./compare"

export default function spreadTypesToRooms(rooms, types) {
  if (!rooms || !types) return {}
  return rooms.sort(compareRoomNumbers).map((room) => {
    const correspondingType = types.find((type) => type.type === room.type)
    return { ...room, ...correspondingType }
  })
}
