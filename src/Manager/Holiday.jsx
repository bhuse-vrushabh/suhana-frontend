import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import './Holiday.css'; // Import your CSS file
import './Sidebarr.css';
import Sidebarr from './Sidebarr';

const allHolidays = [
  { title: '1st Jan 2024 - New Year 2024', startDate: '01/01/2024', endDate: '01/01/2024', status: 'Published' },
  { title: 'Lohri', startDate: '14/01/2024', endDate: '14/01/2024', status: 'Restricted' },
  { title: 'Makar Sankranti/Pogal', startDate: '15/01/2024', endDate: '15/01/2024', status: 'Restricted' },
  { title: 'Republic Day 2024', startDate: '26/01/2024', endDate: '26/01/2024', status: 'Published' },
  { title: 'Mahashivratri', startDate: '08/03/2024', endDate: '08/03/2024', status: 'Restricted' },
  { title: 'Chhatrapati Shivaji Maharaj Jayanti', startDate: '19/02/2024', endDate: '19/02/2024', status: 'Restricted' },
  { title: 'Dhulivandan', startDate: '24/03/2024', endDate: '24/03/2024', status: 'Restricted' },
  { title: 'Holi', startDate: '25/03/2024', endDate: '25/03/2024', status: 'Restricted' },
  { title: 'Gudi Padva/Ugadi', startDate: '09/04/2024', endDate: '09/04/2024', status: 'Published' },
  { title: 'Ram Navmi', startDate: '17/04/2024', endDate: '17/04/2024', status: 'Published' },
  { title: 'Mahavir Jayanti', startDate: '21/04/2024', endDate: '21/04/2024', status: 'Published' },
  { title: 'Good Friday', startDate: '29/03/2024', endDate: '29/03/2024', status: 'Restricted' },
  { title: 'Jamat ul Vida', startDate: '05/04/2024', endDate: '05/04/2024', status: 'Restricted' },
  { title: 'Id ul Fitra', startDate: '11/04/2024', endDate: '11/04/2024', status: 'Restricted' },
  { title: 'Labour Day', startDate: '01/05/2024', endDate: '01/05/2024', status: 'Published' },
  { title: 'Buddha Purnima', startDate: '23/05/2024', endDate: '23/05/2024', status: 'Restricted' },
  { title: 'Id ul Zuha/Adha', startDate: '17/06/2024', endDate: '17/06/2024', status: 'Restricted' },
  { title: 'Independence day', startDate: '15/08/2024', endDate: '15/08/2024', status: 'Published' },
  { title: 'Onam', startDate: '05/09/2024', endDate: '05/09/2024', status: 'Restricted' },
  { title: 'Raksha Bandhan', startDate: '19/08/2024', endDate: '19/08/2024', status: 'Published' },
  { title: 'Ganesh Chaturthi', startDate: '30/09/2024', endDate: '30/09/2024', status: 'Published' },
  { title: 'New Year', startDate: '01/01/2024', endDate: '01/01/2024', status: 'Published' },
  { title: 'Republic Day', startDate: '26/01/2024', endDate: '26/01/2024', status: 'Published' },
  { title: 'Holi', startDate: '08/03/2024', endDate: '08/03/2024', status: 'Restricted' },
  { title: 'Easter', startDate: '31/03/2024', endDate: '31/03/2024', status: 'Restricted' },
  { title: 'Pongal', startDate: '14/01/2024', endDate: '14/01/2024', status: 'Published' },
  { title: 'Makar Sankranti', startDate: '15/01/2024', endDate: '15/01/2024', status: 'Published' },
  { title: 'Navaratri', startDate: '21/10/2024', endDate: '21/10/2024', status: 'Published' },
  { title: 'Valentine\'s Day', startDate: '14/02/2024', endDate: '14/02/2024', status: 'Restricted' },
  { title: 'Thanksgiving', startDate: '28/11/2024', endDate: '28/11/2024', status: 'Published' },
];

// Pagination constants
const recordsPerPage = 10;

const Holiday = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(allHolidays.length / recordsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Get current records for the page
  const currentHolidays = allHolidays.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
  <div className="main-wrapper">
     <Sidebarr />
    <div className="holiday-container">
      {/* Header Section */}
      <div className="header_h">
        <h1 className="header-title_h">Holidays</h1>
        <button className="add-button_h">Add Holidays</button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Holidays..."
        />
        <div className="button-group">
          <button className="filter-button">Holidays</button>
          <button className="filter-button">Calendar</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <h2 className="table-title">List All Holidays</h2>
        <select className="year-select">
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <table className="holiday-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>
                <div className="flex items-center">
                  <FaCalendar className="mr-1" /> Start Date
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <FaCalendar className="mr-1" /> End Date
                </div>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentHolidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.title}</td>
                <td>{holiday.startDate}</td>
                <td>{holiday.endDate}</td>
                <td>
                  <span className={`status ${holiday.status.toLowerCase()}`}>
                    {holiday.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="pagination">
        <span>
          Showing {(currentPage - 1) * recordsPerPage + 1} to{' '}
          {Math.min(currentPage * recordsPerPage, allHolidays.length)} of {allHolidays.length} records
        </span>
        <div className="pagination-buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(Math.ceil(allHolidays.length / recordsPerPage)).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`pagination-button ${currentPage === page + 1 ? 'active' : ''}`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
            disabled={currentPage === Math.ceil(allHolidays.length / recordsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

     </div>
    </div>
  );
};

export default Holiday;




 