import React from "react";
import Chart from "react-apexcharts";
import useHead from "../../../hooks/useHead";
import { api } from "../../../services";
import styles from "./estatisticas.module.css";

const Estatisticas = ({ setPage }) => {
  useHead("Dogs | Estastísticas");

  React.useEffect(() => setPage("Estastísticas"), [setPage]);

  const [grafic, setGrafic] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [""],
      },
    },
    series: [
      {
        name: "series-1",
        data: [0],
      },
    ],
  });

  React.useEffect(() => {
    api
      .get("/api/stats", {
        headers: {
          Authorization: "Bearer " + localStorage.auth,
        },
      })
      .then(({ data }) => {
        const graficModel = {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: [] } },
          series: [{ name: "series-1", data: [] }],
        };

        data.forEach((r) => {
          graficModel.options.xaxis.categories.push(r.title);
          graficModel.series[0].data.push(+r.acessos);
        });

        setGrafic(graficModel);
      });
  }, []);

  return (
    <div className={styles.grafic + " animeLeft"}>
      <Chart options={grafic.options} series={grafic.series} type="bar" />
    </div>
  );
};

export default Estatisticas;
