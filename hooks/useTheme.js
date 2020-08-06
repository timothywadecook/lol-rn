import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import themes from "../styles/themes";

import { toggleTheme } from "../store/userSlice";
import { usersService } from "../services/feathersClient";

export default function useTheme() {
  const theme_preference = useSelector((state) => state.user.theme_preference);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
    usersService
      .patch(userId, {
        theme_preference: theme_preference === "light" ? "dark" : "light",
      })
      .catch((e) => console.log(e));
  }, [theme_preference]);

  const theme = useMemo(
    () => ({
      ...themes[theme_preference],
      theme: theme_preference,
      toggle,
    }),
    [theme_preference]
  );

  return theme;
}
