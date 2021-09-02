import React, { FunctionComponent, ReactElement, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/', { transports: ['websocket', 'polling'] });

export const App: FunctionComponent = (): ReactElement => {
  const [name, setUserName] = useState('');
  const [role, setUserRole] = useState('');
  const [picture, setUserPicture] = useState('');
  const [room, setUserRoom] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    socket.emit(
      'login',
      {
        name,
        role,
        picture,
        room,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('Success');
      },
    );
  };
  const handleNameChange = (event) => setUserName(event.target.value);
  const handleRoleChange = (event) => setUserRole(event.target.value);
  const handlePictureChange = (event) => setUserPicture(event.target.value);
  const handleRoomChange = (event) => setUserRoom(event.target.value);

  return (
    <form>
      <input onChange={handleNameChange} type="text" />
      <input onChange={handleRoleChange} type="text" />
      <input onChange={handlePictureChange} type="text" />
      <input onChange={handleRoomChange} type="text" />
      <button type="submit" onClick={handleClick}>Submit</button>
    </form>
  );
};
