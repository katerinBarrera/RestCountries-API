import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";

// const CountryDialog = ({ flag, name, key }) => {
//   const [open, setOpen] = useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog onClose={handleClose} open={open} key={key}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Modal title
//         </DialogTitle>
//         <DialogContent dividers>
//           <img src={flag} alt={name} />
//           <h1> hola YO SOY {name}</h1>
//           {console.log("la prueba", name)}
//         </DialogContent>
//         {/* <DialogActions>
//               <Button autoFocus onClick={handleClose}>
//                 Save changes
//               </Button>
//             </DialogActions> */}
//       </Dialog>
//     </div>
//   );
// };

const Row = ({ index, name, capital, population, handleClickOpen }) => {
  return (
    <tr key={index}>
      <td>{name}</td>
      <td>{capital}</td>
      <td>{population}</td>
      <td>
        <button className="font-bold  text-gray-900 " name={name}>
          Más Detalles
        </button>
      </td>
      {/* <CountryDialog name={name} /> */}
    </tr>
  );
};

export default Row;
