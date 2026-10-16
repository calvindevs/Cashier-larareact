import { useNavigate } from "react-router-dom";

export default function CashierHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  }
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl">
        Cashier Dashboard
      </h1>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
      >
        Logout
      </button>
    </div>
  );
}
