"use client";

import { useState, useEffect } from 'react';
import TrustedBy from '../compare-against/TrustedBy';
import Header from '@/components/ui/header';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    querytype: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    jobTitle: '',
    email: '',
    employeesRange: '',
    feedback: '',
    usage: '',
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setFormData(prevState => ({ ...prevState, querytype: hash }));
    }
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'querytype') {
      window.history.pushState(null, '', `#${value}`);
    }
  };




  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          querytype: '',
          firstName: '',
          lastName: '',
          phone: '',
          company: '',
          jobTitle: '',
          email: '',
          employeesRange: '',
          feedback: '',
          usage: '',
        });
        window.history.pushState(null, '', '#');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };





  const renderFormFields = () => {
    switch (formData.querytype) {
      case 'demo':
        return (
          <>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Phone (optional)" type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Company Name" type="text" name="company" value={formData.company} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Job Title (optional)" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <select className="block w-full px-4 py-2 border rounded-md" name="employeesRange" value={formData.employeesRange} onChange={handleChange}>
                <option value="">Number of Employees</option>
                <option value="1-5">1-5</option>
                <option value="5-25">5-25</option>
                <option value="25-50">25-50</option>
                <option value="50-100">50-100</option>
                <option value="100-700">100-700</option>
                <option value="500-1000">500-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
            <div className="field mb-4">
              <label className="block mb-2">Type of Knowledge Base</label>
              <select className="block w-full px-4 py-2 border rounded-md" name="usage" value={formData.usage} onChange={handleChange}>
                <option value="both">External + Internal Knowledge Base</option>
                <option value="external">Only External</option>
                <option value="internal">Only Internal</option>
              </select>
            </div>
          </>
        );
      case 'freedesign':
        return (
          <>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </>
        );
      case 'feedbackbugs':
      case 'migration':
      case 'technical':
        return (
          <>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <input className="block w-full px-4 py-2 border rounded-md" placeholder="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="field mb-4">
              <textarea className="block w-full px-4 py-2 border rounded-md" placeholder="Describe the issue or feedback" name="feedback" value={formData.feedback} onChange={handleChange}></textarea>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card create-demo mt-12">
      <Header />

<br/>
<br/>
<br/>
<br/>
<br/>

      <div className="justify-center mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start max-w-7xl border bg-slate-100 rounded-2xl p-8 mb-12">
        <div className="w-full p-4 h-full px-12">
          <h3 className="text-center text-lg font-semibold mt-12 mb-12 opacity-75 w-xl">"Your success is our success. This is why all our services are at cost to cost basis. <u>We only make money when you grow</u> ."</h3>
          <div className="flex justify-center my-4">
            <img alt="VP of Success" className="rounded-md w-48 h-48 object-cover" src="https://dazzling-cat.netlify.app/image 1469.png" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">VP of Success</h3>
            <a href="mailto:success@crabshq.com" className="text-orange-700 block">success@crabshq.com</a>
          </div>
          <p className="text-center mt-4 mb-8">Please complete this form, and VP of Success will be in touch with you shortly.</p>
          <TrustedBy />

        </div>
        <div className="w-full border p-4 px-12 rounded-2xl shadow-lg bg-white">
          <iframe
            src="https://app.youform.com/forms/r3rvhjv4"
            loading="lazy"
            width="100%"
            height={700}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}>
          </iframe>



        </div>
      </div>
    </div>
  );
}
