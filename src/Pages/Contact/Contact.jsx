import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../../Components"
import { showAlert } from "../../Store/actions/alertActionTypes";
import { BASE_API_URL } from "../../utils/commanFunctions";

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cake_size: '',
    cake_type: '',
    order_date: '',
    image: null,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,  // Handle file input separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, cake_size, cake_type, order_date, message } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !cake_size.trim() || !cake_type.trim() || !order_date.trim()) {
      dispatch(showAlert("* marked fields are required and cannot be blank spaces", "error"));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();

      // Adding the form data to FormData object
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(`${BASE_API_URL}/api/v1/mail/send-mail`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        dispatch(showAlert(data.message, "success"));
        setFormData({ name: '', email: '', phone: '', address: '', cake_size: '', cake_type: '', order_date: '', image: null, message: '' });
      } else {
        dispatch(showAlert(data.message, "error"));
      }

    } catch (err) {
      dispatch(showAlert("Failed to submit the form", "error"));
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <Spinner /> :
        <section className={`h-[auto] w-screen bg-primary flex justify-center items-center ss:px-10 px-6`} id='contactus'>
          <form onSubmit={handleSubmit} className='w-full bg-secondary rounded-xl flex flex-col justify-center items-center ss:px-8 px-2 py-4 gap-5'>
            <h1 className='text-center font-semibold ss:text-[1.6rem] text-[1.3rem]'>Request an Order</h1>
            <p className='text-center text-[1.1rem]'>Tell us about your order and we will contact you shortly.</p>

            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full flex ss:flex-row flex-col justify-center items-center gap-2">
              <div className="ss:w-1/2 w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name*"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="ss:w-1/2 w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your mail*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="w-full flex ss:flex-row flex-col justify-center items-center gap-2">
              <div className="ss:w-1/3 w-full">
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number*"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="ss:w-2/3 w-full">
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address*"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="w-full flex ss:flex-row flex-col justify-center items-center gap-2">
              <div className="ss:w-1/2 w-full">
                <input
                  type="text"
                  name="cake_size"
                  placeholder="Write size of Cake (Small, Medium, Large)*"
                  value={formData.cake_size}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="ss:w-1/2 w-full">
                <input
                  type="text"
                  name="cake_type"
                  placeholder="Write type of cake (Birthday, Wedding, Aniversary, Corporate etc...)*"
                  value={formData.cake_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="w-full flex ss:flex-row flex-col justify-center items-center gap-2">
              <div className="ss:w-1/2 w-full">
                <input
                  type="text"
                  name="order_date"
                  placeholder="Date of delivery (day-month-year)*"
                  value={formData.order_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="ss:w-1/2 w-full">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-white rounded-md"
                />
              </div>
            </div>

            <textarea
              name="message"
              rows="4"
              placeholder="Some additional note..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 ${loading ? 'bg-gray-500' : 'bg-primary'} text-black font-semibold rounded-md`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </section>
      }
    </>
  );
};

export default Contact;
