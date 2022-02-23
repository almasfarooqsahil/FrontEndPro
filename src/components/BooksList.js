import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from '@mui/icons-material/List';
import { IconButton } from "@mui/material";

const theme = createTheme();
const BooksList = () => {
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    // fetching the list of books with students if borrowed
    const getAllBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/books/students-books"
        );
        const allBooks = response.data.booksdata;
        setBooksList(allBooks);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBooks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
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
               <ListIcon sx ={{mr : 2}} />
             Books List
            </Typography>
          </Container>
          {booksList.length > 0 ? (
            <Container fixed>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 600 }}
                  size="large"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }}>ID (Book)</TableCell>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }} align="center">Book Name</TableCell>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }} align="center">Author Name</TableCell>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }} align="center">Borrowed by</TableCell>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }} align="center">Date of Borrow</TableCell>
                      <TableCell sx={{  fontSize: 17, fontWeight: 'medium' }} align="center">
                        Expected Date of Return
                      </TableCell>
                      <TableCell align="center">Edit Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booksList.map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.book_name}</TableCell>
                          <TableCell align="center">
                            {row.author_name}
                          </TableCell>
                          <TableCell align="center">
                            {row.first_name
                              ? row.first_name + " " + row.last_name
                              : ""}
                          </TableCell>
                          <TableCell align="center">
                            {row.date_borrowed}
                          </TableCell>
                          <TableCell align="center">
                            {row.date_return}
                          </TableCell>
                          <TableCell align="center">
                          <Link
                              to={"/books/" + row.id}
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
                No books entered yet.
              </Typography>
            </Container>
          )}
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default BooksList;
