import { useState } from "react";
import "./ExpenseForm.css";

type Expense = {
  description: string;
  amount: string;   
  date: string;     
  category: string;
};

export default function ExpenseForm({ onSubmit }: { onSubmit?: (e: Expense) => void }) 
{
  const [form, setForm] = useState<Expense>({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() 
  {
    const next: Record<string, string> = {};
    if (!form.description.trim()) next.description = "Required";
    if (!form.amount || Number(form.amount) <= 0) next.amount = "Enter a positive amount";
    if (!form.date) next.date = "Pick a date";
    if (!form.category) next.category = "Select a category";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) 
  {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(form);
    // clear after submit
    setForm({ description: "", amount: "", date: "", category: "" });
  }

  return (
    <div className="card">
      <div className="card__header">Add New Expense</div>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>Description</span>
          <input
            name="description"
            placeholder="e.g. Weekly Groceries"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <small className="error">{errors.description}</small>}
        </label>

        <div className="row">
          <label className="field">
            <span>Amount ($)</span>
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
            />
            {errors.amount && <small className="error">{errors.amount}</small>}
          </label>

          <label className="field">
            <span>Date</span>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <small className="error">{errors.date}</small>}
          </label>
        </div>

        <label className="field">
          <span>Category</span>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="" disabled>
              Select a category
            </option>
            <option>Groceries</option>
            <option>Transport</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
          {errors.category && <small className="error">{errors.category}</small>}
        </label>

        <button className="btn" type="submit">Save Expense</button>
      </form>
    </div>
  );
}
