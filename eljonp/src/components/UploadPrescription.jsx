import React from 'react';

const UploadPrescription = () => {
  const handleUpload = () => {
    // Handle file upload logic
    console.log('Upload prescription clicked');
  };

  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-blue-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Upload Prescription</h2>
        <p className="mb-6">Easily upload your prescription and place your order online</p>
        <button 
          onClick={handleUpload}
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors"
        >
          UPLOAD
        </button>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
        <img 
          src="/images/prescription.jpg" 
          alt="Prescription with RX symbol" 
          className="w-full max-w-sm h-auto"
        />
      </div>
    </section>
  );
};

export default UploadPrescription;