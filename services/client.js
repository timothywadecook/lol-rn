import client, { usersService, recommendationsService } from "./feathersClient";

export const signUp = ({ email, password, username, first_name, last_name }) =>
  client.service("users").create({
    email,
    password,
    username,
    first_name,
    last_name,
  });

export const login = ({ email, password }) =>
  client.authenticate({ email, password, strategy: "local" });

export const logout = () => {
  client.logout();
};

export const unfollow = ({ sessionUserId, userId }) =>
  usersService.patch(sessionUserId, {
    $pull: { following: userId },
  });

export const follow = ({ sessionUserId, userId }) =>
  usersService.patch(sessionUserId, {
    $addToSet: { following: userId },
  });
