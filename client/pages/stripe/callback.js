import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/get-account-status`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/instructor";
        });
    }
  }, [user]);

  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-danger p-5"
    />
  );
};

export default StripeCallback;
