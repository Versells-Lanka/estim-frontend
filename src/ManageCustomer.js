import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const ManageCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/customer/getallcus")
      .then((response) => {
        setCustomer(response.data);
        setFilteredCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredCustomers(customer);
    } else {
      const filtered = customer.filter((cus) =>
        cus.customerNo.toString().includes(value)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCustomers.length / itemsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const paginatedCus = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openDeleteModal = (id) => {
    setSelectedCustomerId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
  };

  const confirmDelete = () => {
    axios
      .post("http://localhost:8070/api/customer/cusdel", {
        id: selectedCustomerId,
      })
      .then(() => {
        setCustomer(customer.filter((cus) => cus._id !== selectedCustomerId));
        setFilteredCustomers(
          filteredCustomers.filter((cus) => cus._id !== selectedCustomerId)
        );
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Error deleting customer", error);
      });
  };

  return (
    <div>
      <div className="des-header-container">
        <div className="right-section-back">
          <div className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">
              <IoMdArrowBack />
            </span>
            <h5 className="back-text">Back</h5>
          </div>
        </div>
        <div className="des-name">Customer List</div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this customer?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="search-pagination-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Customer Id..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <BiSearchAlt2 className="search-icon" />
          </button>
        </div>
        <div className="pagination">
          <button
            className="btn arrow-left"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className="page-info">
            Page {currentPage} of{" "}
            {Math.ceil(filteredCustomers.length / itemsPerPage)}
          </span>
          <button
            className="btn arrow-right"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredCustomers.length / itemsPerPage)
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="table-section">
        <div className="table-container">
          <div className="invoice-table">
            <table className="table table-bordered my-5">
              <thead>
                <tr>
                  <th scope="col">Customer No</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Perimeter</th>
                  <th scope="col">Lines</th>
                  <th scope="col">Corners</th>
                  <th scope="col">Gates</th>
                  <th scope="col">Fence Type</th>
                  <th scope="col">FencePostGap</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCus.map((cus, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{cus.customerNo}</td>
                    <td>{cus.customerName}</td>
                    <td>{cus.date}</td>
                    <td>{cus.address}</td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.perimeter || "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.noOfLines || "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.noOfCorners || "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.noOfGates || "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.fenceType || "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cus.customerInputData?.fencePostGap || "N/A"}
                    </td>
                    <td>
                      <div className="manage-container">
                        <button
                          className="btn btn-primary item-edit"
                          onClick={() =>
                            navigate("/home", { state: { id: cus._id } })
                          }
                        >
                          <RiEdit2Line className="table-item-edit" />
                        </button>
                        <button
                          className="btn btn-danger item-del"
                          onClick={() => openDeleteModal(cus._id)}
                        >
                          <RiDeleteBin6Line className="table-item-del" />
                        </button>
                      </div>
                      <h6 className="see-more-header">
                        <Link to={`/customer_Invoice/${cus._id}`}>
                          See more...
                        </Link>
                      </h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomer;
