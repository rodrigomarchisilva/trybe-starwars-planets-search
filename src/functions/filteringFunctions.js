const EMPTY = 0;
const RADIX = 10;

export const filterPlanetsByName = (planets, name) => {
  let output = planets;

  if (name !== '') {
    output = [...planets]
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
  }

  return output;
};

export const filterPlanetsByNumericValues = (planets, numericColumnFilters) => {
  let output = [...planets];
  if (numericColumnFilters.length > EMPTY) {
    numericColumnFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        output = output
          .filter((planet) => {
            const objectValue = planet[filter.column];
            return parseInt(objectValue, RADIX) > filter.value;
          });
      } else if (filter.comparison === 'menor que') {
        output = output
          .filter((planet) => {
            const objectValue = planet[filter.column];
            return parseInt(objectValue, RADIX) < filter.value;
          });
      } else {
        output = output
          .filter((planet) => planet[filter.column] === filter.value);
      }
    });
  }
  return output;
};
