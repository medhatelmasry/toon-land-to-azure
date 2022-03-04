import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import ToonList from "../components/ToonList";
import NotFoundPage from "./NotFoundPage";

const ToonDetailPage = () => {
  const { id } = useParams();

  const [toonInfo, setToonInfo] = useState({
    votes: 0,
    id: 0,
    firstName: "",
    lastName: "",
  });

  // instead of just randomly geterating a number, I need to read data from an API endpoint
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api4all.azurewebsites.net/api/people/${id}`
      );
      const body = await result.json();
      setToonInfo(body);
      //console.log(body);
    };
    fetchData();
  }, [id]);

  if (!toonInfo) return <NotFoundPage />;

  return (
    <React.Fragment>
      <p>This cartoon character has received {toonInfo.votes} votes.</p>

      <h4 className="text-info">
        {toonInfo.id}. {toonInfo.firstName} {toonInfo.lastName}
      </h4>
      <table style={{ width: "90%", margin: "auto" }}>
        <tbody>
          <tr>
            <td style={{ width: "15%", verticalAlign: "top" }}>
              <img
                className="rounded img-responsive pull-right img-thumbnail float-left"
                style={{ width: "50%" }}
                src={`${toonInfo.pictureUrl}`}
                alt={`${toonInfo.firstName} ${toonInfo.lastName}`}
              />
            </td>
            <td style={{ height: "80px", verticalAlign: "top" }}>
              <p>
                <b>Occupation: </b>
                {toonInfo.occupation}
              </p>
              <p>
                <b>Gender: </b>
                {toonInfo.gender}
              </p>
            </td>

            <td style={{ width: "20%", verticalAlign: "top" }}>
              <h3>Others:</h3>
              <ToonList exceptId={toonInfo.id} />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ToonDetailPage;
