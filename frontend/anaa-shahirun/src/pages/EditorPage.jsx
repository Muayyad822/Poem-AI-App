import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PoemEditor from "../components/PoemEditor";
import RhymePanel from "../components/RhymePanel";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(
          `https://poem-ai-app-bjrx.onrender.com/api/poems/${id}`
        );
        setPoem(response.data);
      } catch (error) {
        console.error("Failed to fetch poem:", error);
        navigate("/dashboard");
      }
    };

    fetchPoem();
  }, [id, navigate]);

  const handlePoemUpdate = async (updatedContent) => {
    try {
      await axios.put(
        `https://poem-ai-app-bjrx.onrender.com/api/poems/${id}`,
        { content: updatedContent }
      );
    } catch (error) {
      console.error("Failed to update poem:", error);
    }
  };

  if (!poem) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{poem.title}</h1>
      <PoemEditor initialContent={poem.content} onUpdate={handlePoemUpdate} />
      <RhymePanel/>
    </div>
  );
};

export default EditorPage;
