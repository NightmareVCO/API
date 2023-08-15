// Refactored code to use async/await for better readability and efficiency
const to = async (promise) => {
   try
   {
      const data = await promise;
      return [null,data];
   } catch (error)
   {
      return [error,null];
   }
};

module.exports = {
   to
};