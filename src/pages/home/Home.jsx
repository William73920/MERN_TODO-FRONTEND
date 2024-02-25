import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoIosCheckbox } from "react-icons/io";
import Search from "../../components/search/Search";
import Loader from "../../components/Loader/Loader";
import { useSnackbar } from "notistack";

const Home = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [ascending, setAscending] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchNotes = async () => {
    setLoadingTask(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks`, {
        withCredentials: true,
      });
      if (res.data.success === false) {
        console.log(res.data.message);
        setLoadingTask(false);
        return;
      }

      if (res.data) {
        setNotes(res.data);
        setLoadingTask(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingTask(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      fetchNotes();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "error" });
        return;
      }

      enqueueSnackbar("Task deleted successfully", { variant: "success" });

      fetchNotes();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const handleComplete = async (note) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${note._id}`,
        {
          title: note.title,
          description: note.description,
          completed: !note.completed,
        },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success === false) {
        console.log(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "error" });
        return;
      }

      fetchNotes();
      if (note.completed) {
        enqueueSnackbar("Task marked incomplete successfully", {
          variant: "info",
        });
      } else {
        enqueueSnackbar("Task marked completed successfully", {
          variant: "info",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <div className="home__container">
      <Header />
      <Search
        ascending={ascending}
        setAscending={setAscending}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div className="home__notes-container">
        {loading ? (
          <Loader />
        ) : (
          notes
            ?.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              if (ascending) {
                return dateA - dateB;
              } else {
                return dateB - dateA;
              }
            })
            .filter((note) => note.title.toLowerCase().includes(searchText))
            .map((note) => (
              <div
                key={note._id}
                className="home__note-container"
                style={{
                  textDecoration:
                    note.completed === true ? "line-through" : "none",
                }}
              >
                <div className="home__note-info">
                  <h2> {note.title}</h2>
                  <p>{note.description}</p>
                </div>
                {note.dueDate && (
                  <p className="home__note-date">
                    <label htmlFor="">Due Date:</label>
                    {formatDate(note.dueDate)}
                  </p>
                )}

                <div className="button__container">
                  <button onClick={() => handleDelete(note._id)}>
                    <MdDelete size={25} style={{ color: "red" }} />
                  </button>
                  <button onClick={() => navigate(`/edit/${note._id}`)}>
                    <FaRegEdit size={25} style={{ color: "blue" }} />
                  </button>
                  <button onClick={() => handleComplete(note)}>
                    {note.completed === true ? (
                      <IoIosCheckbox size={25} style={{ color: "green" }} />
                    ) : (
                      <IoCheckboxOutline size={25} color="black" />
                    )}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
