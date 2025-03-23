// Utility to simulate fetching posts from a backend
export const simulateNewPosts = async (columnType, count = 1) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = []

      for (let i = 0; i < count; i++) {
        posts.push(generateRandomPost(columnType))
      }

      resolve(posts)
    }, 300) // Simulate network delay
  })
}

// Generate a random post for simulation
const generateRandomPost = (columnType) => {
  const postId = Math.floor(Math.random() * 100000)
  const timestamp = new Date() // Current time for new posts

  // Sample users with better profile pictures
  const users = [
    {
      username: "techguru",
      displayName: "Tech Guru",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      username: "newsupdate",
      displayName: "News Update",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      username: "codingwizard",
      displayName: "Coding Wizard",
      profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      username: "designmaster",
      displayName: "Design Master",
      profilePicture: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      username: "startupfounder",
      displayName: "Startup Founder",
      profilePicture: "https://randomuser.me/api/portraits/men/91.jpg",
    },
  ]

  // Sample content templates
  const contentTemplates = {
    Home: [
      "Just launched our new product! Check it out at example.com #excited",
      "Working on a new feature today. Can't wait to share it with everyone!",
      "Great meeting with the team. Lots of exciting ideas in the pipeline!",
      "Looking for recommendations for good coding tutorials. Any suggestions?",
      "Happy to announce we've hit 1 million users today! Thanks for the support!",
    ],
    Mentions: [
      "@techguru thanks for the shoutout!",
      "Hey @codingwizard, what do you think about the new React update?",
      "@startupfounder I'd love to collaborate on your project!",
      "Thanks @designmaster for the amazing UI tips!",
      "@newsupdate can you cover our event next week?",
    ],
    Search: [
      "The latest #JavaScript framework looks promising!",
      "Just found a great resource for #WebDesign",
      "Anyone else experiencing issues with the new #iOS update?",
      "Sharing my thoughts on #AI and machine learning trends",
      "My review of the new MacBook Pro #Apple #Tech",
    ],
    Lists: [
      "Added some new developers to my coding list",
      "Updated my tech news sources list with 5 new accounts",
      "Created a new list for UX/UI inspiration",
      "My startup founders list is growing fast!",
      "Check out my curated list of tech influencers",
    ],
    Trending: [
      "#TechConference2025 is trending and it looks amazing!",
      "Everyone's talking about the new AI breakthrough #MachineLearning",
      "The startup scene is booming! #VentureCapital #Funding",
      "New programming language taking the web by storm #WebDev",
      "Major announcement from Google today! #Google #Tech",
    ],
    Bookmarks: [
      "Bookmarked this great article on React performance optimization",
      "Saving this thread on startup funding advice for later",
      "Great tutorial on advanced CSS techniques - definitely worth bookmarking",
      "This AI research paper is fascinating! Adding to my reading list",
      "Bookmarked this comprehensive guide to modern JavaScript",
    ],
  }

  // Get content based on column type or use default
  const contentOptions = contentTemplates[columnType] || contentTemplates["Home"]
  const content = contentOptions[Math.floor(Math.random() * contentOptions.length)]

  // Random user
  const user = users[Math.floor(Math.random() * users.length)]

  // Random like and retweet counts
  const likes = Math.floor(Math.random() * 500)
  const retweets = Math.floor(Math.random() * 200)

  return {
    id: postId,
    user,
    content,
    timestamp,
    likes,
    retweets,
    category: columnType,
    liked: false,
    retweeted: false,
  }
}

