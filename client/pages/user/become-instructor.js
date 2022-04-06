import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  DollarOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/make-instructor`)
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="jumbotron bg-primary text-center square">
        Become an Instructor
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-1">
              <DollarOutlined className="display-3 pb-3" />
              <br />
              <h2>Setup payout to publish courses on CodingLessons</h2>
              <p className="lead">
                On CodingLessons, you can become an instructor by publishing
                courses that help students to gain new skills online to advance
                their careers and get paid.
              </p>
              <p className="lead ">
                For easy cash out of your earnings, CodingLessons uses Stripe to
                transfer earnings to your bank account
              </p>
              <p className="lead text-warning">
                Clicking the button below will redirect you to stripe to start
                your onboarding process.
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
