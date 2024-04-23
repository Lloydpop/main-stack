import { Button, Heading } from "@/components";
import { LineChartComponent } from "@/components/Chart/Chart";
import { formatAsUSD } from "@/utils";

interface AnalyticsProps {
  balance: string;
  data: { amount: string; date: string }[];
}
export const Analytics = ({ balance, data }: AnalyticsProps) => {
  return (
    <section>
      <p className="mb-2">Available Balance</p>
      <div className="flex items-center gap-10">
        <Heading size="36">{formatAsUSD(balance ?? 0.0)}</Heading>
        <div className="w-[167px]">
          <Button isFullWidth>Withdraw</Button>
        </div>
      </div>
      <div className="mt-8">
        <LineChartComponent data={data} />
      </div>
    </section>
  );
};
