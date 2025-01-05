import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Performance.css"

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/performances');
        setPerformanceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="performance-page ">
      <h1 style={{color:'black',marginTop:'2rem'}}>Performance and Grading</h1>
      <table className='performance-table mt-6' style={{width:'90%', backgroundColor:'#f5f5f5'}}>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Max Marks</th>
            <th>Marks Obtained</th>
            <th>Grading</th>
            <th>Standard</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.rollNum}</td>
              <td>{item.userName}</td>
              <td>{item.subjectName}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.maxMarks}</td>
              <td>{item.marksObtained}</td>
              <td>{item.grading}</td>
              <td>{item.standard}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformancePage;
