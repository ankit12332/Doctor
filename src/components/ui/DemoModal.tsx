import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "../../utils/supabaseClient";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation Function
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Enter a valid 10-digit phone number";
        break;
      case "message":
        if (value.length > 300)
          error = "Message should not exceed 300 characters";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate field on change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);

    // If validation fails, stop submission
    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const { data, error } = await supabase.from("demo_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      console.log("Data saved:", data);
      setSuccess(true);
      setFormData(initialFormData); // Reset form after successful submission
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modal Box */}
          <motion.div
            className="relative z-[1100] w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 md:p-8"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                Book A Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Get a personalized tour of our AI-powered healthcare solutions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Input Fields */}
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "Enter your name" },
                { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter 10-digit phone number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border rounded-lg bg-transparent text-gray-900 dark:text-white 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                      ${errors[field.name as keyof typeof errors] ? "border-red-500" : "border-blue-400"}`}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              {/* Service Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium">Choose Your Plan</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-blue-400 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="" disabled>-- Select a Plan --</option>
                  <option value="Starter">Starter | Solo Doctors</option>
                  <option value="Growth">Growth | Small Clinics</option>
                  <option value="Enterprise">Enterprise | Hospitals</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-3 border rounded-lg bg-transparent text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                    ${errors.message ? "border-red-500" : "border-blue-400"}`}
                  placeholder="Type your message (max 300 characters)"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </motion.button>
              </div>
              {success && <p className="text-green-500 text-center mt-2">Submitted Successfully!</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
