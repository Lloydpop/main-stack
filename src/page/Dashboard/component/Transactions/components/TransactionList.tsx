import { Badge, Heading } from "../../../../../components";
import arrowUp from "../../../../../assets/images/arrowupIcon.png";
import arrowDown from "../../../../../assets/images/arrowdownIcon.png";
import { formatAsUSD, formatDateToTextFormat } from "../../../../../utils";
export interface TransactionListProps {
  data: {
    metadata: { product_name: string; name: string };
    status: string;
    amount: string;
    date: string;
  }[];
}

export const TransactionList = ({ data }: TransactionListProps) => {
  return (
    <div className="space-y-6 border-t border-[#80808023] py-6">
      {data?.map((transaction, i) => (
        <div key={i} className="flex lg:flex-row flex-col justify-between">
          <div className="flex items-center gap-4 ">
            <div
              className={`w-[48px] h-[48px] rounded-full flex items-center justify-center ${
                transaction?.status === "successful"
                  ? "bg-[#E3FCF2]"
                  : "bg-[#F9E3E0]"
              }`}
            >
              <img
                src={transaction?.status === "successful" ? arrowDown : arrowUp}
                className="w-4 h-4 object-contain"
                alt="arrow icon"
              />
            </div>
            <div>
              <p className="font-semibold">
                {transaction?.metadata?.product_name ?? "Annonymous Product"}
              </p>
              <p className="text-[#56616B] mt-1">
                {transaction?.metadata?.name ?? "Annonymous"}
              </p>
              <Badge status={transaction?.status}>{transaction?.status}</Badge>
            </div>
          </div>
          <div className="lg:ml-0 lg:mt-0 ml-16 mt-6">
            <Heading size="16">{formatAsUSD(transaction?.amount)}</Heading>
            <p className="mt-1">{formatDateToTextFormat(transaction?.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
