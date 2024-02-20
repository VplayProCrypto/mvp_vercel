import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="header-container">
      <div className="logo">Logo</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="action-button">
        <button>Button</button>
      </div>
    </div>
  );
};

export default Navbar;