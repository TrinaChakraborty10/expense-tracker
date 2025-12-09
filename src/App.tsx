import ExpenseForm from "./components/ExpenseForm";

function App() {
  return (
    <>
      <ExpenseForm
        onSubmit={(data) => {
          console.log("Expense submitted:", data);
          alert("Expense saved!");
        }}
      />
    </>
  );
}

export default App;