import {UserClaimData} from "./user-claim-data";

export interface UserClaimPage {
  "content": UserClaimData[],
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
