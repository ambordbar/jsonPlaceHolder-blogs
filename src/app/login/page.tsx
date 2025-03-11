import SignInButton from "../components/auth/SignInButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <SignInButton />
      </div>
    </div>
  );
}
