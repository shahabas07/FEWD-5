import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/Kalvium-Logo.png";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getbook() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error(error);
      }
    }
    getbook();
  }, []);

  const filteredBooks = books.filter((book) => {
    if (search === "") {
      return true;
    }
    const heads = book.heads.toLowerCase();
    return heads.includes(search.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {/* -------------header-------- */}
      <div className="flex z-10 justify-between sticky top-0  px-5 py-5 max-w-screen bg-gray-300 ">
        <div
          onClick={() => window.location.reload()}
          className="flex cursor-pointer "
        >
          <img className="h-9  " src={Logo} />
          <span className="text-red-500 text-3xl font-bold hidden sm:block ">
            KalviumBooks
          </span>
        </div>
        <div className="flex ">
          <input
            className="ml-2 w-full sm:w-1/2 h-10 bg-green-100 pl-3 outline-none rounded-l italic"
            type="text"
            placeholder="Books;"
            value={search}
            onChange={handleSearch}
          />

          <button className="w-10 h-10 rounded-r bg-green-100 flex items-center justify-center">
            <SearchIcon />
          </button>
        </div>
        <NavLink to="/register">
          <button className="px-1 py-1 ml-2 mt-1 mr-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 font-bold">
            Register
          </button>
        </NavLink>
      </div>
      {/* ------------page---------- */}
      <h2 className="font-bold px-9 mt-3  text-lg ">Recommended Books:</h2>
      <div className="flex justify-center  flex-wrap gap-1 mb-5 mt-3">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-slate-300 cursor-pointer rounded text-center mb-1 mr-1 px-3 py-3 w-60 h-55 hover:bg-gray-200 relative hover:scale-105 transform transition-transform duration-300 ease-in-out    "
          >
            <div className="h-40 flex justify-center items-center mb-3">
              <img
                src={book.imageLinks.thumbnail}
                alt={book.heads}
                className=" mt-20  w-30 rounded"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-medium text-gray-800 mt-20 mb-2">
                {book.heads}
              </p>
              <p className="text-sm text-gray-600">{book.authors.join(", ")}</p>
              <p className="text-sm text-gray-500">{book.averageRating}/5 ★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
