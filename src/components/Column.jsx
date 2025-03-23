"use client"

import { useState } from "react"
import Post from "./Post"
import { useDrag, useDrop } from "react-dnd"

const Column = ({ column, index, searchTerm, onRemove, onMove, onInteraction }) => {
  const [columnFilter, setColumnFilter] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Set up drag and drop for column reordering
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item) {
      if (item.index !== index) {
        onMove(item.index, index)
        item.index = index
      }
    },
  })

  // Ensure posts is always an array, even if it's undefined
  const posts = column.posts || []

  // Filter posts based on search term and column filter
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.displayName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesColumnFilter =
      columnFilter === "" ||
      post.content.toLowerCase().includes(columnFilter.toLowerCase()) ||
      post.user.username.toLowerCase().includes(columnFilter.toLowerCase()) ||
      post.user.displayName.toLowerCase().includes(columnFilter.toLowerCase())

    return matchesSearch && matchesColumnFilter
  })

  // Simulate loading when filtering
  const handleFilterChange = (e) => {
    const value = e.target.value
    setIsLoading(true)
    setColumnFilter(value)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`column ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="column-header">
        <h2>{column.type}</h2>
        <div className="column-controls">
          <input
            type="text"
            placeholder={`Filter ${column.type}...`}
            value={columnFilter}
            onChange={handleFilterChange}
            className="column-filter"
            aria-label={`Filter ${column.type} posts`}
          />
          <button
            className="remove-column-btn"
            onClick={() => onRemove(column.id)}
            aria-label={`Remove ${column.type} column`}
          >
            &times;
          </button>
        </div>
      </div>

      <div className="posts-container">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onInteraction={(postId, action) => onInteraction(column.id, postId, action)}
            />
          ))
        ) : (
          <div className="no-posts">No posts found</div>
        )}
      </div>
    </div>
  )
}

export default Column

