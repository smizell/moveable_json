const axios = require('axios');
const util = require('util');
const gql = require('graphql-tag');

const { getWithGraphQl, utils } = require('../..');
const apiUrl = 'https://moveablejsonapi.glitch.me';

// Allow for changing examples through command line
const exampleId = process.argv[2] || 'example1';

async function api() {
  const api = await axios.get(apiUrl);
  const example = api.data[exampleId];
  const query = gql`{
      customer_number
      order {
        order_number
        total
      }
    }`
  const value = await getWithGraphQl(example, query);
  const expanded = await utils.expandObject(value);
  console.log(util.inspect(expanded, false, null, true));
}

api();
