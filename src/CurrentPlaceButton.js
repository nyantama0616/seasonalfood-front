import React from "react"
import { useMap } from "react-leaflet"
import "./CurrentPlaceButton.css"

function CurrentPlaceButton({ setPosition }) {
  const map = useMap()

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (value) => {
        console.log(value.coords.latitude, value.coords.longitude)
        setPosition([value.coords.latitude, value.coords.longitude])
        map.setView([value.coords.latitude, value.coords.longitude])
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message)
      }
    )
  }

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button onClick={handleClick} className="">
          <img
            className="location-image"
            src={require("./icon/location.svg").default}
            alt="現在地"
          />
        </button>
      </div>
    </div>
  )
}

export default CurrentPlaceButton
