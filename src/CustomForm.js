import React, { memo } from "react"
import InterestSlider from "./Slidebar"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import Swichbutton from "./swichbutton"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"

function CustomForm(props) {
  const category = [
    "回転寿司",
    "フレンチ",
    "ラーメン",
    "居酒屋",
    "魚介料理・海鮮料理",
    "麦とろ",
    "寿司",
    "海鮮丼",
    "サンドイッチ",
    "ケーキ",
    "アイスクリーム",
    "焼肉",
    "ホルモン",
    "冷麺",
    "その他",
    "旅館",
    "懐石・会席料理",
    "ろばた焼き",
    "餃子",
    "洋食",
    "コロッケ・フライ",
    "カレー（その他）",
    "ちゃんぽん",
    "中華麺（その他）",
    "カフェ",
    "コーヒー専門店",
    "からあげ",
    "たい焼き・大判焼き",
    "中華料理",
    "ベトナム料理",
    "お好み焼き",
    "鉄板焼き",
    "ダイニングバー",
    "ピザ",
    "バー・お酒（その他）",
    "インドカレー",
    "ネパール料理",
    "バー",
    "日本酒バー",
    "割烹・小料理",
    "郷土料理（その他）",
    "そば",
    "和菓子",
    "洋菓子（その他）",
    "定食・食堂",
    "喫茶店",
    "洋食・欧風料理（その他）",
    "ビアホール・ビアレストラン",
    "西洋各国料理（その他）",
    "カレーライス",
    "とんかつ",
    "かつ丼・かつ重",
    "天丼・天重",
    "パン・サンドイッチ（その他）",
    "レストラン（その他）",
    "パン",
    "すき焼き",
    "創作料理",
    "鳥料理",
    "その他肉料理",
    "ビストロ",
    "パスタ",
    "ハンバーグ",
    "スープカレー",
    "うどん",
    "ドーナツ",
    "たこ焼き",
    "ハンバーガー",
    "串揚げ・串かつ",
    "甘味処",
    "そば・うどん・麺類（その他）",
    "インド料理",
    "牛タン",
    "ジンギスカン",
    "スイーツ（その他）",
    "お好み焼き・たこ焼き（その他）",
    "焼鳥",
    "天ぷら・揚げ物（その他）",
    "和食（その他）",
    "イタリアン",
    "ファミレス",
    "ステーキ",
    "しゃぶしゃぶ",
    "大福",
    "せんべい",
    "弁当",
    "ベーグル",
    "旅館・オーベルジュ（その他）",
    "立ち飲み居酒屋・バー",
    "ソフトクリーム",
    "タピオカ",
    "つけ麺",
    "鍋（その他）",
    "焼きそば",
    "カフェ・喫茶（その他）",
    "居酒屋・ダイニングバー（その他）",
    "丼もの（その他）",
    "バイキング",
    "デリカテッセン",
    "おにぎり",
    "パフェ",
    "うなぎ",
    "天ぷら",
    "ラウンジ",
    "欧風カレー",
    "おでん",
    "ブラジル料理",
    "焼きとん",
    "パンケーキ",
    "ワインバー",
    "かに",
    "豚料理",
    "フルーツパーラー",
    "カレーうどん",
    "オムライス",
    "牛丼",
    "クレープ",
    "紅茶専門店",
    "焼酎バー",
    "沖縄料理",
    "バル・バール",
    "タイ料理",
    "中国鍋・火鍋",
    "串焼き",
    "親子丼",
    "ロシア料理",
    "日本茶専門店",
    "担々麺",
    "無国籍料理",
    "アジア・エスニック料理（その他）",
    "炭火焼き",
    "もつ鍋",
    "チョコレート",
    "韓国料理",
    "どら焼き",
    "かき氷",
    "パブ",
    "ビアバー",
    "スポーツバー",
    "肉まん・中華まん",
    "油そば",
    "台湾まぜそば",
    "ふぐ",
    "くじら料理",
    "立ち食い寿司",
    "スペイン料理",
    "四川料理",
    "ジュースバー",
    "スープ",
    "ドイツ料理",
    "飲茶・点心",
    "シーフード",
    "シチュー",
    "豚丼",
    "汁なし担々麺",
    "もんじゃ焼き",
    "オーベルジュ",
    "メキシコ料理",
    "インドネシア料理",
    "自然食",
    "野菜料理",
    "トルコ料理",
    "牛料理",
    "東南アジア料理（その他）",
    "社員食堂",
  ]

  const seasonalfoodnameList = [
    "ホタテガイ",
    "エビ",
    "エゾアワビ",
    "サクラマス",
    "ウニ",
    "クロマグロ",
    "タコ",
    "イカ",
    "ウバガイ",
    "ブリ",
    "サケ",
    "ズワイガニ",
    "キチジ",
    "ニシン",
    "ヒラメ",
    "サンマ",
    "マナマコ",
    "ベニザケ",
    "ホッケ",
    "アイナメ",
    "マツカワ",
    "カラフトマス",
    "エゾバフンウニ",
    "タラバガニ",
    "シャコ",
    "ガゴメ",
    "ヤリイカ",
    "スルメイカ",
    "シシャモ",
    "マガキ",
    "キアンコウ",
    "アサリ",
    "ケガニ",
    "シラウオ",
    "イトウ",
    "キュウリウオ",
    "マボヤ",
    "アユ",
    "ババガレイ",
    "マイワシ",
    "ホテイウオ",
    "マダラ",
    "イカナゴ",
    "ワカサギ",
    "キタムラサキウニ",
    "コマイ",
    "ヤマトシジミ",
    "マアナゴ",
    "スケトウダラ",
    "ハタハタ",
    "マコガレイ",
    "オオサガ",
    "ドジョウ",
    "キツネメバル",
    "クロソイ",
  ]

  const menuitemlist = category.map((i) => <MenuItem value={i}>{i}</MenuItem>)

  return (
    <Box
      component="form"
      sx={{
        p: 3,
        "& .MuiTextField-root": { width: "25ch" },
        overflowY: "scroll",
      }}
      noValidate
      autoComplete="off"
      restaurant="100vh"
    >
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            カテゴリ
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.category}
            onChange={props.onCategoryChange}
            label="category"
          >
            {menuitemlist}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            旅行する時期
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.monthvalue}
            onChange={props.onMonthChange}
            label="monthvalue"
          >
            <MenuItem value={1}>1月</MenuItem>
            <MenuItem value={2}>2月</MenuItem>
            <MenuItem value={3}>3月</MenuItem>
            <MenuItem value={4}>4月</MenuItem>
            <MenuItem value={5}>5月</MenuItem>
            <MenuItem value={6}>6月</MenuItem>
            <MenuItem value={7}>7月</MenuItem>
            <MenuItem value={8}>8月</MenuItem>
            <MenuItem value={9}>9月</MenuItem>
            <MenuItem value={10}>10月</MenuItem>
            <MenuItem value={11}>11月</MenuItem>
            <MenuItem value={12}>12月</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Typography
          id="input-slider"
          gutterBottom
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            fontWeight: 400,
            fontSize: "11px",
            mt: 1,
            ml: 1,
          }}
        >
          食べたい旬の食材
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 120, mx: 1 }}>
          <Select
            labelId="dseasonalfood"
            id="seasonalfood"
            value={props.seasonalfoodname}
            onChange={props.onSeasonalFoodNameChange}
            label="seasonalfoodname"
          >
            <MenuItem value={""}>{"選択なし"}</MenuItem>
            {seasonalfoodnameList.map((i) => (
              <MenuItem value={i}>{i}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <InputLabel id="demo-simple-select-swich" sx={{ m: 1, mt: 2 }}>
          行く時間
        </InputLabel>
        <Swichbutton
          checked={props.checked}
          id="demo-simple-select-swich"
          onChange={props.onChange}
        />
        <Box
          sx={{
            m: 1,
            color: "rgba(0, 0, 0, 0.6)",
            fontWeight: 400,
            fontSize: "11px",
            mt: 1,
            ml: 1,
          }}
        >
          <InputLabel id="demo-simple-select-swich">最低予算</InputLabel>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="minbudge-weight"
              value={props.minbudget}
              onChange={(e) => {
                props.onMinBudgetChange(e)
              }}
              endAdornment={<InputAdornment position="end">円</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              type="number"
              inputProps={{
                "aria-label": "最低予算",
                step: "1000",
                min: 0,
                max: 50000,
              }}
            />
          </FormControl>
          <InputLabel>最高予算</InputLabel>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="maxbudge-weight"
              endAdornment={<InputAdornment position="end">円</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              value={props.maxbudget}
              onChange={(e) => {
                props.onMaxBudgetChange(e)
              }}
              type="number"
              inputProps={{
                "aria-label": "最高予算",
                step: "1000",
                min: 0,
                max: 50000,
              }}
            />
          </FormControl>
          <Typography id="input-slider" gutterBottom>
            予算
          </Typography>
          <Slider
            sx={{ m: 1, width: "90%" }}
            getAriaLabel={() => "Minimum distance"}
            value={[props.minbudget, props.maxbudget]}
            onChange={props.onRangeBudgetChange}
            valueLabelDisplay="auto"
            disableSwap
            marks
            min={0}
            step={1000}
            max={20000}
          />
        </Box>
      </div>
      <InputLabel disable>現在地からの距離</InputLabel>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          id="distance-form"
          disable
          endAdornment={<InputAdornment position="end">km</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          onChange={(e) => {
            props.setRadius(e.target.value)
          }}
          value={props.radius}
          type="number"
          inputProps={{
            "aria-label": "現在地からの距離",
            step: "0.1",
            min: 0.1,
            max: 500,
          }}
        />
      </FormControl>

      <InterestSlider
        text="旬の食材が有名"
        value={props.value1}
        onChange={props.handleChange1}
      />
      <InterestSlider
        text="旬の食材を多く使用している"
        value={props.value2}
        onChange={props.handleChange2}
      />
      <InterestSlider
        text="旬の期間が短い食材を使用してる"
        value={props.value3}
        onChange={props.handleChange3}
      />
      <InterestSlider
        text="地元ならではの食材が有名"
        value={props.value4}
        onChange={props.handleChange4}
      />
      <InterestSlider
        text="地元ならではの食材を多く使用している"
        value={props.value5}
        onChange={props.handleChange5}
      />
      <InterestSlider
        text="人気がある"
        value={props.value6}
        onChange={props.handleChange6}
      />
    </Box>
  )
}

export default memo(CustomForm)
