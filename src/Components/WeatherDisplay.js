// This component is responsible for rendering the weather details of each countries.
import React, { useContext } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { WeatherStateProvider } from "../Context/WeatherContext";

const WeatherDisplay = () => {
  const { weatherDetails } = useContext(WeatherStateProvider); // Here the weatherDetails is destructured from the context
  return (
    <Card sx={{ marginTop: "20px", backgroundColor: "#b4dcee", color: "#fff" }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          {weatherDetails.country}
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Current Temperature: {weatherDetails.temp}°C
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Max Temperature: {weatherDetails.max_temp}°C
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Min Temperature: {weatherDetails.min_temp}°C
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Humidity: {weatherDetails.humidity}
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Wind speed: {weatherDetails.wind_speed}/kmph
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={"bold"}
              sx={{ marginBottom: "8px" }}
            >
              Wind Degree: {weatherDetails.wind_degrees}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
