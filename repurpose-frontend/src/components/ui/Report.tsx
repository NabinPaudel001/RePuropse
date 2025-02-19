"use client";
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  category: string;
  description: string;
  attachment: File | null;
}

export default function Report() {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    description: '',
    attachment: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'attachment' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }

    // Send the form data to the backend
    const response = await fetch('/api/report', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      alert('Issue reported successfully!');
    } else {
      alert('Failed to report the issue.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Report an Issue
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-bold" htmlFor="category">
            Issue Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 mb-4 border rounded"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="technical">Technical Issue</option>
            <option value="transaction">Transaction</option>
            <option value="report">Report</option>
            <option value="violence">Violence</option>
            <option value="unethical">Unethical Product</option>
            <option value="customer_service">Customer Service</option>
            <option value="delivery">Delivery Issue</option>
            <option value="other">Other</option>
          </select>

          <label className="block mb-2 font-bold" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full p-2 mb-4 border rounded"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label className="block mb-2 font-bold" htmlFor="attachment">
            Attach Image/Video:
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept="image/*,video/*"
            className="w-full mb-4"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Report
          </button> 
        </form>
      </div>
    </div>
  );
}
