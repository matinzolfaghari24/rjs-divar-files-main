import { toast, ToastContainer } from "react-toastify";
import { sendOtp } from "services/auth";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11)
      return toast.warn("لطفا شماره معتبر وارد کنید", {
        position: "top-center",
      });
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error)
      toast.error(error.response.data.message, { position: "top-center" });
    console.log({ response, error });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex h-lvh justify-center items-center "
    >
      <div className="w-xl border border-gray-300 rounded-lg p-10  m-2 ">
        <div className="">
          <p className="mb-6 font-semibold">ورود به حساب کاربری</p>
          <span className="text-sm text-gray-500 block mb-6">
            برای استفاده از امکانات دیوار ، لطفا شمارۀ موبایل خود را وارد کنید.
            کد تایید به این شماره ارسال خواهد شد
          </span>
          <label htmlFor="input" className="block mb-3">شماره موبایل خود را وارد کنید</label>
          <input
            className="w-full mb-6 border border-gray-300 rounded-md p-1.5 outline-rose-800"
            type="text"
            id="input"
            placeholder="شماره موبایل"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button type="submit" className="bg-rose-800 py-1 px-2 rounded-md text-white">ارسال کد تایید</button>
          <ToastContainer />
        </div>
      </div>
    </form>
  );
}

export default SendOtpForm;
