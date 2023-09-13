import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
import { adminParams } from "types";
import axios from "axios";
import { BASE_URL } from "../.config";
import { Button, Card, TextField } from "@mui/material";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleOnClick = async () => {
    const userInputs: adminParams = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/signup`,
        JSON.stringify(userInputs),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.token) {
        setUser({
          isLoading: false,
          userEmail: username,
        });
        navigate("/courses");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 150,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            variant="outlined"
            label="Email"
            fullWidth={true}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button variant="contained" size={"large"} onClick={handleOnClick}>
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
};
