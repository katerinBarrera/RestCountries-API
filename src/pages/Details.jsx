import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Details(state) {
  const { name } = useParams();

  console.log("nombree", name);
  state = useLocation();
  const navigate = useNavigate();
  console.log("aver", state.name);

  const [countries, setCountries] = useState([]);

  const specificCountry = `https://restcountries.com/v3.1/name/${name} `;
  //   Data
  const fetchSpecificCountryData = async () => {
    const response = await fetch(specificCountry);
    const countries = await response.json();
    await setCountries(countries);
    console.log("peruba", countries);
    console.log();
  };

  useEffect(() => {
    fetchSpecificCountryData();
  }, []);

  return (
    <div>
      {countries.map((country) => {
        return (
          <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <div className="w-screen shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
              <div className="flex container mx-auto">
                <h1 className="font-bold text-xl">
                  {" "}
                  More details of {country.name.common}
                </h1>
              </div>
            </div>
            <div className="container mx-auto mb-16">
              <button
                className="px-8 py-2 bg-white text-gray-600 shadow-md dark:bg-gray-700 dark:text-white rounded-lg"
                onClick={() => navigate("/")}
              >
                <i className="fa fa-arrow-left"></i> Back
              </button>
            </div>
            <div className="container flex mx-auto p-8 pl-0 pr-0">
              <img
                src={country.flags.png}
                className="w-1/2 pr-8"
                alt={country.name.common}
              />
              <div className="p-8 pl-8">
                <h2 className="font-bold text-2xl mb-8">
                  {country.name.common}
                </h2>
                <div className="grid grid-cols-2 gap-x-20 gap-y-4">
                  <p>
                    Official Name:
                    <span className="dark:text-gray-400 text-gray-700 text-sm p-2">
                      {country.name.official}
                    </span>
                  </p>
                  <p>
                    Capital:
                    <span className="dark:text-gray-400 text-gray-700 text-sm p-2">
                      {country.capital}
                    </span>
                  </p>
                  <p>
                    Region:
                    <span className="dark:text-gray-400 text-gray-700 text-sm p-2">
                      {country.region}
                    </span>
                  </p>
                  <p>
                    Population:
                    <span className="dark:text-gray-400 text-gray-700 text-sm p-2">
                      {country.population}
                    </span>
                  </p>
                  <p>
                    Area:
                    <span className="dark:text-gray-400 text-gray-700 text-sm p-2">
                      {country.area}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Details;
