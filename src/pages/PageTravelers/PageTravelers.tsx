import { useEffect } from "react";
import { Travelers } from "../components/Travelers/Travelers";
import { useAppDispatch } from "../redux/store";
import { useDatabase } from "../hooks/database";

export const PageTravelers = () => {
  const {readAllUsers} = useDatabase();
  const dispatch = useAppDispatch();

  useEffect(() => {
    readAllUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="travelers">
      <div className="content">
        <Travelers/>
      </div>
    </div>
  )
}
