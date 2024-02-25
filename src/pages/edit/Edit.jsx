import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { enqueueSnackbar, useSnackbar } from "notistack";
import Back from "../../components/Back/Back";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        setLoading(false);
        return;
      }

      if (res.data) {
        setTitle(res.data.title);
        setContent(res.data.description);

        setDueDate(res.data.dueDate);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title,
          description: content,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setLoading(false);
        enqueueSnackbar("Task could not be updated", { variant: "error" });
        return;
      }

      setLoading(false);
      enqueueSnackbar("Task updated successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="create__wrapper">
          <div className="create__container">
            <Back />
            <input
              className="create__title"
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Enter Content"
              className="create__content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="create__bottom">
              <button
                style={{
                  cursor:
                    title === "" || content === "" ? "not-allowed" : "pointer",
                }}
                className="create__add"
                disabled={title === "" || content === ""}
                onClick={handleSubmit}
              >
                <AiOutlinePlus color="white" size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
