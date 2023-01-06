
const getPagination = (page, size) => {
    const limit = +size
    const offset = (page - 1) * limit
  
    return { limit, offset };
  };

  module.exports = {
    getPagination
  }