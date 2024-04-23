export const formatAsUSD = (amount: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedAmount = formatter.format(Number(amount));

  const numericPart = formattedAmount.replace(/[^\d.]/g, "");

  return (
    <span className="flex items-center gap-1">
      <span>USD</span>
      {numericPart}
    </span>
  );
};
