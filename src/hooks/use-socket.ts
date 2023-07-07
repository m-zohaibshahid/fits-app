import { useEffect, useState } from 'react';
import { ActiveUsersSocketResponse } from './types';
import { SendMessageToSocketInterface } from '../components/types';
import socket from './socket';

const useSocket = (userID: number) => {
  const [activeUsers, setActiveUsers] = useState<ActiveUsersSocketResponse[]>([]);

  useEffect(() => {
    socket.on('active-users', (users) => {
      setActiveUsers(users);
    });


    socket.emit('join', userID);

  }, [userID]);

  const disconnect = (id: number) => {
    if (socket) {
      socket.emit('disconnect', id)
    }
  }

  const sendMessageToSocket = (message: SendMessageToSocketInterface) => {
    if (socket) socket.emit('send-message', message)
  }

  const sendDeleteMessageToSocket = (data: { messageId: number, linkedUserID: number }) => {
    if (socket) socket.emit('delete-message', data)
  }

  return { socket, activeUsers, disconnect, sendMessageToSocket, sendDeleteMessageToSocket };
}

export default useSocket;
