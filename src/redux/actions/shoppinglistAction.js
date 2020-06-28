export const listShopping = (data, list) => ({
    type: 'LIST_SHOPPING',
    data,
    list
  });

  export const createShopping = data => ({
    type: 'CREATE_SHOPPING',
    data
  });

  export const editShopping = data => ({
    type: 'EDIT_SHOPPING',
    shopping_list_id: data.shopping_list_id,
    title: data.title,
    description: data.description,
    shopping_date: data.shopping_date,
    user_id: data.user_id,
    isactive: data.isactive
  });

  export const updateShopping = data => ({
    type: 'UPDATE_SHOPPING',
    shopping_list_id: data.shopping_list_id,
    title: data.title,
    description: data.description,
    shopping_date: data.shopping_date,
    user_id: data.user_id,
    isactive: data.isactive
  });