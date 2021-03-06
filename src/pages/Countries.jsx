import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();

  //   Data
  const fetchCountryData = async () => {
    const response = await fetch(url);
    const countries = await response.json();
    await setCountries(countries);
    // console.log(countries);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  //  Filter

  const searchCountry = () => {
    const term = countriesInputRef.current.value;

    if (term.trim()) {
      const fetchSearch = async () => {
        const res = await fetch(`https://restcountries.com/v3.1/name/${term}`);
        const data = await res.json();

        setCountries(data);
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchCountryData();
    }
  };

  // TABLE

  const columns = [
    { id: "country", label: "Country", minWidth: 170 },
    { id: "capital", label: "Capital", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "details",
      label: "Details",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(country, capital, population, details) {
    return { country, capital, population, details };
  }

  const rows = countries.map((country, index) => {
    let name = country.name.common;
    return createData(
      country.name.common,
      country.capital,
      country.population,
      <div>
        <Link to={{ pathname: `details/${name}`, state: country }} key={index}>
          <button className="font-bold  text-gray-500 transition  ease-out duration-300 ">
            More info
          </button>
        </Link>
      </div>
    );
  });
  console.log("fila", rows);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div>
        <div className="m-4">
          <label className="m-4 font-semibold text-xl">Do you research </label>
          <input
            type="text"
            placeholder="Search for a country..."
            className="pl-10 p-2 shadow-md rounded-md w-1/3 dark:bg-gray-700 outline-none focus:outline-indigo-500"
            onChange={(term) => searchCountry(term.target.value)}
            ref={countriesInputRef}
          />
        </div>

        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="mb-10 text-center"
        >
          <TableContainer sx={{ maxHeight: 1300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className="text-2xl font-medium">
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: 20,
                        fontWeight: 500,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Countries;
