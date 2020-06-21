export const listCategory = data => ({
    type: 'LIST_CATEGORY',
    data
  });

  export const createCategory = data => ({
    type: 'CREATE_CATEGORY',
    data
  });

  export const editCategory = data => ({
    type: 'EDIT_CATEGORY',
    category_id: data.category_id,
    category_name: data.category_name,
    isactive: data.isactive
  });

  export const updateCategory = data => ({
    type: 'UPDATE_CATEGORY',
    category_id: data.category_id,
    category_name: data.category_name,
    isactive: data.isactive
  });