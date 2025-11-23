

// const Success = () => {
//   return (
//     <div>
//       this is Success page
//     </div>
//   )
// }

// export default Success


// // Check this page

import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import React Router's useNavigate hook for navigation

const Success: React.FC = () => {
  const navigate = useNavigate(); // Hook for programmatically navigating

  // Function to navigate to the purchased list page
  const goToPurchasedList = () => {
    navigate('/purchased');  // Redirects to /purchased
  };

  return (
    <div style={{ display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign: 'center', padding: '40px' }}>
      {/* Check SVG Image from the public folder */}
      <img 
        src="/check.svg" 
        alt="Success" 
        style={{ width: '100px', height: '100px', marginBottom: '20px' }} 
      />

      {/* Payment success message */}
      <p style={{ color: '#148FA2', fontWeight: "400",  fontSize: "20px" }}>
        Payment successful
      </p>
      <p style={{ color: '#148FA2', fontWeight: "400",  fontSize: "20px" }}>
      Purchase made Successful
      </p>

      {/* Button to go to purchased list */}
      <button 
        onClick={goToPurchasedList}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#148FA2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Go to Purchased List
      </button>
    </div>
  );
};

export default Success;
