import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const HomeScreen = () => {
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
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Students Library
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              <FormatQuoteSharpIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />{" "}
              The only thing that you absolutely have to know, is the location of the library. —
              <FormatQuoteSharpIcon sx={{ ml: 1 }} />
              <br />
              <i>Albert Einstein</i>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained"  style={{width: '215px', margin:'10px auto' }} component={Link} to={"/students"}>
                List of Students
              </Button>
              <Button variant="contained" style={{width: '215px',margin:'10px auto'}} component={Link} to={"/books"}>
                List of Books
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default HomeScreen;
