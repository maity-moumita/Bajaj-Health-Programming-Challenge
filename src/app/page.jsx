'use client';
import { useState } from 'react';

export default function HomePage() {
  const [form, setForm] = useState({ full_name: '', dob: '', data: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      full_name: form.full_name,
      dob: form.dob,
      data: form.data.split(',').map((s) => s.trim())
    };

    const res = await fetch('/api/bfhl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    setResponse(json);
  };

  return (
    <main className="min-h-screen bg-black p-8 flex flex-col justify-center items-center bg-gradient-to-b from-black to-pink-900">
      <div className="bg-pink-950/30 bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          BFHL API Tester
        </h1>
        
        <input 
          name="full_name" 
          placeholder="Full Name" 
          className="border border-pink-300 rounded-lg p-3 w-full mb-4 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 ease-in-out" 
          onChange={handleChange} 
        />
        
        <input 
          name="dob" 
          placeholder="DOB (ddmmyyyy)" 
          className="border border-pink-300 rounded-lg p-3 w-full mb-4 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 ease-in-out" 
          onChange={handleChange} 
        />
        
        <input 
          name="data" 
          placeholder="Numbers (comma-separated)" 
          className="border border-pink-300 rounded-lg p-3 w-full mb-6 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 ease-in-out" 
          onChange={handleChange} 
        />
        
        <button 
          onClick={handleSubmit} 
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300">
          Submit
        </button>

        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Response:</h3>
            <pre className="text-sm text-gray-600">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
