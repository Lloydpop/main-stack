import { Analytics } from "./Analytics";
import { AvailableBal } from "./AvailableBalance";
interface WalletProps {
  data: {
    ledger_balance: string;
    total_payout: string;
    total_revenue: string;
    pending_payout: string;
  };
  transactions: { amount: string; date: string }[];
}
export const Wallet = ({ data, transactions }: WalletProps) => {
  return (
    <div className="grid grid-cols-12 lg:gap-16">
      <div className="lg:col-span-8 col-span-12">
        <Analytics data={transactions} balance={data?.ledger_balance} />
      </div>
      <div className="lg:col-span-4 col-span-12 lg:mt-0 mt-6">
        <AvailableBal data={data} />
      </div>
    </div>
  );
};
