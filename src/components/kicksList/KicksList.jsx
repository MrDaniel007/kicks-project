import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKicks } from "../redux/kicks/kicks"; // путь под себя поправь

function KicksList() {
  const dispatch = useDispatch();

  // берём state.favorite, потому что в store ты так назвал
  const { list, loading, error } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getKicks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {list.map((kick) => (
        <p key={kick.id}>{kick.name}</p>
      ))}
    </div>
  );
}

export default KicksList;


