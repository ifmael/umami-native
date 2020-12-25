export const sortDesc = (a, b) => b.order - a.order;
export const sortAsc = (a, b) => a.order - b.order;

export const guidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
