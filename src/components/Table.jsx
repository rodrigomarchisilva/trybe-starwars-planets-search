import React from 'react';
import * as bs from 'react-bootstrap';
import Loading from './Loading';
import { usePlanets } from '../context/Planets';
import { useFilters } from '../context/Filters';
import {
  filterPlanetsByName,
  filterPlanetsByNumericValues,
} from '../functions/filteringFunctions';
import sortPlanets from '../functions/sortingFunctions';

export default function Table() {
  const { planets, loading } = usePlanets();
  const { filters } = useFilters();
  const { filterByName, numericColumnFilters, order } = filters;

  if (loading || planets.length < 1) { return <Loading />; }

  let tablePlanets = filterPlanetsByName(planets, filterByName);
  tablePlanets = filterPlanetsByNumericValues(tablePlanets, numericColumnFilters);
  tablePlanets = sortPlanets(tablePlanets, order);

  return (
    <bs.Table
      striped
      bordered
      hover
      variant="dark"
      size="sm"
      responsive
      className="border-secondary"
    >
      <thead>
        <tr>
          { Object.keys(planets[0]).map((planetKey, index) => (
            <th key={ index } className="pe-2 ps-2">{ planetKey }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { tablePlanets.map((planet, planetIndex) => {
          const planetKeys = Object.keys(planet);
          const tableColumns = planetKeys
            .map((planetKey, planetKeyIndex) => {
              let output;
              switch (planetKey) {
              case ('name'):
                output = (
                  <td
                    key={ planetKeyIndex }
                    data-testid="planet-name"
                    className="pe-2 ps-2"
                  >
                    { planet[planetKey] }
                  </td>);
                break;

              case ('films'):
                output = (
                  <td key={ planetKeyIndex } className="pe-2 ps-2">
                    <ul>
                      { planet[planetKey].map((movieLink, liIndex) => (
                        <li key={ liIndex }>
                          <a href={ movieLink }>
                            { `Film ${movieLink.replace(/\D+/g, '')}` }
                          </a>
                        </li>)) }
                    </ul>
                  </td>);
                break;

              case ('url'):
                output = (
                  <td key={ planetKeyIndex } className="pe-2 ps-2">
                    <a href={ planet[planetKey] }>
                      { `Planet ${planet[planetKey].replace(/\D+/g, '')}` }
                    </a>
                  </td>);
                break;

              default:
                output = (
                  <td key={ planetKeyIndex } className="pe-2 ps-2">
                    { planet[planetKey] }
                  </td>
                );
              }

              return output;
            });

          return (<tr key={ planetIndex }>{ tableColumns }</tr>);
        }) }
      </tbody>
    </bs.Table>
  );
}
