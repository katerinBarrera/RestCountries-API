import React, { useEffect, useState } from "react";
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

  const searchCountry = async (term) => {
    if (term.length < 1 || term === "") return;
    const res = await fetch(`https://restcountries.com/v3.1/name/${term}`);
    const data = await res.json();
    console.log(data);
    await setCountries(data);
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

        {/* <table
          className="table-auto border-4 mt-4 border-double"
          id="datatable"
        >
          <thead>
            <tr>
              <th>País</th>
              <th>Capital</th>
              <th>Población</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => {
              let name = country.name.common;
              return (
                <tr key={index} className="m-2">
                  <td className="p-2">{country.name.common}</td>
                  <td className="p-2">{country.capital}</td>
                  <td className="p-2">{country.population}</td>
                  <td className="p-2">
                    <Link
                      to={{ pathname: `details/${name}`, state: country }}
                      key={index}
                    >
                      <button className="font-bold  text-gray-900 ">
                        Más Detalles
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default Countries;

// const Countries = () => {
//   const [open, setOpen] = useState(false);
//   const [countries, setCountries] = useState([]);

//   const fetchCountryData = async () => {
//     const response = await fetch(url);
//     const countries = await response.json();
//     setCountries(countries);
//     console.log(countries);
//   };
//   useEffect(() => {
//     fetchCountryData();
//   }, []);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const CountryDialog = ({ flag, name, key }) => {
//     return (
//       <div>
//         <Dialog onClose={handleClose} open={open} key={key}>
//           <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//             Modal title
//           </DialogTitle>
//           <DialogContent dividers>
//             <img src={flag} alt={name} />
//             <h1>{name}</h1>
//           </DialogContent>
//           {/* <DialogActions>
//             <Button autoFocus onClick={handleClose}>
//               Save changes
//             </Button>
//           </DialogActions> */}
//         </Dialog>
//       </div>
//     );
//   };

//   let CountryRow;
//   return (
//     <>
//       {/* {countries.map((country) => {
//         let name = country.name.common;
//         let flag = country.flags.png;
//         const { ccn3, population, capital, region, area } = country;
//         // console.log(country.name.common);

//         return (
//           <div>
//             {" "}
//             <article key={ccn3}>
//               <div>
//                 <img src={flag} alt={name} />
//                 <h1>{name}</h1>
//                 <h1>{population}</h1>
//                 <h1>{capital}</h1>
//                 <h1>{region}</h1>
//                 <h1>{area}</h1>
//               </div>
//             </article>
//           </div>
//         );
//       })} */}
//       <table class="table-auto" id="datatable">
//         <thead>
//           <tr>
//             <th>País</th>
//             <th>Capital</th>
//             <th>Población</th>
//             <th>Opciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {countries.map((country) => {
//             CountryRow = countries.indexOf(country);
//             let name = country.name.common;
//             const flag = country.flags.png;
//             // const id = nanoid();
//             const { ccn3, population, capital, region, area } = country;
//             // console.log(country.name.common);
//             console.log("prueba", CountryRow);
//             return (
//               <tr key={ccn3}>
//                 <td>{name}</td>
//                 <td>{capital}</td>
//                 <td>{population}</td>
//                 <td>
//                   <button
//                     className="font-bold  text-gray-900 "
//                     onClick={handleClickOpen}
//                   >
//                     Más Detalles
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//           <CountryDialog />
//         </tbody>
//       </table>
//     </>
//   );
// };
