export const wait = async function (sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
};
