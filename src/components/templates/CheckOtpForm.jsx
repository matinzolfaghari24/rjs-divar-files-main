import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { checkOtp } from "services/auth";
import { getProfile } from "src/services/user";
import { setCookie } from "utils/cookies";

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const { refetch } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();



  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5)
      return toast.warn("کد اشتباه وارد شده ", { position: "top-center" });
    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch()
    }
    if (error)
      if (error.response.data.message == "otp code is incorrect")
        toast.error("کد وارد شده نا معتبر است", { position: "top-center" });
      else toast.error(error.response.data.message);
  };


  return (
    <form onSubmit={submitHandler} className="h-lvh flex justify-center items-center">
      <div className="w-xl border border-gray-300 rounded-lg p-10  m-2 ">

      <p className="font-semibold mb-6 ">تایید کد پیامک شده</p>
      <span className="text-sm block text-gray-500 mb-6">کد پیامک شده به شماره «{mobile}» را وارد کنید</span>
      <label htmlFor="input" className="block mb-2">کد تایید را وارد کنید</label>
      <input
      className="border border-gray-300 rounded-sm w-full p-2  text-sm font-semibold mb-4  outline-rose-800"
        type="text"
        id="input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="کد تایید"
        />
      <button type="submit" className="block bg-rose-800 px-4 py-1 rounded-md text-white mb-6 transition duration-300 ring-2 cursor-pointer  hover:ring-rose-800 hover:text-rose-800 hover:bg-white">ورود</button>
      <button onClick={() => setStep(1)} className="border-2 border-rose-800 py-1 px-5 text-sm text-rose-800 rounded-lg transition duration-300 cursor-pointer hover:bg-rose-800 hover:text-white">  تغییر شماره موبایل </button>
      <ToastContainer />
        </div>
    </form>
  );
}

export default CheckOtpForm;
