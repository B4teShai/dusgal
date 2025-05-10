import { gql } from '@apollo/client';

export const login = gql`
  mutation login($phoneNo: String!, $password: String!) {
    login(phoneNo: $phoneNo, password: $password) {
       token
    }
  }
`;

export const GET_DAILY_SUMMARY = gql`
  query GetDailySummary {
    dailySummary {
      total
      previousDayChange
      monthlyTotal
    }
  }
`;

export const GET_WATER_USAGE = gql`
  query GetWaterUsage {
    waterUsage {
      id
      type
      amount
    }
  }
`;

export const GET_WATER_SAVING_TIPS = gql`
  query GetWaterSavingTips {
    waterSavingTips {
      id
      title
      description
      icon
      impact
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      title
      message
      read
    }
  }
`;