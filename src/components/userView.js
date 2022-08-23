import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { Route, Link, Routes, useParams, useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: "#0b0519",
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const UserView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
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
  const handleClick = () => {
    navigate("/");
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (userData) {
    return (
      <>
        <Box textAlign="center" p={2} className={classes.stuListColor}>
          <Typography variant="h4">User Details</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#616161" }}>
                <TableCell align="center" className={classes.tableHeadCell}>
                  ID
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Name
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{userData.id}</TableCell>
                <TableCell align="center">{userData.name}</TableCell>
                <TableCell align="center">{userData.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={3} textAlign="center" style={{ marginTop: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Back to Home
          </Button>
        </Box>
      </>
    );
  }
};
export default UserView;
