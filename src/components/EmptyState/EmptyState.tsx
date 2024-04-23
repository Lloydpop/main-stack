import { Button, Heading } from "..";
import receiptIcon from "@/assets/images/receipt_long.png";
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; action: () => void };
}
export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col justify-center  min-h-[400px] lg:w-[369px] w-[250px] gap-4 m-auto">
      <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-50 h-[48px] w-[48px] rounded-full flex items-center justify-center">
        <img
          className="w-5 h-5 object-contain"
          src={receiptIcon}
          alt="receipt icon"
        />
      </div>
      <Heading size="28">{title}</Heading>
      <p>{description}</p>
      <div>
        {action && (
          <Button variant="outline" onClick={action.action}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};
