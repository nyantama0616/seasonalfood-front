import React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"

function InterestSlider(props) {
  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>{props.text}</Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider
          aria-label="Volume"
          value={props.value}
          onChange={props.onChange}
          valueLabelDisplay="auto"
        />
      </Stack>
    </Box>
  )
}

export default InterestSlider
