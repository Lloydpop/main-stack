import { EmptyState } from "@/components";
import { TransactionList } from "./TransactionList";
interface RenderDataProps {
  data: {
    metadata: { product_name: string; name: string };
    status: string;
    amount: string;
    date: string;
  }[];
  action: () => void;
}
export const RenderData = ({ data, action }: RenderDataProps) => {
  return (
    <div>
      {data?.length === 0 ? (
        <EmptyState
          action={{
            label: "Clear filters",
            action: () => {
              action();
            },
          }}
          description="Change your filters to see more results, or add a new product."
          title="No matching transaction found for the selected filter"
        />
      ) : !data ? (
        <EmptyState
          description="Please check your internet connection, or come back later."
          title="No transaction found within your account"
        />
      ) : (
        <TransactionList data={data} />
      )}
    </div>
  );
};
