import { login, signup } from "../actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center text-xl font-semibold">
      <label className="mt-4 text-slate-200 " htmlFor="email">
        Email:
      </label>
      <input id="email" name="email" type="email" required />
      <label className="mt-4 text-slate-200 " htmlFor="password">
        Password:
      </label>
      <input id="password" name="password" type="password" required />
      <button
        formAction={login}
        className="mt-4 px-4 py-1 text-center text-xl bg-slate-800 rounded-md font-semibold text-slate-200 hover:bg-slate-900 transition-all duration-300"
      >
        Log in
      </button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
}
