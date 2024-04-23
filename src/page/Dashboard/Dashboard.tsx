import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wallet } from "./component/Wallet/Wallet";
import { transactionService } from "../../service/api.service";
import { formatDateToTextFormat } from "../../utils";
import { Transactions } from "./component/Transactions/Transactions";
import { useModal } from "../../components/Modal/modal";
import { BasicDateRangePicker, Button, Dropdown } from "../../components";
import ContentLoader from "react-content-loader";

export const Dashboard = () => {
  const { Modal, showModal, open } = useModal();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
  };
  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => transactionService.getUserWallet(),
  });
  const { data: transactions, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionService.getTransactions(),
  });
  const [transactionStatus, setTransactionStatus] = useState<
    (string | number)[]
  >([]);
  const [transactionType, setTransactionType] = useState<(string | number)[]>(
    []
  );
  const [transactionData, setTransactionData] = useState([]);
  const [filterLength, setFilterLength] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>("");

  const options = [
    { label: "Deposit", value: "deposit" },
    { label: "Withdrawal", value: "withdrawal" },
  ];
  const options2 = [
    { label: "Successful", value: "successful" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  useEffect(() => {
    setTransactionData(transactions);
  }, [transactions]);
  const filterTransactions = useCallback(() => {
    if (transactions) {
      const filtered = transactions.filter(
        (transaction: { type: string; status: string; date: string }) => {
          const typeMatch =
            transactionType.length === 0 ||
            transactionType.includes(transaction.type);

          const statusMatch =
            transactionStatus.length === 0 ||
            transactionStatus.includes(transaction.status);
          const dateMatch = checkDateMatch(transaction.date);
          return typeMatch && statusMatch && dateMatch;
        }
      );

      setTransactionData(filtered);
    }
  }, [transactions, transactionType, transactionStatus, selectedDay]);

  const checkDateMatch = (dateString: string) => {
    const transactionDate = new Date(dateString);

    switch (selectedDay) {
      case "Today":
        return isToday(transactionDate);
      case "Last 7 days":
        return isWithinLastNDays(transactionDate, 7);
      case "This month":
        return isThisMonth(transactionDate);
      case "Last 3 months":
        return isWithinLastNMonths(transactionDate, 3);
      default:
        return true;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isWithinLastNDays = (date: Date, n: number) => {
    const currentDate = new Date();
    const lastNDays = new Date(currentDate.setDate(currentDate.getDate() - n));
    return date >= lastNDays;
  };

  const isThisMonth = (date: Date) => {
    const currentDate = new Date();
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const isWithinLastNMonths = (date: Date, n: number) => {
    const currentDate = new Date();
    const lastNMonths = new Date(
      currentDate.setMonth(currentDate.getMonth() - n)
    );
    return date >= lastNMonths;
  };

  const handleApplyFilter = () => {
    filterTransactions();
    showModal(false);
    setFilterLength(transactionType.length + transactionStatus.length);
  };

  const handleClearFilters = () => {
    setTransactionStatus([]);
    setTransactionType([]);
    setTransactionData(transactions);
    showModal(false);
    setSelectedDay(null);
    setFilterLength(null);
  };

  const walletTransactions = transactions?.map((item: any) => ({
    amount: item?.amount,
    date: formatDateToTextFormat(item?.date),
  }));
  const days = [
    {
      label: "Today",
    },
    {
      label: "Last 7 days",
    },
    {
      label: "This month",
    },
    {
      label: "Last 3 months",
    },
  ];

  return (
    <div className="space-y-12">
      <Wallet data={wallet} transactions={walletTransactions} />
      {isFetching ? (
        <ContentLoader viewBox="0 0 380 70">
          <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
        </ContentLoader>
      ) : (
        <Transactions
          setOpen={showModal}
          open={open}
          clearFilter={handleClearFilters}
          filterLength={filterLength}
          data={transactionData}
        />
      )}

      <Modal title="Filter">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-5">
            {days.map((item, i) => (
              <Button
                variant={selectedDay === item.label ? "primary" : "outline2"}
                key={i}
                onClick={() => setSelectedDay(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div>
            <p className="font-semibold mb-2">Date Range</p>
            <div className="grid grid-cols-2 gap-2">
              <BasicDateRangePicker
                onChange={handleStartDateChange}
                value={startDate}
              />
              <BasicDateRangePicker
                onChange={handleEndDateChange}
                value={endDate}
              />
            </div>
          </div>
          <Dropdown
            label="Transaction Type"
            options={options}
            placeholder="Filter by type"
            selectedValues={transactionType}
            setSelectedValues={setTransactionType}
          />
          <Dropdown
            label="Transaction Status"
            options={options2}
            placeholder="Filter by status"
            selectedValues={transactionStatus}
            setSelectedValues={setTransactionStatus}
          />
          <div className="flex items-center gap-6 pt-8">
            <Button onClick={handleClearFilters} isFullWidth variant="outline2">
              Clear filters
            </Button>
            <Button onClick={handleApplyFilter} isFullWidth>
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
