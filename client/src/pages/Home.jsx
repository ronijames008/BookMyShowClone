import { message, Button } from "antd";
import React, { useEffect } from "react";

function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.success("Logged in successfully");
  }, []);

  return (
    <>
      {contextHolder}
      <div>Welcome Home</div>
    </>
  );
}

export default Home;
