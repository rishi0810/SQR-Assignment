import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type User = z.infer<typeof UserSchema>;

interface LoginSuccessResponse {
  message: string;
  email: string;
  createdAt: string;
  id: string;
}
interface ErrorResponse {
  message: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver: zodResolver(UserSchema) });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      const response = await axios.post<LoginSuccessResponse>(
        "http://localhost:3000/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;

        if (serverError.response) {
          const status = serverError.response.status;
          switch (status) {
            case 401:
              setError("email", { type: "manual", message: " " });
              setError("password", {
                type: "manual",
                message: "Invalid password.",
              });
              break;

            case 404:
              setError("email", {
                type: "manual",
                message: "No account found with this email.",
              });
              break;

            case 500:
              toast.error("Internal Server Error");
              break;

            default:
              toast.error("Internal Server Error");
              break;
          }
        } else if (serverError.request) {
          console.error("Network Error:", serverError.request);
          toast.error("Network Error");
        } else {
          console.error("Axios Setup Error:", serverError.message);
          toast.error("Axios Setup Error");
        }
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Unexpected Error Occured");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-12 items-center min-w-[320px] min-h-[314px]">
        <span className="mx-auto font-[700] text-[30px]">Welcome Back!</span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-12 w-full"
        >
          <div className="min-h-[120px] w-full flex flex-col space-y-6">
            <div>
              <input
                type="email"
                {...register("email")}
                className="border border-zinc-400 rounded w-full p-2 placeholder-zinc-400"
                placeholder="UID"
              />
              {errors.email && (
                <p className="text-red-500 text-sm pt-1 pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                className="border border-zinc-400 rounded w-full p-2 placeholder-zinc-400"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 pt-1 pl-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#2B3A67] hover:opacity-90 active:opacity-85 text-white py-4 border rounded-[8px] hover:cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex space-x-1 items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
