import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../../Components"
import { showAlert } from "../../Store/actions/alertActionTypes";

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/mail/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(showAlert(data.message, "success"))
        setFormData({ name: '', email: '', message: '' });
      } else {
        dispatch(showAlert(data.message, "error"))
      }

    } catch (err) {
      dispatch(showAlert(data.message, "error"))
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? <Spinner /> : <section className={`h-[80vh] bg-white flex justify-center items-center`} id='contactus'>
        <form onSubmit={handleSubmit} className='h-[400px] w-[300px] bg-secondary rounded-xl flex flex-col justify-center items-center px-5 gap-5'>
          <h1 className='text-center ss:text-[1.5rem] text-[1.1rem]'>Contact Us</h1>

          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 ${loading ? 'bg-gray-500' : 'bg-primary'} text-black font-semibold rounded-md shadow hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-75`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </section>}
    </>
  );
};

export default Contact;
