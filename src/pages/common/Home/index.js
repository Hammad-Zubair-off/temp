import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div className="home-container">
        <PageTitle title={`Hi ${user.name}, Status to IlmHub an online exam platform`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col xs={24} sm={12} md={8} lg={6} key={exam._id}>
              <div className="card-lg flex flex-col gap-1 p-2 h-full">
                <h1 className="text-2xl text-ellipsis overflow-hidden">{exam?.name}</h1>
                <h1 className="text-md">Category: {exam.category}</h1>
                <h1 className="text-md">Total Marks: {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks: {exam.passingMarks}</h1>
                <h1 className="text-md">Duration: {exam.duration}</h1>
                <div className="mt-auto pt-2">
                  <button
                    className="primary-outlined-btn w-full"
                    onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;