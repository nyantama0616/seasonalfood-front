import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

const Img = styled("img")({
  margin: "15px",
  display: "block",
  maxWidth: "120px",
  maxHeight: "120px",
})

function RestaurantList(props) {
  const navigate = useNavigate()
  const handleclick = () => {
    props.saveState()
    navigate(`/restaurants/${props.restaurant_info.RestaurantID}`, {
      state: {
        restaurant_info: props.restaurant_info,
        position: props.position,
        monthvalue: props.monthvalue,
      },
    })
  }

  return (
    <Paper
      onClick={handleclick}
      style={
        props.selectedRestaurant === props.restaurant_info.RestaurantID
          ? { backgroundColor: "#e0e0e0" }
          : { backgroundColor: "#ffffff" }
      }
      sx={{
        p: 2,
        m: 2,
        maxWidth: 600,
        minWidth: 600,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={18} sm container>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
              {props.num}
            </Typography>
            <Img
              alt="complex"
              src={
                "./restaurants_image/" +
                props.restaurant_info.RestaurantID +
                ".jpg"
              }
            />
          </Grid>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                {props.restaurant_info.StoreName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                スコア：{props.restaurant_info.Score}
              </Typography>
              <Typography variant="body2">
                旬の食材：
                <b>
                  {props.restaurant_info.RestaurantSeasonalFoodname.replaceAll(
                    " ",
                    "　"
                  )}
                </b>
              </Typography>
              <Typography variant="body2">
                地元の食材：
                <b>
                  {props.restaurant_info.LocalFoodName.replaceAll(" ", "　")}
                </b>
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                予算：～
                {props.budge}円
              </Typography>
              <Typography variant="body2" color="text.secondary">
                住所：{props.restaurant_info.StoreAddress}
              </Typography>
              {/* {props.restaurant_info.tabelog_url ? (
                <Link
                  href={props.restaurant_info.tabelog_url}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  食べログ
                </Link>
              ) : null}
              {props.restaurant_info.store_homepage ? (
                <Link
                  href={props.restaurant_info.store_homepage}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "15px" }}
                >
                  公式サイト
                </Link>
              ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(RestaurantList)
