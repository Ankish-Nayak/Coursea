import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState } from "../store/selectors/user";
import { userState } from "../store/atoms/user";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleOnClick = () => {
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/");
  };
  if (userLoading) {
    return <></>;
  }
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: 'wrap',
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            justifyContent: "space-evenly",
            width: "50%",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Coursea
            </Typography>
          </Link>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              navigate("/purchasedCourses");
            }}
          >
            Purchased Courses
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            justifyItems: "center",
            width: "20%",
          }}
        >
          <div>
            <Typography variant="h6">{userEmail || "random"}</Typography>
          </div>
          <Button variant={"contained"} size="large" onClick={handleOnClick}>
            Logout
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "10px",
      }}
    >
      <div
        style={{
          marginLeft: "10px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h5"
            style={{
              alignSelf: "flex-start",
            }}
          >
            Coursea
          </Typography>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          justifyItems: "center",
          width: "15%",
        }}
      >
        <Button
          variant={"contained"}
          size="large"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </Button>
        <Button
          variant={"contained"}
          size="large"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};
