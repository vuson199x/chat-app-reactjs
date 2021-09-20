import React, { useContext, useEffect, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const {
    users: { uid },
  } = useContext(AuthContext);
  /**
   * rooms: {
   *    name: 'room name',
   *    description: 'mô tả',
   *    memmbers: [uid1, uid2,...]
   * }
   */
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  console.log({ rooms, members });
  const clearState = () => {
    setSelectedRoomId("");
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };
  return (
    <AppContext.Provider
      value={{
        members,
        rooms,
        isAddRoomVisible,
        selectedRoom,
        setIsAddRoomVisible,
        setIsInviteMemberVisible,
        isInviteMemberVisible,
        selectedRoomId,
        setSelectedRoomId,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
