"use client"

import { useState } from "react"

const AddColumnModal = ({ onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState("Home")
  const columnTypes = ["Home", "Mentions", "Search", "Lists", "Trending", "Bookmarks"]

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    onAdd(selectedType)
    onClose()
  }

  // Custom styles to match the dark theme with better spacing
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      backgroundColor: '#1a2231',
      width: '400px',
      maxWidth: '90%',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      padding: '20px' // Add padding to the entire modal
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px', // Add space below header
      paddingBottom: '15px', // Add padding inside the header
      borderBottom: '1px solid #2d3748'
    },
    body: {
      padding: '0 10px', // Add horizontal padding
      marginBottom: '25px' // Add space below the body
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: '15px', // Add padding inside the footer
      borderTop: '1px solid #2d3748',
      gap: '10px' // Space between buttons
    },
    select: {
      backgroundColor: '#2d3748',
      color: 'white',
      border: '1px solid #4a5568',
      borderRadius: '4px',
      padding: '8px 12px',
      width: '100%',
      marginTop: '8px' // Space below label
    },
    label: {
      color: '#cbd5e0',
      marginBottom: '8px',
      display: 'block'
    },
    cancelBtn: {
      backgroundColor: '#2d3748',
      color: '#cbd5e0',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    addBtn: {
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: '#a0aec0',
      fontSize: '22px',
      cursor: 'pointer'
    }
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h3 style={{ margin: 0, color: 'white', fontWeight: 500 }}>Add New Column</h3>
          <button
            style={modalStyles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div style={modalStyles.body}>
          <label htmlFor="column-type" style={modalStyles.label}>
            Column Type:
          </label>
          <select
            id="column-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={modalStyles.select}
          >
            {columnTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div style={modalStyles.footer}>
          <button
            type="button"
            onClick={onClose}
            style={modalStyles.cancelBtn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={modalStyles.addBtn}
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddColumnModal