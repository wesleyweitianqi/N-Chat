const host = "http://localhost:8000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsersRoute=`${host}/api/auth/allusers`
export const sendMessageRoute=`${host}/api/messages/addmsg`;
export const receiveMessageRoute=`${host}/api/messages/getmsg`;
export const logoutRoute = `${host}/api/auth/logout`;