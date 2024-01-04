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
    <div>
      {feedback.map((feedbackItem) => (
        <div key={feedbackItem._id}>
          <p>Name: {feedbackItem.name}</p>
          <p>Title: {feedbackItem.title}</p>
          <p>feedback: {feedbackItem.feedback}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackComponent;
