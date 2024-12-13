import React from 'react';

const DownloadPage = () => {
  const handleDownload = () => {
    fetch('http://localhost:5000/attendance/download-attendance')
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_records.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (
    <div>
      <h1>Download Attendance PDF</h1>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default DownloadPage;