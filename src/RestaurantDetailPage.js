import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./RestaurantDetailPage.css"
import Leaflet from "leaflet"
import { useNavigate } from "react-router-dom"
import ScoreRadarChart from "./ScoreRadarChart"
import {
  Grid,
  Typography,
  Divider,
  Box,
  TableContainer,
  Paper,
  TableBody,
  Table,
  TableRow,
  TableCell,
  createTheme,
  ThemeProvider,
} from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
    fontSize: 18,
  },
  TableCell: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
    fontSize: 18,
  },
})

function RestauranTableCelletailPage() {
  const navigate = useNavigate()
  const handleclick = () => {
    navigate("/")
  }
  const location = useLocation()
  const { restaurant_info, position, monthvalue } = location.state
  const [restaurant_data, setRestaurantData] = React.useState([])

  const getrestaurantInfo = async () => {
    // 開発用
    // const response = await fetch(
    //   `http://localhost:8080/restaurant?month=${monthvalue}&restaurant_id=${restaurant_info.RestaurantID}`
    // )
    // 本番用
    const response = await fetch(
      `${process.env.REACT_APP_IP}/restaurant?month=${monthvalue}&restaurant_id=${restaurant_info.RestaurantID}`
    )
    const data = await response.json()
    setRestaurantData(data)
  }

  useEffect(() => {
    getrestaurantInfo()
  }, [])

  return restaurant_data.length === 0 ? (
    <div>loading...</div>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid sx={{ mx: 4, mt: 2 }} className="restaurantsdetailpage">
        <Typography variant="p" sx={{ p: 2 }} onClick={handleclick}>
          Home
        </Typography>
        <Typography variant="h3" sx={{ p: 2 }}>
          {restaurant_data.StoreName}
        </Typography>
        <Divider />
        <Grid
          container
          direction="columns"
          spacing={1}
          sx={{ p: 2 }}
          alignItems="center"
        >
          <Grid item xs={3}>
            <img
              src={
                "/restaurants_image/" + restaurant_data.RestaurantID + ".jpg"
              }
              className="store_image"
              alt="resturant"
            />
          </Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table size="large">
                <TableBody>
                  <TableRow>
                    <TableCell>ジャンル</TableCell>
                    <TableCell>
                      {restaurant_data.StoreGenre.map((i) => {
                        return i + "　"
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>住所</TableCell>
                    <TableCell>{restaurant_data.StoreAddress}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>地元の食材</TableCell>
                    <TableCell>
                      {restaurant_data.LocalFoodName
                        ? restaurant_data.LocalFoodName
                        : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>旬の食材</TableCell>
                    <TableCell>
                      {restaurant_data.RestaurantSeasonalFoodname
                        ? restaurant_data.RestaurantSeasonalFoodname
                        : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>昼の予算</TableCell>
                    <TableCell>
                      {restaurant_data.StoreLunchPriceRange === 60000
                        ? "-"
                        : "~" + restaurant_data.StoreLunchPriceRange + "円"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>夜の予算</TableCell>
                    <TableCell>
                      {restaurant_data.StoreDinnerPriceRange === 60000
                        ? "-"
                        : "~" + restaurant_data.StoreDinnerPriceRange + "円"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box sx={{ p: 2 }}>
          <MapContainer
            center={[restaurant_data.Latitude, restaurant_data.Longitude]}
            zoom={13}
            scrollWheelZoom={false}
            className="leaflet-container"
            style={{ height: "400px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={position}
              icon={Leaflet.icon({
                iconUrl: require("./icon/red_pin.png"),
                iconSize: [35, 35],
              })}
              draggable={true}
            >
              <Popup>現在地</Popup>
            </Marker>
            <Marker
              position={[restaurant_data.Latitude, restaurant_data.Longitude]}
            >
              <Popup>
                <div>
                  <p>{restaurant_data.StoreName}</p>
                  <p>{restaurant_data.StoreAddress}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">飲食店の特徴</Typography>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <ScoreRadarChart
                local_food_num={restaurant_data.RestaurantLocalCnt}
                seasonal_food_num={restaurant_data.RestaurantSeasonalCount}
                local_food_fav={restaurant_data.RestaurantLocalPopular}
                seasonal_food_fav={restaurant_data.RestaurantSeasonalPopular}
                seasonal_food_short={restaurant_data.RestaurantSeasonalShort}
                populer={restaurant_data.RestaurantSeasonalCount}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            代表的なレビュー
          </Typography>
          {restaurant_data.RepresentativeReview.map((i) => {
            return (
              <Box sx={{ my: 1, p: 1, bgcolor: "#FCE9E9" }}>
                <Typography>{i}</Typography>
              </Box>
            )
          })}
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default RestauranTableCelletailPage
