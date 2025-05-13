import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filters, setFilterUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [userData, setUserData] = useState({ movie: "", rating: "", genre: "" });

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (t) => {
    const searchText = t.target.value.toLowerCase();
    const filteredResults = users.filter(
      (user) =>
        user.movie.toLowerCase().includes(searchText) ||
        user.genre.toLowerCase().includes(searchText) ||
        user.rating.toLowerCase().includes(searchText)
    );
    setFilterUsers(filteredResults);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this movie?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        getAllUsers();
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const handleAddUsers = () => {
    setUserData({ movie: "", rating: "", genre: "" });
    setIsEditMode(false);
    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setUserData({ movie: user.movie, rating: user.rating, genre: user.genre });
    setEditId(user.id);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleData = (t) => {
    setUserData({ ...userData, [t.target.name]: t.target.value });
  };

  const handleSubmit = async (t) => {
    t.preventDefault();
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:5000/users/${editId}`, userData);
      } else {
        await axios.post("http://localhost:5000/users", userData);
      }
      getAllUsers();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting movie:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h3>MOVIE RATINGS</h3>
        <div className="input-search">
          <input type="search" placeholder="Search movies..." onChange={handleSearch} />
          <button className="bt A" onClick={handleAddUsers}>ADD MOVIES</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Movie</th>
              <th>Rating</th>
              <th>Genre</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filters && filters.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.movie}</td>
                <td>{user.rating}</td>
                <td>{user.genre}</td>
                <td>
                  <button className="bt s" onClick={() => handleEdit(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="bt G">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
              <h2>{isEditMode ? "Edit Movie" : "Add Movie"}</h2>
              <div className="inputgroup">
                <label htmlFor="movie">Movie Name:</label>
                <input type="text" value={userData.movie} name="movie" id="movie" onChange={handleData} />
              </div>
              <div className="inputgroup">
                <label htmlFor="rating">Rating:</label>
                <input type="number" value={userData.rating} name="rating" id="rating" onChange={handleData} />
              </div>
              <div className="inputgroup">
                <label htmlFor="genre">Genre:</label>
                <input type="text" value={userData.genre} name="genre" id="genre" onChange={handleData} />
              </div>
              <button className="bt s" onClick={handleSubmit}>
                {isEditMode ? "Update Movie" : "Add Movie"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;