import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Invoice from './Invoice';

const Searched_invoice = () => {
  const { id } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [noOfLines, setNoOfLines] = useState("");
  const [noOfCorners, setNoOfCorners] = useState("");
  const [noOfGates, setNoOfGates] = useState("");
  const [fenceType, setFenceType] = useState("");
  const [fencePostGap, setFencePostGap] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState("");
  const [balance, setBalance] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [CustomerNo, setCustomerNo] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [name, setName] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id != null) {
      axios
        .get(`http://localhost:8070/api/customer/getonecus/${id}`)
        .then((response) => {
          console.log(response.data);

          setCustomerName(response.data.customerName);
          setDate(response.data.date);
          setAddress(response.data.address);
          setPerimeter(response.data.customerInputData.perimeter);
          setNoOfLines(response.data.customerInputData.noOfLines);
          setNoOfCorners(response.data.customerInputData.noOfCorners);
          setNoOfGates(response.data.customerInputData.noOfGates);
          setFenceType(response.data.customerInputData.fenceType);
          setFencePostGap(response.data.customerInputData.fencePostGap);
          setInvoiceItems(response.data.item);
          setCustomerNo(response.data.customerNo);
          setSubTotal(response.data.subTotal);
          setDiscount(response.data.discount);
          setTotal(response.data.total);
          setPaid(response.data.paid);
          setBalance(response.data.balance);
          setBankName(response.data.paymentMethod.bankName);
          setAccountNo(response.data.paymentMethod.accountNo);
          setName(response.data.paymentMethod.name);
          setDescription1(response.data.description.description1);
          setDescription2(response.data.description.description2);
          setDescription3(response.data.description.description3);
          setDescription4(response.data.description.description4);
        })
        .catch((error) => {
          //console.error("Error fetching items", error);
          setMessage("Network error. Please check your internet connection.");
          setTimeout(() => {
          setMessage(null);
        }, 1000);
        });
    }
  }, [id]);

  useEffect(() => {
    console.log("Invoice ID:", id);
  }, [id]);

  return (
    <div>
      <div className="des-header-container">
        <div className="right-section">
          <div className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">
              <IoMdArrowBack />
            </span>
            <h5 className="back-text">Back</h5>
          </div>
        </div>
        <div className="des-name">Estimate Details</div>
      </div>
      <div className="download-container">
      <PDFDownloadLink
        document={
          <Invoice
            customerNo={CustomerNo}
            customerName={customerName}
            date={date}
            address={address}
            perimeter={perimeter}
            noOfLines={noOfLines}
            noOfCorners={noOfCorners}
            noOfGates={noOfGates}
            fenceType={fenceType}
            fencePostGap={fencePostGap}
            invoiceItems={invoiceItems}
            subTotal={subTotal}
            discount={discount}
            total={total}
            paid={paid}
            balance={balance}
            bankName={bankName}
            accountNo={accountNo}
            name={name}
            description1={description1}
            description2={description2}
            description3={description3}
            description4={description4}
          />
        }
        fileName={`Estim-${CustomerNo}.pdf`}
      >
        <button type="submit" className="btn btn-primary download-button">
          <FaRegFilePdf /> Download Invoice
        </button>
      </PDFDownloadLink>
      </div>
      
      <div className="invoice-container">
        {/* Header */}
        <div className="part-1">
          <div>
            <h1 className="company-name">VERSELLS LANKA (PVT) LTD</h1>
            <h6 className="registration">Registration No: PV 00234182</h6>
          </div>
          <img
            src="/images/final01-bw.png"
            alt="Logo"
            className="company-logo"
          />
        </div>
        <br />
        {/* Invoice Title */}
        <div className="part-2">
          <div className="green-box"></div>
          <h2>Estimate</h2>
        </div>

        {/* Customer Details */}
        <div className="part-3">
          <div className="part-3-left">
            <span>To :</span>
            <strong>{customerName}</strong>
            <span style={{ fontSize: 14 }}>{address}</span>
          </div>
          <div className="part-3-right">
            <p>
              <strong>Customer No:</strong> {CustomerNo}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
          </div>
        </div>

        <strong className="estimate-font">Estimate Details:</strong>
        <div className="part-3-bottom">
          <div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 20 }}>Perimeter (in feet):</span>
              <span>{perimeter}</span>
            </div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 36 }}>Number of lines: </span>
              <span>{noOfLines}</span>
            </div>
          </div>
          <div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 15 }}>Number of corners: </span>
              <span>{noOfCorners}</span>
            </div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 29 }}>Number of gates: </span>
              <span>{noOfGates}</span>
            </div>
          </div>
          <div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 29 }}>Fence Post Gap: </span>
              <span>{fencePostGap}</span>
            </div>
            <div className="part-3-bottom-1">
              <span style={{ marginRight: 64 }}>Fence Type: </span>
              <span>
                {fenceType === "elephants"
                  ? "Elephants"
                  : fenceType === "small animals"
                  ? "Small Animals"
                  : fenceType}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="part-4">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Item Name</th>
                <th>Item Image</th>
                <th style={{ maxWidth: 180 }}>Description</th>
                <th style={{ minWidth: 50 }}>Qty</th>
                <th style={{ minWidth: 50 }}>Unit</th>
                <th style={{ minWidth: 50 }}>Price/Unit</th>
                <th style={{ minWidth: 50 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td style={{ maxWidth: 180 }}>{item.description}</td>
                  <td style={{ minWidth: 50, textAlign: "right" }}>
                    {item.quantity}
                  </td>
                  <td style={{ minWidth: 50, textAlign: "center" }}>
                    {item.itemUnit}
                  </td>
                  <td style={{ minWidth: 50, textAlign: "right" }}>
                    {item.unitPrice}
                  </td>
                  <td style={{ minWidth: 50, textAlign: "right" }}>
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Method and Description */}
        <div className="part-5">
          <div className="part-5-left">
            <div>
              <strong>Payment Method</strong>
              <div className="payment">
                <span>{bankName}</span>
                <span>{accountNo}</span>
                <span>{name}</span>
              </div>
            </div>
            <div>
              <strong>Description</strong>
              <div className="payment">
                <span>{description1}</span>
                <span>{description2}</span>
                <span>{description3}</span>
                <span>{description4}</span>
              </div>
            </div>
          </div>

          {/*Subtotal, Discount, and Grand Total*/}
          <div className="part-5-right">
            <table className="part-5-right-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Sub Total</strong>
                  </td>
                  <td>Rs. {subTotal}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Discount</strong>
                  </td>
                  <td >Rs. {discount}</td>
                </tr>

                <tr className="grand-total-row">
                  <td>
                    <strong>GRAND TOTAL</strong>
                  </td>
                  <td>Rs. {total}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Paid</strong>
                  </td>
                  <td>Rs. {paid}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Balance</strong>
                  </td>
                  <td>Rs. {balance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="part-6">
          <hr />
          <div className="part-6-bottom">
            <div className="contact-item">
              <FaPhone className="icon" />
              <div>
                <p className="contact-title">Phone</p>
                <p>0743434345</p>
                <p style={{ marginTop: 20 }}>www.versellslanka.com</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="icon" />
              <div>
                <p className="contact-title">Mail</p>
                <p>info@versellslanka.com</p>
                <p style={{ marginTop: 20 }}>www.elephantfence.lk</p>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="icon" />
              <div>
                <p className="contact-title">Address</p>
                <p>155/5 Karuwalagasthawaththa</p>
                <p>Maho, 60600</p>
                <p>Kurunegala</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searched_invoice;
