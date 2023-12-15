import React from "react";
import { CssBaseline, Container, Typography } from "@mui/material";
import WeatherSearch from "./Components/WeatherSearch";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Weather App
        </Typography>
        <WeatherSearch />
        {/* Here the parent component (WeatherSearch) is rendered */}
      </Container>
    </>
  );
}

export default App;
