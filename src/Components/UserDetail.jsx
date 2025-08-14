import React from "react";
import { useLoaderData } from "react-router";

const UserDetail = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div>
      <h1>User Detail:</h1>
    </div>
  );
};

export default UserDetail;
