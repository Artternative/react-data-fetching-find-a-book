import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
function App() {
  const [inputData, setinputData] = useState("");
  const [bookData, setbookData] = useState([]);
  
  useEffect(() => {
    if(inputData.trim() !== "") {
      getBook(inputData);
    }else {
      setbookData([]);
    }
  }, [inputData]);

  const getBook = async () => {
    try {
      const result = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=<query-param-value>"
      );
      setbookData(result.data.items || []);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", error.message);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Find a Book</h1>
        <DebounceInput
        minLength={2}
          type="text"
          value={inputData}
          debounceTimeout={500}
          onChange={(event) => {
            setinputData(event.target.value);
          }}
        />
        <div className="booklist">
          <ul>
            {bookData.map((item, index) => {
              const volumeInfo = item.volumeInfo;
              return (
                 <li key={index}>
                  <strong>{volumeInfo.title}</strong>   
                 </li>
                );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
