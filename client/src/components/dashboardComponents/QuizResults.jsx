import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../assets/loader.svg";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "../../styles/quizResults.css";

const QuizResults = ({ quizID, setShowQuizResults }) => {
  const [quizResults, setQuizResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllQuizzes = async () => {
    setIsLoading(true);
    const results = await axios.get(`/getAllQuizResults/${quizID}`);
    setQuizResults(results.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const downloadFile = () => {
    let downloadFileData = [];
    quizResults.forEach((result) => {
      let attemptDate = new Date(result.attemptOn).toLocaleString();
      const data = {
        student_name: result.studentName,
        score: result.studentScore,
        attempted_on: attemptDate,
      };
      downloadFileData.push(data);
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(downloadFileData);
    XLSX.utils.book_append_sheet(workbook, worksheet, quizID);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(excelData, "data.xlsx");
  };

  return (
    <>
      {isLoading && <img src={Loader} alt="loading data" className="loading" />}
      {!isLoading && !quizResults?.length && (
        <p className="noResults">No Results to Display</p>
      )}
      {!isLoading && (
        <div className="quizResultsContainer">
          <div className="actionBtnContainer">
            <button
              onClick={() => setShowQuizResults(false)}
              className="closeBtn"
            >
              close
            </button>
            <button className="downloadXLSX" onClick={() => downloadFile()}>
              Download File
            </button>
          </div>
          <p>Attempts: {quizResults?.length}</p>
          <div className="quizResults">
            <table className="resultsTable">
              <thead>
                <tr className="tableHeader">
                  <th>Student Name</th>
                  <th>Student Score</th>
                  <th>Attempted On</th>
                </tr>
              </thead>
              <tbody>
                {quizResults?.map((result) => {
                  const attempt = new Date(result.attemptOn).toLocaleString();
                  return (
                    <tr key={result._id} className="tableRecord">
                      <td>{result.studentName}</td>
                      <td>{result.studentScore}</td>
                      <td>{attempt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizResults;
