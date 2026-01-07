
import type {TypeRowUser} from '../types/typescript'
export default function RowUser({ properties, index, user }:    TypeRowUser) {
  const allUsers = properties["allUsers"];
  const isChanged = properties["isChanged"];
  const allHistory = properties["allHistory"];
  const setIsChanged = properties["setIsChanged"];
  const setAllHistory = properties["setAllHistory"];
  const myIdUser = properties["myIdUser"];
  const arrayIdsToUpdate = properties['arrayIdsToUpdate'];
  const setArrayIds = properties['setArrayIds']

  const changeUser = (role: string) => {
    if (role === user["role"]) return;
    if (!isChanged) {
      user["role"] = role;
      allHistory.push(allUsers);
      setIsChanged(true);
      if (arrayIdsToUpdate !== undefined)
      {
        arrayIdsToUpdate.push(user.id)
        setArrayIds([...arrayIdsToUpdate])
      }
      setAllHistory([...allHistory]);
    } else {
      user["role"] = role;
      setAllHistory([...allHistory]);
    }
  };

  const changeProfile = (e: any) => {
    if (document.getElementById("userSelector") !== null) {
      const value = e.currentTarget.value;
      changeUser(value);
    }
  };
  console.log('idUser' , myIdUser)
  console.log('mine' , user["id"])
  return (
    <div className="row" key={index}>
      <p className="titleUser">{user["name"]}</p>
      <p className="titleGmail">{user["email"]}</p>
      <>
        {myIdUser !== user["id"] ? (
          <select
            id="userSelector"
            className="divSelector"
            value={user["role"]}
            onChange={(e) => {
              changeProfile(e);
            }}
          >
            <option value="admin">admin</option>
            <option value="moderator">moderator</option>
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
          </select>
        ) : (
          <p className="myTitleRole">{user["role"]}</p>
        )}
      </>
    </div>
  );
}
