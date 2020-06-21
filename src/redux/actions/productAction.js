import categories from "../../pages/categories";

export const listProduct = (data, categories) => ({
    type: 'LIST_PRODUCT',
    data,
    categories
  });

  export const createProduct = data => ({
    type: 'CREATE_PRODUCT',
    data
  });

  export const editProduct = data => ({
    type: 'EDIT_PRODUCT',
    product_id: data.product_id,
    category_id: data.category_id,
    product_name: data.product_name,
    product_image: data.product_image,
  });

  export const updateProduct = data => ({
    type: 'UPDATE_PRODUCT',
    product_id: data.product_id,
    category_id: data.category_id,
    product_name: data.product_name,
    product_image: data.product_image,
  });