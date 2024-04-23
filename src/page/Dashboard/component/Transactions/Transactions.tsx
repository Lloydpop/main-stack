import { Button, Heading } from "@/components";
import exportIcon from "@/assets/images/exportIcon.png";
import expandIcon from "@/assets/images/expandIcon.png";
import { RenderData } from "./components/RenderData";
import { useMutation } from "@tanstack/react-query";
import { useConvertFileToJson } from "@/hooks/useConvertFileToJson";
import { transactionService } from "@/service/api.service";
import { formatDateToTextFormat } from "@/utils";
export interface TransactionsPops {
  data: {
    metadata: { product_name: string; name: string };
    status: string;
    amount: string;
    date: string;
  }[];
  setOpen: (open: boolean) => void;
  open: boolean;
  clearFilter: () => void;
  filterLength: number | null;
}
export const Transactions = ({
  data,
  setOpen,
  open,
  clearFilter,
  filterLength,
}: TransactionsPops) => {
  const { convertJsonToExcel } = useConvertFileToJson();
  const { isPending: isDownloadingTransction, mutate: downloadTransactions } =
    useMutation({
      mutationKey: ["all-users", { withPagination: false }],
      mutationFn: () => transactionService.getTransactions(),
      onSuccess: (data) => {
        const transactions = data?.map((dat: any) => {
          return {
            Amount: `USD ${dat.amount}`,
            Email: dat?.metadata?.email,
            Name: dat?.metadata?.name,
            Type: dat?.type,
            Quantity: dat?.metadata?.quantity,
            Country: dat?.metadata?.country,
            Date: formatDateToTextFormat(dat?.date),
            Product: dat?.metadata?.product_name,
            Status: dat?.status,
          };
        });

        convertJsonToExcel(transactions);
      },
    });

  return (
    <section className="space-y-12">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center ">
        <div>
          <Heading size="24">{data?.length ?? "0"} Transactions</Heading>
          <p>Your transction for the last 7 days</p>
        </div>
        <div className="flex items-center gap-5 lg:mt-0 mt-6">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="outline"
            rightIcon={
              <img
                className={`w-[10px] h-[10px] object-contain ${
                  open ? "-rotate-180" : ""
                }`}
                src={expandIcon}
                alt="export icon"
              />
            }
          >
            Filter{" "}
            {filterLength !== null && filterLength !== 0 ? (
              <span className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-white text-[11px] bg-black">
                {filterLength}
              </span>
            ) : null}
          </Button>
          <Button
            onClick={downloadTransactions}
            disabled={isDownloadingTransction}
            variant="outline"
            rightIcon={
              <img className="w-4 h-4" src={exportIcon} alt="export icon" />
            }
          >
            Export list
          </Button>
        </div>
      </div>
      <RenderData action={clearFilter} data={data} />
    </section>
  );
};
