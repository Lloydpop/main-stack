import { LineChart, ResponsiveContainer, Tooltip, Line, XAxis } from "recharts";

export interface LineChartProps {
  data: { amount: string; date: string }[];
}
export const LineChartComponent = ({ data }: LineChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={280} className="lg:-ml-7 ml-0">
        <LineChart data={data}>
          <XAxis dataKey="date" interval="preserveStartEnd" />

          <Tooltip />
          <Line dataKey="amount" dot={false} stroke="#FF5403" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
