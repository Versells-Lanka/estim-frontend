import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage.js";
import SuccessMessage from "./SuccessMessage.js";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/api/item/getitem/${id}`
        );
        setItem(response.data);
        setImage(response.data.imageUrl);
        setLoading(false);
      } catch (err) {
        setMessage("Failed to fetch item details. Please try again.");
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, image]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    } else {
      setNewImage(item.image);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("itemId", item.itemId);
    formData.append("itemName", item.itemName);
    formData.append("unitPrice", item.unitPrice);
    formData.append("itemUnit", item.itemUnit);
    formData.append("description", item.description);
    formData.append("imageUrl", newImage);

    try {
      await axios.put(
        `http://localhost:8070/api/item/updateitem/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newImageUrl = URL.createObjectURL(newImage);
      setImage(newImageUrl);
      setEditMode(false);
      setSMessage("Item details updated successfully!");
      setTimeout(() => {
        setSMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to update item:", err);
      setMessage("Failed to update item! Please choose item image.");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="item-page-container">
      <div className="des-header-container">
        <div className="right-section">
          <div className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">
              <IoMdArrowBack />
            </span>
            <h5 className="back-text">Back</h5>
          </div>
        </div>
        <div className="des-name">Item Details</div>
      </div>

      <div className="item-des-container">
        <button
          className="manage-button"
          onClick={() => setEditMode((prev) => !prev)}
        >
          <RiEdit2Line style={{ fontSize: "20px", marginRight: "5px" }} />
          {editMode ? "Cancel" : "Edit Item"}
        </button>
      </div>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
      <div className="item-des-container">
        <div className="item-des-image">
          {editMode ? (
            <>
              <input
                type="file"
                name="imageUrl"
                onChange={handleImageChange}
                className="editable-input"
              />
              {newImage && <p>{newImage.name}</p>}{" "}
              {/* Show image name if it's selected */}
            </>
          ) : (
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="product-img"
            />
          )}
        </div>
        <div className="item-des-details">
          <p className="item-id">Item ID: {item.itemId}</p>
          <h1 className="item-des-title">
            {editMode ? (
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={handleInputChange}
                className="editable-input"
              />
            ) : (
              item.itemName
            )}
          </h1>
          <p className="item-price">
            {editMode ? (
              <input
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={handleInputChange}
                className="editable-input"
              />
            ) : (
              `Rs.${item.unitPrice.toLocaleString()}`
            )}
          </p>
          <p className="item-unit">
            {editMode ? (
              <input
                type="text"
                name="itemUnit"
                value={item.itemUnit}
                onChange={handleInputChange}
                className="editable-input"
              />
            ) : (
              `Item Unit: ${item.itemUnit.toLocaleString()}`
            )}
          </p>
          <div className="item-category">
            <strong>Description:</strong>{" "}
            {editMode ? (
              <textarea
                name="description"
                value={item.description}
                onChange={handleInputChange}
                className="editable-textarea"
              />
            ) : (
              item.description
            )}
          </div>
          {editMode && (
            <div className="action-buttons">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
