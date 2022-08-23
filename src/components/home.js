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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: "#184365",
    color: "white",
    marginBottom: "10px",
    marginTop: "10px",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const Home = ({ users, setUsers }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const handleDelete = async (id) => {
    console.log("delete", id);

    await fetch("https://jsonplaceholder.typicode.com/users/${id}", {
      method: "DELETE",
    });
    let newUser = users.filter((item) => {
      // console.log(item);
      return item.id !== id;
    });
    setUsers(newUser);
  };
  //   console.log(users);
  console.log(users);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Box textAlign="center" p={2} className={classes.stuListColor}>
          <Typography variant="h4">User List</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#616161" }}>
                <TableCell align="center" className={classes.tableHeadCell}>
                  No
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Name
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Email
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton>
                          <Link to={`/user/view/${user.id}`}>
                            <VisibilityIcon color="primary" />
                          </Link>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton>
                          <Link to={`/user/edit/${user.id}`}>
                            <EditIcon />
                          </Link>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(user.id)}>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};
export default Home;
