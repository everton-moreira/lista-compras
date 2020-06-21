import decode from 'jwt-decode';
export const TOKEN_KEY = "@lista-compras-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {localStorage.setItem(TOKEN_KEY, token);};
export const logout = () => {localStorage.removeItem(TOKEN_KEY);};
export const getUser = () => decode(localStorage.getItem(TOKEN_KEY));
export const getUserName = () => {
                                const user = decode(localStorage.getItem(TOKEN_KEY));
                                const username = user.sub.username;
                                const firstName = username.split(' ').slice(0, -1).join(' ');
                                const lastName = username.split(' ').slice(-1).join(' ');
                                if(firstName !== lastName) return `${firstName} ${lastName}`;
                                else return `${firstName}`;
                            };