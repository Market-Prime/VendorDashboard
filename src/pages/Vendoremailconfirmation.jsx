import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import logo from "/src/assets/Logo 1.png";
// import logo 1 from "src/assets/Logo 1.png"
import axios from 'axios';
function EmailConfirmation() {
  const { token } = useParams();
  console.log("Captured Token:", useParams().token); // Debugging log
  const navigate = useNavigate();

  console.log('Token:', token); // Log the token to confirm it's being captured



  const confirmEmail = async () => {
    try {
      const response = await axios.post(
        `https://mb.marketprime.io/api/account/confirm/`,
        { token }
      );

      toast.success(
        response.data.message ||
          "Account Confirmed, Please proceed to login with your details",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { backgroundColor: "green" },
        }
      );

      setTimeout(() => {
        navigate("/finalSection");
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: "red" },
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-2/3 bg-white rounded-3xl shadow-2xl m-auto my-56 py-10">
        <img
          src={logo}
          alt="MarketPrime Logo"
          className="text-center mx-auto rounded-xl"
        />
        <h5 className="text-3xl text-center mt-5">Confirm your Account</h5>
        <p className="mt-3 text-center w-2/3 mx-auto">
          Please click on the button below to confirm your account and continue
          shopping at MARKETPRIME
        </p>
        <button
          onClick={confirmEmail}
          className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 block py-5 rounded-lg text-white uppercase text-center font-bold mt-10"
        >
          Confirm Account
        </button>
      </div>
    </div>
  );
}

export default EmailConfirmation;