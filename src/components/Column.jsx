// Assuming your Column.js has a structure like this - adapt as needed
import React from "react"
import { useDrag, useDrop } from "react-dnd"
import Post from "./Post"
// Import other dependencies as needed

const Column = ({ column, index, searchTerm, onRemove, onMove, onInteraction, isMobile }) => {
  // Keep your existing useDrag and useDrop logic, but only enable it on desktop
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index },
    canDrag: !isMobile, // Prevent dragging on mobile
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: "COLUMN",
    hover: (item) => {
      if (item.index !== index) {
        onMove(item.index, index)
        item.index = index
      }
    },
    canDrop: !isMobile, // Prevent dropping on mobile
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  // Filter posts based on search
  const filteredPosts = column.posts
    ? column.posts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <div
      ref={(node) => !isMobile && drag(drop(node))}
      className={`column ${isDragging ? "dragging" : ""} ${isOver ? "drop-target" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="column-header">
        <h2>{column.type}</h2>
        <button 
          onClick={() => onRemove(column.id)} 
          className="remove-column-btn"
          aria-label={`Remove ${column.type} column`}
        >
          ×
        </button>
      </div>

      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">No posts to display</div>
        ) : (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onInteraction={(action) => onInteraction(column.id, post.id, action)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Column