import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ToonList = (param) => {
  // will read exceptId from param here
  // var others = toons;
  // if (param != undefined) {
  //   others = toons.filter((p) => p.id !== param.exceptId);
  // }

  const [toonInfo, setToonInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api4all.azurewebsites.net/api/people/`
      );
      const body = await result.json();
      setToonInfo(body);
    };
    fetchData();
  }, []);

  var others = toonInfo;

  if (param !== undefined) {
    others = Object.values(toonInfo).filter((p) => p.id !== +param.exceptId);
  }

  return (
    <React.Fragment>
      {others.map((person, key) => (
        <Link key={key} to={`/detail/${person.id}`}>
          <h6>
            {person.id} {person.firstName} {person.lastName}
          </h6>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default ToonList;
