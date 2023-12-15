// This component is responsible for rendering the loading component while the weather API is being fetched.
import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingComponent = () => {
  return (
    <Card sx={{ marginTop: "20px", backgroundColor: "#b4dcee", color: "#fff" }}>
      <CardContent>
        <Typography variant="h5">
          <Skeleton height={"25px"} />
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
            <Skeleton height={"25px"} />
            <Skeleton height={"25px"} />
            <Skeleton height={"25px"} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Skeleton height={"25px"} />
            <Skeleton height={"25px"} />
            <Skeleton height={"25px"} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoadingComponent;
