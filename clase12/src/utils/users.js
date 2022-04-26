let users = [];

//Join User to CHat

const addUser = (id, username) => {
  const user = {
    id,
    username,
  };

  users.push(user);
};

module.exports = {
  addUser,
};
