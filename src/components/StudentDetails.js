import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const StudentDetails = (props) => {
  const params = useParams();
  const { id } = params;
 
  const [studentDetails, setStudentDetails] = useState({});
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    // fetching the details of student
    const getStudentDetails = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:5000/students/${id}`)
          .then((response) => {
            const studentData = response.data.student;
            setStudentDetails(studentData[0]);
            setFirstname(studentData[0].first_name);
            setLastname(studentData[0].last_name);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getStudentDetails();
  }, []);

  const handleSubmit = (event) => {
    setMessage("")
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // getting the updated data, if not updated then get the previous 
    const dataupdated = {
      firstName: data.get("firstName")
        ? data.get("firstName")
        : studentDetails.first_name,
      lastName: data.get("lastName")
        ? data.get("lastName")
        : studentDetails.last_name,
    };
    axios
      .put(`http://127.0.0.1:5000/students/${id}`, dataupdated)
      .then((response) => {
        setMessage(response.data.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography sx={{ color: "#1976d2" }} component="h1" variant="h5">
            Student Details
          </Typography >
          {message.length > 0 && (
            <Typography sx={{ color: "green" }} component="h1" variant="h6">
              {message}
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstname}
                  autoFocus
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={lastname}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Student
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default StudentDetails;
