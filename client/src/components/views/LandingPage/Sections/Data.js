const price = [
  {
    _id: 0,
    name: "any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $299",
    array: [200, 299],
  },
  {
    _id: 3,
    name: "$300 to $399",
    array: [300, 399],
  },
  {
    _id: 4,
    name: "$400 to $999",
    array: [400, 999],
  },
  {
    _id: 5,
    name: "More than $1000",
    array: [1000, 999999999],
  },
];

const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "North America",
  },
  {
    _id: 5,
    name: "South America",
  },
  {
    _id: 6,
    name: "Australia",
  },
  {
    _id: 7,
    name: "Antarctica",
  },
];

export { price, continents };
