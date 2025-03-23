"use client"
import { formatDistance } from "date-fns"

const Post = ({ post, onInteraction }) => {
  // Calculate relative time (e.g., "5 minutes ago")
  const timeAgo = formatDistance(new Date(post.timestamp), new Date(), { addSuffix: true })

  // Check if this is a new post (less than 30 seconds old)
  const isNew = Date.now() - new Date(post.timestamp).getTime() < 30000

  return (
    <div className={`post ${isNew ? "new-post" : ""}`}>
      <div className="post-user">
        <img
          src={post.user.profilePicture || "/placeholder.svg"}
          alt={`${post.user.username}'s profile`}
          className="profile-picture"
        />
        <div className="user-info">
          <span className="user-name">{post.user.displayName}</span>
          <span className="user-handle">@{post.user.username}</span>
        </div>
        <span className="post-time">{timeAgo}</span>
      </div>

      <div className="post-content">{post.content}</div>

      <div className="post-actions">
        <button
          className={`action-btn like-btn ${post.liked ? "active" : ""}`}
          onClick={() => onInteraction(post.id, "like")}
          aria-label={post.liked ? "Unlike" : "Like"}
        >
          <span className="icon">♥</span>
          <span className="count">{post.likes}</span>
        </button>

        <button
          className={`action-btn retweet-btn ${post.retweeted ? "active" : ""}`}
          onClick={() => onInteraction(post.id, "retweet")}
          aria-label={post.retweeted ? "Undo Retweet" : "Retweet"}
        >
          <span className="icon">↻</span>
          <span className="count">{post.retweets}</span>
        </button>
      </div>
    </div>
  )
}

export default Post

