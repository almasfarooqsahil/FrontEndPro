import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import EditIcon from "@mui/icons-material/Edit";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const BookDetails = (props) => {
  const params = useParams();
  const { id } = params;

  const [bookDetails, setBookDetails] = useState({});
  const [message, setMessage] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [studID, setStudID] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
 
  useEffect(() => {
    // fetching the details of book
    const getBookDetails = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:5000/books/${id}`)
          .then((response) => {
            const bookData = response.data.book;
            setBookDetails(bookData[0]);
            setBookName(bookData[0].book_name);
            setAuthor(bookData[0].author_name);
            setStudID(bookData[0].borrowed_by);
            setBorrowDate(bookData[0].date_borrowed);
            setReturnDate(bookData[0].date_return)
          });
      } catch (error) {
        console.log(error);
      }
    };
    getBookDetails();
  }, []);

  const handleSubmit = (event) => {
    setMessage("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // getting the updated data, if not updated then save the previous entry for that
    const dataupdated = {
      bookName: data.get("bookName")
        ? data.get("bookName")
        : bookDetails.book_name,
      authorName: data.get("authorName")
        ? data.get("authorName")
        : bookDetails.author_name,
      student_id: data.get("studentID")
        ? data.get("studentID")
        : bookDetails.borrowed_by,
      dateBorrowed: data.get("dateBorrowed")
        ? data.get("dateBorrowed")
        : bookDetails.date_borrowed,
      expectedReturn: data.get("expectedReturn")
        ? data.get("expectedReturn")
        : bookDetails.date_return,
    };
    axios
      .put(`http://127.0.0.1:5000/books/${id}`, dataupdated)
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
            <LibraryBooksIcon />
          </Avatar>
          <Typography sx={{ color: "#1976d2" }} component="h1" variant="h5">
           Book Details
          </Typography>
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
                  name="bookName"
                  fullWidth
                  id="bookName"
                  label="Book Name"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="authorName"
                  label="Author Name"
                  value={author}
                  name="authorName"
                  autoComplete="family-name"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="studentID"
                  // label={bookDetails.borrowed_by ? bookDetails.borrowed_by : ""}
                  label = "Borrowed by (Student ID)"
                  name="studentID"
                  autoComplete="family-name"
                  value={studID ? studID : ''}
                  onChange={(e) => setStudID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dateBorrowed"
                  // label={
                  //   bookDetails.date_borrowed ? bookDetails.date_borrowed : " "
                  // }
                  label = "Date Borrowed"
                  name="dateBorrowed"
                  autoComplete="family-name"
                  value={borrowDate ? borrowDate : ''}
                  onChange={(e) => setBorrowDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="expectedReturn"
                  // label={bookDetails.date_return ? bookDetails.date_return : ""}
                  label="Expected Return Date"
                  name="expectedReturn"
                  autoComplete="family-name"
                  value={returnDate ? returnDate : ''}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default BookDetails;
