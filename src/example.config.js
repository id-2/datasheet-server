import { timemap } from './lib'

export default {
  gsheets: [],
  xlsx: [
    {
      name: 'timemap_data',
      path: 'data/timemap_data.xlsx',
      tabs: timemap.default
    }
  ],
  cors: {
    active: false,
    corsOptions: { // meaningless unless active=true
      origin: 'http://example.com',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
  }
}
