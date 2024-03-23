import React from "react"
import CustomForm from "./CustomForm"
import RestaurantListPage from "./RestaurantListPage"
import "./App.css"
import Map from "./Map"
import { useState, useEffect } from "react"
import MonthFoodData from "./month_food.json"

function App() {
  const [category, setCategory] = useState("魚介料理・海鮮料理")
  const [minbudget, setMinBudget] = useState(0)
  const [maxbudget, setMaxBudget] = useState(3000)
  const [checked, setChecked] = useState(true)
  const [restaurant_info, setrestaurant_info] = useState([])
  const [monthvalue, setMonthValue] = useState(1)
  const [seasonalfoodname, setSeasonalFoodName] = useState("")
  const [radius, setRadius] = useState(1.0)
  const [position, setPosition] = useState({ lat: 41.768739, lng: 140.728942 })
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  // const [value4, setValue4] = useState(30)
  const [value5, setValue5] = useState(0)
  const [value6, setValue6] = useState(0)
  const [kirikae, setKirikae] = useState(false)
  const [local_rate, setLocalRate] = useState(0)
  const [zenkoku_rate, setZenkokuRate] = useState(0)
  const [BERT_rate, setBERTRate] = useState(0)
  const [kakriuke_rate, setKakriukeRate] = useState(0)

  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  // localhost8080からデータを取得する関数
  const getrestaurantInfo = async () => {
    // 開発用
    // const response = await fetch(
    //   `http://localhost:8080/restaurants?month=${monthvalue}&genre=${category}&minbudget=${minbudget}&maxbudget=${maxbudget}&time=${
    //     checked ? "dinner" : "lunch"
    //   }&seasonalfoodname=${seasonalfoodname}&position_latitude=${
    //     position["lat"]
    //   }&position_longitude=${position["lng"]}&radius=${radius}`
    // )

    console.log(process.env.REACT_APP_IP)
    const x = `${
      process.env.REACT_APP_IP
    }/restaurants?month=${monthvalue}&genre=${category}&minbudget=${minbudget}&maxbudget=${maxbudget}&time=${
      checked ? "dinner" : "lunch"
    }&seasonalfoodname=${seasonalfoodname}&position_latitude=${
      position["lat"]
    }&position_longitude=${position["lng"]}&radius=${radius}`
    console.log(x)
    // 本番用
    const response = await fetch(
      `${
        process.env.REACT_APP_IP
      }/restaurants?month=${monthvalue}&genre=${category}&minbudget=${minbudget}&maxbudget=${maxbudget}&time=${
        checked ? "dinner" : "lunch"
      }&seasonalfoodname=${seasonalfoodname}&position_latitude=${
        position["lat"]
      }&position_longitude=${position["lng"]}&radius=${radius}`
    )
    const data = await response.json()
    // console.log(data)
    sortrestaurant(
      data,
      value1,
      value2,
      value3,
      value5,
      value6,
      local_rate,
      BERT_rate,
      kakriuke_rate,
      zenkoku_rate
    )
  }

  useEffect(() => {
    getrestaurantInfo()
  }, [
    category,
    minbudget,
    maxbudget,
    checked,
    monthvalue,
    seasonalfoodname,
    position,
    radius,
  ])

  useEffect(() => {
    sortrestaurant(
      restaurant_info,
      value1,
      value2,
      value3,
      value5,
      value6,
      local_rate,
      BERT_rate,
      kakriuke_rate,
      zenkoku_rate
    )
  }, [
    value1,
    value2,
    value3,
    value5,
    value6,
    local_rate,
    zenkoku_rate,
    BERT_rate,
    kakriuke_rate,
  ])

  // stateをsessionstorageに保存する関数
  const saveState = () => {
    sessionStorage.setItem(
      "state_key",
      JSON.stringify({
        category,
        minbudget,
        maxbudget,
        checked,
        restaurant_info,
        seasonalfoodname,
        monthvalue,
        radius,
        position,
        value1,
        value2,
        value3,
        value5,
        value6,
        local_rate,
        BERT_rate,
        kakriuke_rate,
        zenkoku_rate,
        kirikae,
      })
    )
  }

  useEffect(() => {
    const session_state = JSON.parse(
      sessionStorage.getItem("state_key") ?? "{}"
    )
    if (Object.keys(session_state).length !== 0) {
      setCategory(session_state.category)
      setMinBudget(session_state.minbudget)
      setMaxBudget(session_state.maxbudget)
      setChecked(session_state.checked)
      setrestaurant_info(session_state.restaurant_info)
      setMonthValue(session_state.monthvalue)
      setRadius(session_state.radius)
      setSeasonalFoodName(session_state.seasonalfoodname)
      setPosition(session_state.position)
      setValue1(session_state.value1)
      setValue2(session_state.value2)
      setValue3(session_state.value3)
      setValue5(session_state.value5)
      setValue6(session_state.value6)
      setBERTRate(session_state.BERT_rate)
      setKakriukeRate(session_state.kakriuke_rate)
      setZenkokuRate(session_state.zenkoku_rate)
      setLocalRate(session_state.local_rate)
      setKirikae(session_state.kirikae)
    } else {
      sortrestaurant(
        restaurant_info,
        value1,
        value2,
        value3,
        value5,
        value6,
        local_rate,
        BERT_rate,
        kakriuke_rate,
        zenkoku_rate
      )
    }
  }, [])

  const sortrestaurant = (
    restaurant_info,
    value1,
    value2,
    value3,
    value5,
    value6,
    local_rate,
    BERT_rate,
    kakriuke_rate,
    zenkoku_rate
  ) => {
    const newrestaurantList = restaurant_info.slice()
    newrestaurantList.map(
      (restaurant) =>
        (restaurant.Score =
          value1 * restaurant.RestaurantSeasonalPopular +
          value2 * restaurant.RestaurantSeasonalCount +
          value3 * restaurant.RestaurantSeasonalShort +
          value5 * restaurant.RestaurantLocalPopular +
          value6 * restaurant.StoreReviewCnt +
          local_rate * restaurant.RestaurantLocalRate +
          zenkoku_rate * restaurant.RestaurantZenkokuRate +
          BERT_rate * restaurant.NewRestaurantLocalPopularBERT +
          kakriuke_rate * restaurant.NewRestaurantLocalPopularKakariuke)
    )
    newrestaurantList.sort(function (a, b) {
      return b.Score - a.Score
    })
    setrestaurant_info(newrestaurantList)
  }

  const onCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const onRangeBudgetChange = (event) => {
    const newbudget = event.target.value
    setMinBudget(newbudget[0])
    setMaxBudget(newbudget[1])
  }

  const onSeasonalFoodNameChange = (event) => {
    setSeasonalFoodName(event.target.value)
  }

  const onMinBudgetChange = (event) => {
    setMinBudget(event.target.value)
    // もし最小予算が最大予算より大きかったら変更しない
    if (event.target.value > maxbudget) {
      setMinBudget(maxbudget)
    }
  }

  const onMaxBudgetChange = (event) => {
    setMaxBudget(event.target.value)
    // もし最大予算が最小予算より小さかったら変更しない
    if (event.target.value < minbudget) {
      setMaxBudget(minbudget)
    }
  }

  const handleChange = (event) => {
    const newchecked = !checked
    setChecked(newchecked)
  }

  const onMonthChange = (event) => {
    setMonthValue(event.target.value)
    if (
      !MonthFoodData["foodname"][event.target.value - 1].includes("スルメイカ")
    ) {
      setSeasonalFoodName("")
    }
  }

  const handleChange1 = (event, newValue) => {
    setValue1(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }
  const handleChange3 = (event, newValue) => {
    setValue3(newValue)
  }
  const handleChange5 = (event, newValue) => {
    setValue5(newValue)
  }
  const handleChange6 = (event, newValue) => {
    setValue6(newValue)
  }

  const onSelectedRestaurantChange = (restaurantID) => {
    setSelectedRestaurant(restaurantID)
  }

  const handleChangeLocalRate = (event, newValue) => {
    setLocalRate(newValue)
  }
  const handleChangeZenkokuRate = (event, newValue) => {
    setZenkokuRate(newValue)
  }
  const handleChangeBERTRate = (event, newValue) => {
    setBERTRate(newValue)
  }

  const handleChangeKakriukeRate = (event, newValue) => {
    setKakriukeRate(newValue)
  }

  const handlekirikae = (event) => {
    setKirikae(!kirikae)
    if (kirikae) {
      // trueのとき
      setKakriukeRate(0)
      setBERTRate(30)
      console.log("BERT")
    } else {
      // falseのとき
      setBERTRate(0)
      setKakriukeRate(30)
      console.log("kakriuke")
    }
  }

  return (
    <div className="App">
      <CustomForm
        className="left"
        category={category}
        minbudget={minbudget}
        maxbudget={maxbudget}
        monthvalue={monthvalue}
        seasonalfoodname={seasonalfoodname}
        checked={checked}
        radius={radius}
        value1={value1}
        value2={value2}
        value3={value3}
        value5={value5}
        value6={value6}
        kirikae={kirikae}
        zenkoku_rate={zenkoku_rate}
        local_rate={local_rate}
        BERT_rate={BERT_rate}
        kakriuke_rate={kakriuke_rate}
        onChange={handleChange}
        onCategoryChange={onCategoryChange}
        onMinBudgetChange={onMinBudgetChange}
        onMaxBudgetChange={onMaxBudgetChange}
        onSeasonalFoodNameChange={onSeasonalFoodNameChange}
        onRangeBudgetChange={onRangeBudgetChange}
        onMonthChange={onMonthChange}
        handleChange1={handleChange1}
        handleChange2={handleChange2}
        handleChange3={handleChange3}
        handleChange5={handleChange5}
        handleChange6={handleChange6}
        setRadius={setRadius}
        handleChangeLocalRate={handleChangeLocalRate}
        handleChangeZenkokuRate={handleChangeZenkokuRate}
        handleChangeBERTRate={handleChangeBERTRate}
        handleChangeKakriukeRate={handleChangeKakriukeRate}
        handlekirikae={handlekirikae}
      />
      <RestaurantListPage
        className="right"
        monthvalue={monthvalue}
        restaurant_info={restaurant_info}
        checked={checked}
        position={position}
        saveState={saveState}
        selectedRestaurant={selectedRestaurant}
      />
      <Map
        restaurant_info={restaurant_info}
        position={position}
        setPosition={setPosition}
        radius={radius}
        onSelectedRestaurantChange={onSelectedRestaurantChange}
      />
    </div>
  )
}

export default App
