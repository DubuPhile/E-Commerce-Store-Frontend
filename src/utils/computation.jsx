export const calculateTotalPrice = (items) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    return total + (item.quantity || 0) * (item.product?.price || 0);
  }, 0);
};

export const calculateTotalItems = (items) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};
