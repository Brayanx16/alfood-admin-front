import IRestaurant from "../../../interfaces/IRestaurant";
import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const ListRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    http
      .get<IRestaurant[]>("restaurantes/")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const excluirItem = (restaurantId: number) => {
    http
      .delete(`restaurantes/${restaurantId}/`)
      .then((res) => {
        const listRestaurants = restaurants.filter(
          (item) => item.id !== restaurantId
        );
        setRestaurants([...listRestaurants]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurant/${item.id}`}> Editar </Link> ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirItem(item.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListRestaurants;
