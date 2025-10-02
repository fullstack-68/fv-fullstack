import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useShallow } from "zustand/shallow";

import { URL_DATA, refetchInterval } from "../utils/env";
import { type User } from "../utils/schema";
import useStore from "./store";

function useUsers() {
  const [setUsers, setFetchUsers] = useStore(
    useShallow((state) => [
      state.setUsers,
      state.setFetchUsers,
      state.setError,
    ]),
  );

  async function fetchUsers() {
    const res = await axios.get<User[]>(URL_DATA);
    //
    console.log({ data: res.data });
    //
    const usersSorted = res.data.sort((a, b) => b.createdAt - a.createdAt);
    setUsers(usersSorted);
    return null; // I don't need react query to return data.
  }

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchInterval: refetchInterval,
  });

  useEffect(() => {
    setFetchUsers(query.refetch);
  }, []);
}

export default useUsers;
