import {UserGageData} from "./user-gage-data";

export interface Page {
  "content": UserGageData[],
  "pageable": {
    "sort": {
      "empty": boolean,
      "sorted": boolean,
      "unsorted": boolean
    },
    "offset": number,
    "pageSize": number,
    "pageNumber": number,
    "unpaged": boolean,
    "paged": boolean
  },
  "last": boolean,
  "totalElements": number,
  "totalPages": number,
  "size": number,
  "number": number,
  "sort": {
    "empty": boolean,
    "sorted": boolean,
    "unsorted": boolean
  },
  "first": boolean,
  "numberOfElements": number,
  "empty": boolean
}
