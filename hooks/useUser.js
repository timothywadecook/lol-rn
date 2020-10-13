import React from "react";
import { usersService } from "../services/feathersClient";

export default function useUser(userId) {
  const isMounted = React.useRef(true);
  const [user, setUser] = React.useState({});

  const fetchUser = async () => {
    try {
      const user = await usersService.get(userId);
      if (isMounted.current) {
        setUser(user);
      }
    } catch (error) {
      console.log("Problem fetching user for comment", userId, error);
    }
  };

  React.useEffect(() => {
    fetchUser();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return user;
}
