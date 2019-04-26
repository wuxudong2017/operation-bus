module.exports = app=> {
  return async (ctx, next) => {
      console.log('connect!');
      await next();
      console.log('disconnect!');

  };
};