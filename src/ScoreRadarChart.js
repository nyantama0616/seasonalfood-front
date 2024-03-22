// redersを使ってレダーチャートを作成する
import React from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function ScoreRadarChart(props) {
  const data = [
    {
      subject: "地元の食材の数が多い",
      A: props.local_food_num,
      fullMark: 5,
    },
    {
      subject: "旬の食材の数が多い",
      A: props.seasonal_food_num,
      fullMark: 5,
    },
    {
      subject: "地元の食材で有名",
      A: props.local_food_fav,
      fullMark: 5,
    },
    {
      subject: "旬の食材で有名",
      A: props.seasonal_food_fav,
      fullMark: 5,
    },
    {
      subject: "旬の短い食材を使用している",
      A: props.seasonal_food_short,
      fullMark: 5,
    },
    {
      subject: "人気がある",
      A: props.populer,
      fullMark: 5,
    },
  ]

  console.log(data)

  return (
    <div>
      <RadarChart
        data={data}
        cx={300}
        cy={250}
        outerRadius={150}
        height={500}
        width={650}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, 5]} />
        <Radar
          name="janken"
          dataKey="A"
          stroke="#FFB61F"
          fill="#FFC651"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>
  )
}
