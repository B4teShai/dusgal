import { gql } from '@apollo/client';

export const login = gql`
  mutation login($phoneNo: String!, $password: String!) {
    login(phoneNo: $phoneNo, password: $password) {
       token
    }
  }
`;

export const getMyBuilding = gql`
  query getMyBuilding {
    getMyBuilding {
      _id
      name
      savedWater
    }
  }
`

export const getReport = gql`
query getReport($startDate: Float!, $endDate: Float!) {
  getReport(startDate: $startDate, endDate: $endDate) {
    usedWater
    usageRecords {
      usedLiter
      createdAt
    }
  }
}`

