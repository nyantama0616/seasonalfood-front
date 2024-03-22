import React, { useEffect, useRef, memo } from "react"
import { MapContainer, Marker, TileLayer, Popup, Circle } from "react-leaflet"
import "./Map.css"
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import CurrentPlaceButton from "./CurrentPlaceButton"

// defaultのピンのアイコンを変更する
// これをしないと、ピンが表示されない
delete Leaflet.Icon.Default.prototype._getIconUrl
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("../node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("../node_modules/leaflet/dist/images/marker-shadow.png"),
})

function Map({
  restaurant_info,
  position,
  setPosition,
  radius,
  onSelectedRestaurantChange,
}) {
  // 緯度軽度
  const markerRef = useRef(null)
  // 初期マップズームレベル
  const zoom = 13.7

  // useEffect(() => {
  //   // 初回の現在地の取得
  //   navigator.geolocation.getCurrentPosition(
  //     (value) => {
  //       console.log(value.coords.latitude, value.coords.longitude)
  //       setPosition([value.coords.latitude, value.coords.longitude])
  //     },
  //     (error) => {
  //       console.error("Error Code = " + error.code + " - " + error.message)
  //     }
  //   )
  // }, [])

  // 円のスタイル
  const redOptions = {
    color: "red", // 外周の色
    weight: 2, // 外周の太さ
    opacity: 0.4, // 外周透過度（0: 透明 ⇔ 1:不透明）
    fillColor: "#00000", // 塗りつぶし色
    fillOpacity: 0.15, // 塗りつぶし透過度
  }

  const draghandler = {
    dragstart: () => {
      const marker = markerRef.current
      marker.setOpacity(0.6)
    },
    dragend: () => {
      const marker = markerRef.current
      marker.setOpacity(1.0)
      console.log(marker.getLatLng())
      setPosition(marker.getLatLng())
    },
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={position}
        radius={radius * 1000}
        pathOptions={redOptions}
      />
      <CurrentPlaceButton positon={position} setPosition={setPosition} />
      <Marker
        position={position}
        icon={Leaflet.icon({
          iconUrl: require("./icon/red_pin.png"),
          iconSize: [35, 35],
        })}
        ref={markerRef}
        draggable={true}
        eventHandlers={draghandler}
      >
        <Popup>現在地</Popup>
      </Marker>
      {restaurant_info.map((i, j) => {
        if (i.Latitude && i.Longitude) {
          return (
            <Marker
              position={[i.Latitude, i.Longitude]}
              eventHandlers={{
                click: () => {
                  onSelectedRestaurantChange(i.RestaurantID)
                  console.log("Maker's click " + i.RestaurantID)
                },
              }}
            >
              <Popup>
                <div>
                  <p>{i.StoreName}</p>
                  <p>{i.StoreAddress}</p>
                </div>
              </Popup>
            </Marker>
          )
        }

        console.log(i.latitude, i.longitude)
      })}
    </MapContainer>
  )
}

export default memo(Map)
