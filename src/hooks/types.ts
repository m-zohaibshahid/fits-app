export interface ActiveUsersSocketResponse {
    userID: number;
    socketID: string;
}

export interface SendMessageToSocketInterface {
    userID: number,
    text: string,
    roomID: number,
    linkedUserID: number
}