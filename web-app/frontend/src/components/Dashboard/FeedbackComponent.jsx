import React, { useState, useEffect } from "react";
import axios from "axios";

function FeedbackComponent() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB here
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/feedback");
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.feedbackContainer}>
      <h2 style={styles.header}>User Feedback</h2>
      {feedback.map((feedbackItem) => (
        <div key={feedbackItem._id} style={styles.feedbackItem}>
          <p style={styles.feedbackLabel}>
            <span style={styles.label}>Name:</span>{" "}
            <span style={styles.content}>{feedbackItem.name}</span>
          </p>
          <p style={styles.feedbackLabel}>
            <span style={styles.label}>Title:</span>{" "}
            <span style={styles.content}>{feedbackItem.title}</span>
          </p>
          <p style={styles.feedbackLabel}>
            <span style={styles.label}>Feedback:</span>{" "}
            <span style={styles.content}>{feedbackItem.feedback}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  feedbackContainer: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  feedbackItem: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  feedbackLabel: {
    margin: "0",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: "80px",
  },
  content: {
    marginLeft: "10px",
  },
};

export default FeedbackComponent;
