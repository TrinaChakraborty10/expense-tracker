import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),

  amount: z
    .number()
    .positive("Amount must be greater than 0"),

  date: z.string().min(1, "Pick a date"),

  category: z.string().min(1, "Select a category"),

  paymentMode: z.string().min(1, "Select a payment mode"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseForm({
  onSubmit,
}: {
  onSubmit?: (e: ExpenseFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      date: "",
      category: "",
      paymentMode: undefined as unknown as ExpenseFormData["paymentMode"],
    },
  });

  const submit = (data: ExpenseFormData) => {
    onSubmit?.(data);
    reset();
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Add New Expense
      </h1>

      <form
        className="space-y-4"
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <input
            className="rounded-md border border-border bg-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Weekly Groceries"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="rounded-md border border-border bg-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
        </div> 

        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              className="rounded-md border border-border bg-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-sm text-destructive">
                {errors.date.message}
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Category</label>
          <select
            defaultValue=""
            className="rounded-md border border-border bg-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("category")}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option>Groceries</option>
            <option>Transport</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

         {/* Payment Mode */}
         <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Payment Mode</label>
          <select
            defaultValue=""
            className="rounded-md border border-border bg-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("paymentMode")}
          >
            <option value="" disabled>
              Select payment mode
            </option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
          {errors.paymentMode && (
            <p className="text-sm text-destructive">
              {errors.paymentMode.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground hover:opacity-90"
        >
          Save Expense
        </button>
      </form>
    </div>
  </div>
);
}