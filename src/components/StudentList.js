import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import EditIcon from "@mui/icons-material/Edit";

const theme = createTheme();
const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    // fetching the list of students
    const getAllStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/students");
        const allStudents = response.data.students;
        setStudentList(allStudents);
      } catch (error) {
        console.log(error);
      }
    };
    getAllStudents();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="#1976d2"
              gutterBottom
            >
            <ListIcon sx ={{mr : 2}} />  Students List
            </Typography>
          </Container>
          {studentList.length > 0 ? (
            <Container fixed>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 500 }}
                  size="large"
                  aria-label="simple table"
                >
                  <TableHead >
                    <TableRow >
                      <TableCell sx={{  fontSize: 20, fontWeight: 'medium' }}>ID (Student)</TableCell>
                      <TableCell sx={{  fontSize: 20, fontWeight: 'medium' }} align="center">First Name</TableCell>
                      <TableCell sx={{  fontSize: 20, fontWeight: 'medium' }} align="center">Last Name</TableCell>
                      <TableCell sx={{  fontSize: 20, fontWeight: 'medium' }} align="center">Edit Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentList.map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" sx={{ fontSize: 17}}>
                            {row.id}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: 17}}>{row.first_name}</TableCell>
                          <TableCell align="center" sx={{ fontSize: 17}}>{row.last_name}</TableCell>
                          <TableCell align="center" sx={{ fontSize: 17}}>
                            <Link
                              to={"/students/" + row.id}
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
                            >
                              <IconButton>
                                <EditIcon sx={{ color: "#1976d2" }} />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          ) : (
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                No students entered yet.
              </Typography>
            </Container>
          )}
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default StudentList;
