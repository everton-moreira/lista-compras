export const listUser = data => ({
    type: 'LIST_USER',
    data
  });

  export const createUser = data => ({
    type: 'CREATE_USER',
    data
  });

  export const editUser = data => ({
    type: 'EDIT_USER',
    user_id: data.user_id,
    email: data.email,
    username: data.username,
    isactive: data.isactive
  });

  export const updateUser = data => ({
    type: 'UPDATE_USER',
    user_id: data.user_id,
    email: data.email,
    username: data.username,
    isactive: data.isactive
  });