// BouncingDotsLoader.js
import React from 'react';
import '../stylesheets/loadingpage.css';

const BouncyBouncy = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.dot}></div>
      <div style={{ ...styles.dot, animationDelay: '0.2s' }}></div>
      <div style={{ ...styles.dot, animationDelay: '0.4s' }}></div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  dot: {
    width: '10px',
    height: '10px',
    margin: '0 5px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
    animation: 'bounce 1s infinite ease-in-out',
  },
};


export default BouncyBouncy;