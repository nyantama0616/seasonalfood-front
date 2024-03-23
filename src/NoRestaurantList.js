import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import "./NoRestaurantList.css"

const NoRestaurantList = () => {
  return (
    <Box className="norestpage">
      <Typography variant="h5" gutterBottom component="div">
        指定の条件に該当する飲食店はありませんでした
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        条件を変更して再度検索してください
      </Typography>
    </Box>
  )
}

export default NoRestaurantList
