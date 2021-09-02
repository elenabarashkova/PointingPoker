export interface User {
  id: string,
  name: string,
  role: string,
  picture: string,
  room: string,
}

interface addUserReturnType {
  user?: User,
  error?: string,
}

let users: Array<User> = [];

export const addUser = ({id, name, role, picture, room}: User): addUserReturnType  => {
  // todo: add error on non-existing room
  if(!room) {
    return { error: "Username is required" }
  }

  const newUser = { id, name, role, picture, room };
  users.push(newUser);
  return {user: newUser};
};

export const getUser = (id: string): User | undefined => users.find(user => user.id === id);

export const deleteUser = (id: string): User | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser;
  }
};

export const getUsers = (room: string): Array<User> => users.filter(user => user.room === room);
