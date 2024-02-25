import React, { useState } from "react";
import "./Create.css";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import Back from "../../components/Back/Back";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/create`,
        {
          title: title,
          description: content,
          dueDate: dueDate,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setLoading(false);
        enqueueSnackbar("Task could not be created", { variant: "error" });
        return;
      }

      navigate("/");
      enqueueSnackbar("Task created successfully", { variant: "success" });
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
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Enter Content"
              className="create__content"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                className="create__date"
                type="date"
                name="dueDate"
                id="dueDate"
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

export default CreateTask;
