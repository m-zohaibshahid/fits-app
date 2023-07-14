export interface ActiveUsersSocketResponse {
    userID: string;
    socketID: string;
}

export interface SendMessageToSocketInterface {
    linkedUserId: string,
    roomId: string
}