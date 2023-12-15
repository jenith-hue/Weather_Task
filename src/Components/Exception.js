// This component is used to render the exception message while the weather API don't have data for the selected country.
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ExceptionComponent = () => {
  return (
    <Card sx={{ marginTop: "20px", backgroundColor: "#b4dcee", color: "#fff" }}>
      <CardContent>
        <Typography
          variant="h5"
          color={"black"}
          align="center"
          mt={2}
          gutterBottom
        >
          No Records Found !
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExceptionComponent;
