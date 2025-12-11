import "./ExpenseForm.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than 0"),
  date: z.string().min(1, "Pick a date"),
  category: z.string().min(1, "Select a category"),
  paymentMode: z.enum(["Card", "Cash", "UPI"], {
    required_error: "Select a payment mode",
  }),
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
    <div className="card">
      <div className="card__header">Add New Expense</div>

      <form className="form" onSubmit={handleSubmit(submit)} noValidate>
        {/* Description */}
        <label className="field">
          <span>Description</span>
          <input
            placeholder="e.g. Weekly Groceries"
            {...register("description")}
          />
          {errors.description && (
            <small className="error">{errors.description.message}</small>
          )}
        </label>

        {/* Amount + Date */}
        <div className="row">
          <label className="field">
            <span>Amount ($)</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <small className="error">{errors.amount.message}</small>
            )}
          </label>

          <label className="field">
            <span>Date</span>
            <input type="date" {...register("date")} />
            {errors.date && (
              <small className="error">{errors.date.message}</small>
            )}
          </label>
        </div>

        {/* Category */}
        <label className="field">
          <span>Category</span>
          <select defaultValue="" {...register("category")}>
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
            <small className="error">{errors.category.message}</small>
          )}
        </label>

        {/* Payment Mode (NEW) */}
        <label className="field">
          <span>Payment mode</span>
          <select defaultValue="" {...register("paymentMode")}>
            <option value="" disabled>
              Select payment mode
            </option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
          {errors.paymentMode && (
            <small className="error">{errors.paymentMode.message}</small>
          )}
        </label>

        <button className="btn" type="submit">
          Save Expense
        </button>
      </form>
    </div>
  );
}