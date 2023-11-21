import { React, useState, useEffect } from "react";
import "./PaginationProject.css";
import { Bars } from "react-loader-spinner";

function PaginationProject() {
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const urldata = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=100"
      );
      const res = await urldata.json();
      setData(res);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [data, currentPage]);

  return (
    <>
      <div className="heading">
        <h1>Pagination</h1>
      </div>
      <div className="outer_Div">
        {loading ? (
          <div className="bar">
            <Bars />
          </div>
        ) : (
          paginatedData.map((element) => {
            return (
              <>
                <img key={element.id} src={element.download_url} alt="" />
              </>
            );
          })
        )}
      </div>
      <div className="myButton">
        <button
          onClick={() => {
            currentPage > 1 ? setCurrentPage(currentPage - 1) : "";
          }}
        >
          Pre
        </button>
        <button
          onClick={() => {
            currentPage < 10 ? setCurrentPage(currentPage + 1) : "";
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PaginationProject;
