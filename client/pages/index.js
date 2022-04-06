import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses`);
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <>
      <div className="jumbotron bg-primary">
        <h1 className="text-center square" style={{ color: "white" }}>
          Master In-Demand Coding Skills Online
        </h1>
        <p className="text-center square">
          Be the best by taking courses anywhere you are
        </p>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          {courses.map((course) => (
            <div key={course._id} className="col-md-3">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
