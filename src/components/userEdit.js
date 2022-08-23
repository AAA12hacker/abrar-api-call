import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { blue, deepPurple, green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import { useHistory, useNavigate, useParams } from "react-router-dom";
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

const UserEdit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({
    id: id,
    name: "",
    email: "",
    company: {
      name: "",
    },
    address: {
      street: "",
    },
    website: "",
  });
  useEffect(() => {
    const getUser = async () => {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.json())
          .then(
            (data) => {
              console.log(data);
              setUserData(data);
              setIsLoaded(true);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      } catch (error) {
        console.log("Something is Wrong");
      }
    };
    getUser();
  }, [id]);

  const onTextFieldChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    // const userUpdate = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: userData?.name, email: userData?.email }),
    // };
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData }),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            console.log(data);
            // setUserData(data);
            setIsLoaded(true);
          },
          (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
          }
        );
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log("Something is Wrong");
    }
  };
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">EDIT USER</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit User</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={userData.name}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //   autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  value={userData?.address?.street}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //   autoComplete="stuname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  value={userData?.company?.name}
                  onChange={(e) => onTextFieldChange(e)}
                  disabled
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
                  value={userData.email}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <Link href={userData?.website}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "10px" }}
                  >
                    Visit Website
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginBottom: "10px" }}
                onClick={(e) => onFormSubmit(e)}
              >
                {" "}
                Update{" "}
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              style={{ marginBottom: "10px" }}
            >
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserEdit;
