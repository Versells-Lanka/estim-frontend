import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LuCirclePlus } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Invoice from "./component/Invoice.js";
import ErrorMessage from "./ErrorMessage.js";
import Header from "./Header";
import SuccessMessage from "./SuccessMessage.js";

const Calculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(location.state?.id || null);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [unitPrice, setItemPrice] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [description, setItemDescription] = useState("");
  const [imageUrl, setItemImage] = useState("");
  const [items, setItems] = useState([]);
  const [updateItem, setUpdateItem] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountRs, setDiscountRs] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState(0);
  const [balance, setBalance] = useState("");

  const [prevCustomerNo, setPrevCustomerNo] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [perimeter, setPerimeter] = useState(0);
  const [noOfLines, setNoOfLines] = useState(0);
  const [noOfCorners, setNoOfCorners] = useState(0);
  const [noOfGates, setNoOfGates] = useState(0);
  const [fenceType, setFenceType] = useState(0);
  const [fencePostGap, setFencePostGap] = useState(60);
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [bankName, setBankName] = useState("Bank Name: Sampath Bank - maho");
  const [accountNo, setAccountNo] = useState("Account No: 0957024788");
  const [name, setName] = useState("Name: Versells Lanka");
  const [description1, setDescription1] = useState(
    "01) Price valid only for 7 days"
  );
  const [description2, setDescription2] = useState(
    "02) Delivery charges are not included"
  );
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [checkedStates, setCheckedStates] = useState(items.map(() => false));
  const [showPopup, setShowPopup] = useState(false);
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isEstimate, setIsEstimate] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customer, setCustomer] = useState([]);

  const handleContainerClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/customer/getallcus")
      .then((response) => {
        const customers = response.data;
        setCustomer(customers);

        if (id == null) {
          if (customers && customers.length > 0) {
            const lastCustomer = customers[customers.length - 1];

            const previousCustomerId = parseInt(lastCustomer.customerNo, 10);
            setPrevCustomerNo(previousCustomerId);
            setCustomerNo(previousCustomerId + 1);
          } else {
            setCustomerNo(1);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, [updateItem]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/item/getallitems")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items", error);
      });
  }, [updateItem]);

  useEffect(() => {
    if (id != null) {
      axios
        .get(`http://localhost:8070/api/customer/getonecus/${id}`)
        .then((response) => {
          console.log(response.data);

          setCustomerNo(response.data.customerNo);
          setCustomerName(response.data.customerName);
          setDate(response.data.date);
          setAddress(response.data.address);
          setPerimeter(response.data.customerInputData.perimeter);
          setNoOfLines(response.data.customerInputData.noOfLines);
          setNoOfCorners(response.data.customerInputData.noOfCorners);
          setNoOfGates(response.data.customerInputData.noOfGates);
          setFenceType(response.data.customerInputData.fenceType);
        })
        .catch((error) => {
          console.error("Error fetching customer", error);
        });
    }
  }, [id]);

  useEffect(() => {
    let totalPrice = subTotal; // Use 'let' to allow reassignment
    let totalDis = 0;

    if (discountPercentage != null && discountRs != null) {
      // Both percentage and fixed discount applied
      const dis1 = subTotal * (discountPercentage / 100);
      totalDis = dis1 + discountRs;
      totalPrice = subTotal - totalDis;
    } else if (discountPercentage != null) {
      // Only percentage discount applied
      totalDis = subTotal * (discountPercentage / 100);
      totalPrice = subTotal - totalDis;
    } else if (discountRs != null) {
      // Only fixed discount applied
      totalDis = discountRs;
      totalPrice = subTotal - discountRs;
    } else {
      totalDis = 0;
      totalPrice = subTotal;
    }

    setDiscount(Number(totalDis)); // Update total discount
    setTotal(totalPrice); // Round to 2 decimal places
    setBalance(paid - totalPrice); // Update balance with rounding
  }, [subTotal, discountPercentage, discountRs, discount, paid]);

  const calculate = () => {
    try {
      const updatedItems = items.map((item) => {
        let amount = 0;
        let quantity = 0;

        if (item.itemId === 1) {
          if (fenceType === "elephants") {
            const qtyGalvanizedWire =
              (perimeter * noOfLines) / 76 + Number(item.value ?? 0);
            quantity = Math.round(qtyGalvanizedWire);
            amount = item.unitPrice * quantity;
          } else if (fenceType === "small animals") {
            const qtyGalvanizedWire =
              (perimeter * noOfLines) / 110 + Number(item.value ?? 0);
            quantity = Math.round(qtyGalvanizedWire);
            amount = item.unitPrice * quantity;
          } else {
            quantity = Math.round(Number(item.value ?? 0));
            amount = item.unitPrice * quantity;
          }
        } else if (item.itemId === 2) {
          const qtyReel =
            (perimeter * noOfLines) / fencePostGap + Number(item.value ?? 0);
          quantity = Math.ceil(qtyReel);
          amount = item.unitPrice * quantity;
        } else if (item.itemId === 3) {
          const qtyPlasticScrew =
            (perimeter * noOfLines) / fencePostGap + Number(item.value ?? 0);
          quantity = Math.ceil(qtyPlasticScrew);
          amount = item.unitPrice * quantity;
        } else if (item.itemId === 4) {
          const qtyBullnose =
            Number(noOfCorners) +
            Number(noOfGates) * 2 * Number(noOfLines) +
            Number(item.value ?? 0);

          quantity = Math.ceil(qtyBullnose);
          amount = item.unitPrice * quantity;
        } else if (item.itemId === 5) {
          const qtyTighterners =
            Number((noOfCorners - 1) * noOfLines) +
            Number(noOfGates * noOfLines * 2) +
            Number(item.value ?? 0);
          quantity = Math.ceil(qtyTighterners);
          amount = item.unitPrice * quantity;
        } else if (item.itemId === 6) {
          const qtySprings = noOfGates * noOfLines;
          quantity = Math.ceil(qtySprings);
          amount = item.unitPrice * quantity;
        } else if (item.itemId === 7) {
          const qtyWarningSignBords = perimeter / 820;
          quantity = Math.ceil(qtyWarningSignBords);
          amount = item.unitPrice * quantity;
        } else {
          quantity = Math.ceil(Number(item.value ?? 0));
          amount = item.unitPrice * quantity;
        }

        return {
          ...item,
          quantity: quantity,
          amount: amount,
        };
      });

      setItems(updatedItems);

      const invoiceItemsList = updatedItems.filter((item) =>
        selectedItems.some((selected) => selected.itemId === item.itemId)
      );
      setInvoiceItems(invoiceItemsList);

      const total = invoiceItemsList.reduce(
        (acc, currentItem) => acc + currentItem.amount,
        0
      );
      setSubTotal(total);
    } catch (error) {
      console.error("Error in calculation", error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    console.log(imageUrl);

    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("itemName", itemName);
    formData.append("unitPrice", unitPrice);
    formData.append("itemUnit", itemUnit);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    try {
      const response = await axios.post(
        "http://localhost:8070/api/item/additem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item added successfully:", response.data);
      setUpdateItem("updated");
      setShowPopup(false);
      setSMessage("Item added successfully!");
      setTimeout(() => {
        setSMessage(null);
      }, 2000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage("Item Id already exists!");
          setTimeout(() => {
            setMessage(null);
          }, 1000);
        } else if (error.response.status === 500) {
          setMessage("Internal Server Error. Please try again later.");
          setTimeout(() => {
            setMessage(null);
          }, 1000);
        } else {
          setMessage(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
          setTimeout(() => {
            setMessage(null);
          }, 1000);
        }
      } else {
        setMessage("Network error. Please check your internet connection.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const EditCustomer = async (e) => {
    e.preventDefault();

    const customerInputData = {
      perimeter,
      noOfLines,
      noOfCorners,
      noOfGates,
      fenceType,
      fencePostGap,
    };

    const paymentMethod = {
      bankName,
      accountNo,
      name,
    };

    const description = {
      description1,
      description2,
      description3,
      description4,
    };

    try {
      const response = await axios.put(
        `http://localhost:8070/api/customer/updatecus/${id}`,
        {
          customerNo,
          customerName,
          address,
          date,
          customerInputData,
          item: invoiceItems,
          paymentMethod,
          description,
          subTotal,
          discount,
          total,
          paid,
          balance,
        }
      );

      console.log("Customer updated successfully:", response.data);
      setIsSave(false);
      setIsEstimate(false);
      setIsDownload(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("Customer not found");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else if (error.response.status === 500) {
          setMessage("Network error. Please check your internet connection.");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          setMessage(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      } else {
        setMessage("Network error. Please check your internet connection.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    const customerInputData = {
      perimeter,
      noOfLines,
      noOfCorners,
      noOfGates,
      fenceType,
      fencePostGap,
    };

    const paymentMethod = {
      bankName,
      accountNo,
      name,
    };

    const description = {
      description1,
      description2,
      description3,
      description4,
    };

    try {
      const response = await axios.post(
        "http://localhost:8070/api/customer/addcus",
        {
          customerNo,
          customerName,
          address,
          date,
          customerInputData: customerInputData,
          item: invoiceItems,
          paymentMethod: paymentMethod,
          description: description,
          subTotal,
          discount,
          total,
          paid,
          balance,
        }
      );
      console.log("Customer added successfully:", response.data);
      setIsSave(false);
      setIsEstimate(false);
      setIsDownload(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("Customer Id already exists!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else if (error.response.status === 500) {
          setMessage("Network error. Please provide correct details..!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          setMessage(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      } else {
        setMessage("Network error. Please check your internet connection.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const openDeleteModal = (id) => {
    setSelectedCustomerId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
  };

  const deleteItem = (id) => {
    axios
      .post("http://localhost:8070/api/item/deleteitem", {
        id: selectedCustomerId,
      })
      .then((response) => {
        setItems(items.filter((item) => item._id !== selectedCustomerId));
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Error deleting module", error);
      });
  };

  const editItem = (item) => {
    setItemName(item.itemName);
    setItemPrice(item.unitPrice);
    setItemDescription(item.description);
  };

  const toggleInvoiceVisibility = () => {
    setIsInvoiceVisible(true);
    setIsSave(true);
  };

  const handleRadioChange = (event) => {
    setFenceType(event.target.value.toLowerCase());
  };

  const handleInputChange = (event, item) => {
    let newValue = event.target.value;

    if (!isNaN(newValue) && newValue !== "") {
      newValue = Number(newValue);

      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.itemId === item.itemId
            ? { ...prevItem, value: newValue }
            : prevItem
        )
      );

      console.log("Updated Item:", {
        ...item,
        value: newValue,
      });
    } else {
      console.error("Invalid value entered:", newValue);
    }
  };

  const handleCheckboxChange = (item, index, isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem.itemId !== item.itemId)
      );
    }
    const updatedStates = [...checkedStates];
    updatedStates[index] = isChecked;
    setCheckedStates(updatedStates);
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const resetForm = () => {
    setCustomerName("");
    setDate("");
    setAddress("");
    setPerimeter(0);
    setNoOfLines(0);
    setNoOfCorners(0);
    setNoOfGates(0);
    setFenceType("");

    setCheckedStates(items.map(() => false));
    setSelectedItems([]);

    setUpdateItem("reset");

    setIsInvoiceVisible(false);
    setIsDownload(false);
    setIsSave(false);
    setIsEstimate(true);
    setBankName("Bank Name: Sampath Bank - maho");
    setAccountNo("Account No: 0957024788");
    setName("Name: Versells Lanka");
    setDescription1("01) Price valid only for 7 days");
    setDescription2( "02) Delivery charges are not included");
    setDescription3("");
    setDescription4("");

    setId(null);
    navigate("/home", { replace: true });
  };

  return (
    <div className="main-container">
      {/*Header*/}
      <Header />

      {/*Body*/}
      <div className="body-container">
        <hr />
        <h3 className="font-h3">Customer Details</h3>
        <div className="cus-data">
          <div className="row">
            <div className="mb-3 col-12 col-lg-5 col-md-10 col-sm-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Customer No :
              </label>
              <input
                type="number"
                className="form-control"
                id="customer-num"
                aria-describedby="emailHelp"
                value={customerNo}
                onChange={(e) => setCustomerNo(e.target.value)}
                required
                readOnly={id !== null}
              />
            </div>
            <div className="mb-3 col-12 col-lg-5 col-md-10 col-sm-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Date :
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="issue-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-12 col-lg-5 col-md-10 col-sm-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Customer Name :
              </label>
              <input
                type="text"
                className="form-control"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-lg-5 col-md-10 col-sm-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Address :
              </label>
              <input
                type="text"
                className="form-control"
                id="customer-address"
                aria-describedby="emailHelp"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button
          className=" manage-button manage"
          onClick={() => navigate("/manage_customer")}
        >
          <MdPeopleAlt style={{ fontSize: "20px", marginRight: "10px" }} />
          Customer List
        </button>
        <hr />

        <h3 className="font-h3">Cost Estimation</h3>
        <div className="form-container">
          <form className="cost-estimation-form">
            <div className="form-group row">
              <label htmlFor="perimeter" className="col-sm-3 col-form-label">
                Perimeter (feet) :
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="perimeter"
                  value={perimeter}
                  onChange={(e) => setPerimeter(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lines" className="col-sm-3 col-form-label">
                Number of lines :
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="noOfLines"
                  value={noOfLines}
                  onChange={(e) => setNoOfLines(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="corners" className="col-sm-3 col-form-label">
                Number of corners :
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="corners"
                  value={noOfCorners}
                  onChange={(e) => setNoOfCorners(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gates" className="col-sm-3 col-form-label">
                Number of gates :
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="gates"
                  value={noOfGates}
                  onChange={(e) => setNoOfGates(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gap" className="col-sm-3 col-form-label">
                Fence Post Gap :
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="gap"
                  value={fencePostGap}
                  onChange={(e) => setFencePostGap(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-label col-sm-3">
                Elephants or Small Animals :
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="animalOptions"
                  id="elephants"
                  value="Elephants"
                  checked={fenceType === "elephants"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="elephants">
                  Elephants{" "}
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="animalOptions"
                  id="smallAnimals"
                  value="Small Animals"
                  checked={fenceType === "small animals"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="smallAnimals">
                  Small Animals
                </label>
              </div>
            </div>
          </form>
          <div>
            <div>
              <div className="dotted-line"></div>
              <div className="row-line">
                <h3 className="items-color">Item List</h3>
                <div className="manage-button" onClick={togglePopup}>
                  <LuCirclePlus style={{ marginRight: "5px" }} /> Add Item
                </div>
              </div>
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              {smessage && (
                <SuccessMessage variant="success">{smessage}</SuccessMessage>
              )}
              {showPopup && (
                <div className="popup-container">
                  <div className="popup-content">
                    {message && (
                      <ErrorMessage variant="danger">{message}</ErrorMessage>
                    )}
                    {smessage && (
                      <SuccessMessage variant="success">
                        {smessage}
                      </SuccessMessage>
                    )}
                    <h3 className="font-h2">Add New Item</h3>
                    <form className="add-item-form" onSubmit={addItem}>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="itemName">ItemId:</label>
                        <input
                          type="number"
                          name="itemId"
                          className="form-control"
                          required
                          onChange={(e) => setItemId(e.target.value)}
                        />
                      </div>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="itemName">Item Name:</label>
                        <input
                          type="text"
                          name="itemName"
                          className="form-control"
                          required
                          onChange={(e) => setItemName(e.target.value)}
                        />
                      </div>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="itemPrice">Item Price:</label>
                        <input
                          type="number"
                          name="itemPrice"
                          className="form-control"
                          required
                          onChange={(e) => setItemPrice(e.target.value)}
                        />
                      </div>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="itemPrice">Item Unit:</label>
                        <input
                          type="text"
                          name="itemUnit"
                          className="form-control"
                          required
                          onChange={(e) => setItemUnit(e.target.value)}
                        />
                      </div>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="exampleFormControlTextarea1">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          rows="3"
                          onChange={(e) => setItemDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div style={{ margin: 5 }}>
                        <label htmlFor="itemImage">Item Image:</label>
                        <input
                          type="file"
                          name="imageUrl"
                          className="form-control"
                          required
                          onChange={(e) => setItemImage(e.target.files[0])}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{ margin: 5 }}
                        className="btn btn-primary"
                      >
                        Add Item
                      </button>
                      <button
                        style={{ margin: 5 }}
                        type="button"
                        className="btn btn-secondary"
                        onClick={togglePopup}
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* Modal for Delete Confirmation */}
            {showDeleteModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <p>Are you sure you want to delete this item?</p>
                  <div className="modal-buttons">
                    <button className="btn btn-danger" onClick={deleteItem}>
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="item-main-container">
              {items.map((item, index) => (
                <div className="item-container" key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      className="item-checkbox"
                      checked={checkedStates[index]}
                      onChange={(e) =>
                        handleCheckboxChange(item, index, e.target.checked)
                      }
                    />
                    <div className="image-section">
                      <img
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="item-image"
                      />
                    </div>
                    <div className="item-details">
                      <span className="item-name">
                        {item.itemId === 1
                          ? fenceType === "elephants"
                            ? `${item.itemName} 2.5 mm`
                            : fenceType === "small animals"
                            ? `${item.itemName} 2 mm`
                            : item.itemName
                          : item.itemName}
                      </span>

                      <span className="item-price">Rs.{item.unitPrice}</span>
                      <span className="item-box-id">
                        Item Id :{item.itemId}
                      </span>
                      {checkedStates[index] && (
                        <div className="item-box">
                          <div className="col-12 col-lg-12 col-md-10 col-sm-12">
                            <label
                              htmlFor="customer-num"
                              className="form-label extra"
                            >
                              {item.itemId === 1 ||
                              item.itemId === 2 ||
                              item.itemId === 3 ||
                              item.itemId === 4 ||
                              item.itemId === 5 ||
                              item.itemId === 6 ||
                              item.itemId === 7
                                ? "Extra Needed :"
                                : "Quantity :"}
                            </label>
                            <input
                              type="number"
                              className="form-control-input"
                              onChange={(e) => handleInputChange(e, item)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="right-section">
                    <button
                      className="btn btn-primary item-edit"
                      onClick={() => handleContainerClick(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <RiEdit2Line
                        className="add-item-edit"
                        onClick={() => editItem(item)}
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                    <button
                      className="btn btn-danger item-del"
                      onClick={() => openDeleteModal(item._id)}
                    >
                      <RiDeleteBin6Line
                        className="add-item-del"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="cal-reset-button"
                
              >
                {isEstimate && (
                  <button
                    type="submit"
                    className="manage-button"
                    onClick={async () => {
                      await calculate();
                      toggleInvoiceVisibility();
                    }}
                  >
                    Calculate & Estimate
                  </button>
                )}
                <button type="reset" className="reset" onClick={resetForm}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && (
          <SuccessMessage variant="success">{smessage}</SuccessMessage>
        )}
        {isDownload && (
          <div className="download-container">
            <PDFDownloadLink
              document={
                <Invoice
                  customerNo={customerNo}
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
              fileName={`Estim-${customerNo}.pdf`}
            >
              <button type="submit" className="btn btn-primary download-button">
                <FaRegFilePdf /> Download Invoice
              </button>
            </PDFDownloadLink>
          </div>
        )}
        {isSave && (
          <button
            type="submit"
            className="btn btn-primary download-button-save"
            onClick={async (event) => {
              event.preventDefault();
              if (id == null) {
                await addCustomer(event);
              } else {
                await EditCustomer(event);
              }
            }}
          >
            <FaRegFilePdf /> Save
          </button>
        )}

        {isInvoiceVisible && (
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
                  <strong>Customer No:</strong> {customerNo}
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
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="bankName"
                      defaultValue={bankName}
                      aria-describedby="emailHelp"
                      onChange={(e) => setBankName(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="accountNo"
                      defaultValue={accountNo}
                      aria-describedby="emailHelp"
                      onChange={(e) => setAccountNo(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="name"
                      defaultValue={name}
                      aria-describedby="emailHelp"
                      onChange={(e) => setName(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                  </div>
                </div>
                <div>
                  <strong>Description</strong>
                  <div className="payment">
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="description1"
                      defaultValue={description1}
                      aria-describedby="emailHelp"
                      onChange={(e) => setDescription1(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="description2"
                      defaultValue={description2}
                      onChange={(e) => setDescription2(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="description3"
                      defaultValue={description3}
                      onChange={(e) => setDescription3(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
                    <input
                      type="text"
                      className="form-control textarea-hidden"
                      id="description4"
                      defaultValue={description4}
                      onChange={(e) => setDescription4(e.target.value)}
                      readOnly={isDownload} // Conditionally set readOnly
                    />
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
                      <td className="discount">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="%"
                          value={discountPercentage || ""}
                          onChange={(e) => {
                            setDiscountPercentage(e.target.value);
                            setDiscountRs("");
                          }}
                          readOnly={isDownload}
                        />

                        <input
                          type="number"
                          className="form-control"
                          placeholder="Rs"
                          value={discountRs || ""}
                          onChange={(e) => {
                            setDiscountRs(e.target.value);
                            setDiscountPercentage("");
                          }}
                          readOnly={isDownload}
                        />
                      </td>
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
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Paid"
                          onChange={(e) => setPaid(e.target.value)}
                          readOnly={isDownload}
                        />
                      </td>
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
        )}
      </div>

      {/*Footer*/}
      <div className="footer-container">
        <div className="part-6">
          <hr />
          <div className="part-6-bottom-footer">
            <div className="contact-item-footer">
              <img
                className="image-footer"
                src="/images/finalbw01-1.png"
                alt="Header of the app"
              />
              <h5 className="company-name-footer">VERSELLS LANKA (PVT) LTD</h5>
            </div>

            <div className="contact-item-footer">
              <div className="footer-details-footer">
                <div className="contact-row">
                  <FaPhone className="icon-footer" />
                  <p className="contact-title-footer">074 34 34 345</p>
                </div>
                <div className="contact-row">
                  <AiOutlineWhatsApp className="icon-footer" />
                  <p className="contact-title-footer">074 34 34 345</p>
                </div>
                <div className="contact-row">
                  <HiOutlineMail className="icon-footer" />
                  <p className="contact-title-footer">info@elephantfence.lk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
