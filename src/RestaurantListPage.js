import React, { useEffect, useRef } from "react"
import RestaurantList from "./RestaurantList"
import Box from "@mui/material/Box"
import NoRestaurantList from "./NoRestaurantList"

const RestaurantListPage = (props) => {
  const restaurant_info = props.restaurant_info

  const itemRefs = useRef([])

  const restaurant_list = restaurant_info.map((i, j) => (
    <div
      key={i.RestaurantID}
      ref={(el) => (itemRefs.current[i.RestaurantID] = el)}
    >
      <RestaurantList
        budge={props.checked ? i.StoreDinnerPriceRange : i.StoreLunchPriceRange}
        saveState={props.saveState}
        restaurant_info={i}
        monthvalue={props.monthvalue}
        position={props.position}
        num={j + 1}
        key={i.RestaurantID}
        selectedRestaurant={props.selectedRestaurant}
      />
    </div>
  ))

  useEffect(() => {
    // props.restaurants_infoが変更されたときに呼び出される
    if (itemRefs.current[props.selectedRestaurant]) {
      itemRefs.current[props.selectedRestaurant].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [props.selectedRestaurant])

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      {restaurant_info.length !== 0 ? restaurant_list : <NoRestaurantList />}
    </Box>
  )
}

export default RestaurantListPage
