const delay = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), time);
  });

export { delay };
