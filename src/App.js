"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Column from "./components/Column"
import AddColumnModal from "./components/AddColumnModal"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { simulateNewPosts } from "./utils/dataSimulator"

function App() {
  // State to manage columns
  const [columns, setColumns] = useState([
    { id: 1, type: "Home", posts: [] },
    { id: 2, type: "Mentions", posts: [] },
  ])

  // State for showing add column modal
  const [showAddModal, setShowAddModal] = useState(false)

  // State for global search
  const [searchTerm, setSearchTerm] = useState("")

  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with sample data on mount
  useEffect(() => {
    // Load initial data for each column
    const initialData = async () => {
      setIsLoading(true)

      const updatedColumns = [...columns]

      for (let i = 0; i < updatedColumns.length; i++) {
        const column = updatedColumns[i]
        // Simulate fetching data for this column type
        const posts = await simulateNewPosts(column.type, 10)
        updatedColumns[i] = { ...column, posts }
      }

      setColumns(updatedColumns)
      setIsLoading(false)
    }

    initialData()

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      const updateColumns = async () => {
        const updatedColumns = await Promise.all(
          columns.map(async (column) => {
            // Simulate getting 0-2 new posts every interval
            const newPosts = await simulateNewPosts(column.type, Math.floor(Math.random() * 3))
            return {
              ...column,
              posts: [...newPosts, ...(column.posts || [])].slice(0, 50), // Keep max 50 posts per column
            }
          }),
        )
        setColumns(updatedColumns)
      }

      updateColumns()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle adding a new column
  const handleAddColumn = (columnType) => {
    const newColumn = {
      id: Date.now(), // Use timestamp for unique ID
      type: columnType,
      posts: [],
    }

    setIsLoading(true)

    // Simulate fetching initial data for the new column
    simulateNewPosts(columnType, 10).then((posts) => {
      setColumns([...columns, { ...newColumn, posts }])
      setIsLoading(false)
    })

    setShowAddModal(false)
  }

  // Handle removing a column
  const handleRemoveColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId))
  }

  // Handle column reordering
  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...columns]
    const [movedColumn] = updatedColumns.splice(fromIndex, 1)
    updatedColumns.splice(toIndex, 0, movedColumn)
    setColumns(updatedColumns)
  }

  // Handle post interaction (like, retweet)
  const handlePostInteraction = (columnId, postId, action) => {
    setColumns(
      columns.map((column) => {
        if (column.id !== columnId) return column

        return {
          ...column,
          posts: (column.posts || []).map((post) => {
            if (post.id !== postId) return post

            if (action === "like") {
              return {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
              }
            } else if (action === "retweet") {
              return {
                ...post,
                retweets: post.retweeted ? post.retweets - 1 : post.retweets + 1,
                retweeted: !post.retweeted,
              }
            }
            return post
          }),
        }
      }),
    )
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  console.log("showAddModal:", showAddModal) // Debug log

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <header className="app-header">
          <h1>Social Media Dashboard</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search all columns..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
              aria-label="Search all columns"
            />
          </div>
          <button
            className="add-column-btn"
            onClick={() => {
              console.log("Add Column button clicked")
              setShowAddModal(true)
            }}
            aria-label="Add new column"
          >
            Add Column
          </button>
        </header>

        <main className="columns-container">
          {isLoading && columns.length === 0 ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            columns.map((column, index) => (
              <Column
                key={column.id}
                column={column}
                index={index}
                searchTerm={searchTerm}
                onRemove={handleRemoveColumn}
                onMove={moveColumn}
                onInteraction={handlePostInteraction}
              />
            ))
          )}

          {!isLoading && columns.length === 0 && (
            <div className="no-posts">No columns added. Click "Add Column" to get started.</div>
          )}
        </main>

        {showAddModal && (
          <AddColumnModal
            onClose={() => {
              console.log("Modal closed")
              setShowAddModal(false)
            }}
            onAdd={handleAddColumn}
          />
        )}
      </div>
    </DndProvider>
  )
}

export default App

