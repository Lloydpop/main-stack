import { Heading } from "@/components";
import { formatAsUSD } from "@/utils";
import infoIcon from "@/assets/images/infoIcon.png";
interface AvailableBalanceProps {
  data: {
    ledger_balance: string;
    total_payout: string;
    total_revenue: string;
    pending_payout: string;
  };
}
export const AvailableBal = ({ data }: AvailableBalanceProps) => {
  const balanceList = [
    {
      label: "Ledger Balance",
      value: data?.ledger_balance,
    },
    {
      label: "Total Payout",
      value: data?.total_payout,
    },
    {
      label: "Total Revenue",
      value: data?.total_revenue,
    },
    {
      label: "Pending Payout",
      value: data?.pending_payout,
    },
  ];
  return (
    <div className="space-y-7">
      {balanceList?.map((balance, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            <p className="mb-1">{balance?.label}</p>
            <span className="block">
              <img src={infoIcon} className="w-4 h-4" alt="info icon" />
            </span>
          </div>
          <Heading>{formatAsUSD(balance?.value ?? "0.0")}</Heading>
        </div>
      ))}
    </div>
  );
};
