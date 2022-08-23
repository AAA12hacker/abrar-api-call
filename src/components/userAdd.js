import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import Home from "./home";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: "#0b0519",
    color: "white",
  },
  addStuColor: {
    backgroundColor: "#184365",
    color: "white",
    marginBottom: "10px",
    marginTop: "10px",
  },
});

const UserAdd = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [userAddData, setUserAddData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [status, setStatus] = useState();

  const onTextFieldChange = (e) => {
    setUserAddData({
      ...userAddData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userAddData),
      });
      const userAddition = { ...userAddData, id: users?.length + 1 };
      setUsers([...users, userAddition]);
      setStatus(true);
    } catch (error) {
      console.log("Something is Wrong");
    }
  };
  console.log(users);
  if (status) {
    return <UserAdd />;
  }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">USERS LIST AND ADD</Typography>
      </Box>
      <Grid container justify="center" spacing={4} style={{ margin: "10px" }}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add User</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12} style={{ margin: "10px" }}>
          <Home users={users} setUsers={setUsers} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserAdd;
