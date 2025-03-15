import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PoemEditor from "../components/PoemEditor";
import RhymePanel from "../components/RhymePanel";
import { AuthContext } from "../context/AuthContext";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchPoem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/poems/${id}`, {
          withCredentials: true
        });
        setPoem(response.data);
      } catch (error) {
        console.error("Failed to fetch poem:", error);
        navigate("/dashboard");
      }
    };

    fetchPoem();
  }, [id, user, navigate]);

  const handlePoemUpdate = async (updatedContent) => {
    try {
      await axios.put(`http://localhost:5000/api/poems/${id}`, {
        content: updatedContent
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Failed to update poem:", error);
    }
  };

  if (!poem) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{poem.title}</h1>
      <PoemEditor initialContent={poem.content} onUpdate={handlePoemUpdate} />
      <RhymePanel word="شمس" />
    </div>
  );
};

export default EditorPage;