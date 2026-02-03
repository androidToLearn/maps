
export class Admin_Service {
  copyLastHistory(
    allHistory: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
  ) {
    const lastHistory = allHistory[allHistory.length - 1];
    const allUsers = [];
    for (const index in lastHistory) {
      allUsers.push({
        id: lastHistory[index]["id"],
        name: lastHistory[index]["name"],
        email: lastHistory[index]["email"],
        password: lastHistory[index]["password"],
        role: lastHistory[index]["role"],
      });
    }
    return allUsers;
  }

  filterAllUsers(
    filter: number,
    allUsersNotFiltered: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[],
  ) {
    const filteredUsers = [
      {
        id: "undefined",
        name: "undefined",
        email: "undefined",
        password: "undefined",
        role: "undefined",
      },
    ];
    filteredUsers.splice(filteredUsers.length - 1, 1);
    for (const user in allUsersNotFiltered) {
      if (
        filter === 0 ||
        (filter === 1 &&
          typeof allUsersNotFiltered[user]["role"] !== "undefined" &&
          allUsersNotFiltered[user]["role"] === "admin") ||
        (filter === 2 &&
          typeof allUsersNotFiltered[user]["role"] !== "undefined" &&
          allUsersNotFiltered[user]["role"] === "moderator") ||
        (filter === 3 && allUsersNotFiltered[user]["role"] === "editor") ||
        (filter === 4 && allUsersNotFiltered[user]["role"] === "viewer")
      ) {
        filteredUsers.push(allUsersNotFiltered[user]);
      }
    }
    return filteredUsers;
  }

  async clickSave(
    isChanged: boolean,
    setIsChanged: (value: boolean) => void,
    setIsAbleClickUndo: (value: boolean) => void,
  ) {
    if (isChanged) {
      setIsChanged(false);
      setIsAbleClickUndo(true);
      return 'changed'
    }
    return 'not changed'
  }

  async clickUndo(
    allHistory: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
    isChanged: boolean,
    setAllHistory: (
      value: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
      }[][],
    ) => void,
    setIsChanged: (value: boolean) => void,
    setIsAbleClickUndo: (value: boolean) => void,
  ) {
    if (allHistory.length > 1) {
      if (!isChanged) {
        const toSave = allHistory[allHistory.length - 2];
        allHistory.splice(allHistory.length - 1, 1);
        setAllHistory([...allHistory]);
        return toSave
      }
    } else {
      allHistory.splice(allHistory.length - 1, 1);
      setIsChanged(false);

      setAllHistory([...allHistory]);
    }

    setIsAbleClickUndo(true);
    return "bad";
  }
}
