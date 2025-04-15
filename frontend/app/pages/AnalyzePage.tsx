import React, { useState } from "react";
import axios from "axios";

const AnalyzePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/analyze-resume"
          : "/api/analyze-resume";

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(response.data.suggestions || "File uploaded successfully!");
      setError(null);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred while uploading the file.");
      } else {
        setError("An unexpected error occurred.");
      }
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Analyze Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {response && <p style={{ color: "green" }}>Response: {response}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default AnalyzePage;