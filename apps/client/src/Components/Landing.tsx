import { Button, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { isUserLoading, userEmailState } from "../store/selectors/user";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  const navigate = useNavigate();
  return (
    <div>
      <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4">Coursea</Typography>
          <Typography variant="h5">A place to learn, earn and grow.</Typography>
          {!userLoading && !userEmail && (
            <div
              style={{
                display: "flex",
                // justifyContent: "space-evenly",
                paddingTop: 20
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate("/signup");
                }}
                style={{
                    marginRight: 20
                }}
              >
                Signup
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Login
              </Button>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img src={"/class.jpeg"} width="100%" />
        </Grid>
      </Grid>
    </div>
  );
};
