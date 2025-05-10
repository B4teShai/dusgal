import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddBuildingInput = {
  deviceSecret?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type AddCardInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  companyID: Scalars['ID']['input'];
  coverImage?: InputMaybe<ContentInput>;
  firstName: Scalars['String']['input'];
  items: Array<CardItemInput>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  localization?: InputMaybe<LocalizationCardInput>;
  order: Scalars['Int']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<ContentInput>;
  pronoun?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  videos: Array<VideoInput>;
};

export type AddCompanyInput = {
  backgroundImage: ContentInput;
  endDate: Scalars['Float']['input'];
  logo: ContentInput;
  logoHeight: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  primaryColor: Scalars['String']['input'];
  secondaryColor: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  startDate: Scalars['Float']['input'];
  templateType: TemplateType;
  thirdColor: Scalars['String']['input'];
};

export type AddUsageRecordInput = {
  c_liter: Scalars['Float']['input'];
  deviceSecret: Scalars['String']['input'];
  h_liter: Scalars['Float']['input'];
};

export type AddUserInput = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String']['output'];
  user: User;
};

export type Building = {
  __typename?: 'Building';
  _id: Scalars['ID']['output'];
  deviceSecret: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner: User;
};

export type Card = {
  __typename?: 'Card';
  _id: Scalars['ID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  company: Company;
  coverImage?: Maybe<Content>;
  downloadCount: Scalars['Int']['output'];
  firstName: Scalars['String']['output'];
  items: Array<CardItem>;
  lastName?: Maybe<Scalars['String']['output']>;
  localization?: Maybe<LocalizationCard>;
  order: Scalars['Int']['output'];
  position?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Content>;
  pronoun?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  videos: Array<Video>;
  viewCount: Scalars['Int']['output'];
};

export type CardItem = {
  __typename?: 'CardItem';
  order: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  type: CardItemType;
  value: Scalars['String']['output'];
};

export type CardItemInput = {
  order: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  type: CardItemType;
  value: Scalars['String']['input'];
};

export enum CardItemType {
  Address = 'Address',
  Email = 'Email',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Nfc = 'NFC',
  Phone = 'Phone',
  Twitter = 'Twitter',
  Website = 'Website',
  WhatsApp = 'WhatsApp'
}

export enum CardLang {
  Empty = 'EMPTY',
  En = 'EN',
  Mn = 'MN'
}

export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID']['output'];
  backgroundImage: Content;
  endDate: Scalars['Float']['output'];
  logo: Content;
  logoHeight: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  primaryColor: Scalars['String']['output'];
  secondaryColor: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate: Scalars['Float']['output'];
  templateType: TemplateType;
  thirdColor: Scalars['String']['output'];
};

export type Content = {
  __typename?: 'Content';
  _id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  type: ContentType;
};

export type ContentInput = {
  path: Scalars['String']['input'];
  type: ContentType;
};

export enum ContentType {
  Background = 'BACKGROUND',
  Logo = 'LOGO',
  Profile = 'PROFILE'
}

export type EditCardInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  companyID?: InputMaybe<Scalars['ID']['input']>;
  coverImage?: InputMaybe<ContentInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  items: Array<CardItemInput>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  localization?: InputMaybe<LocalizationCardInput>;
  order?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<ContentInput>;
  pronoun?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  videos: Array<VideoInput>;
};

export type EditCompanyInput = {
  backgroundImage?: InputMaybe<ContentInput>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<ContentInput>;
  logoHeight?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  templateType?: InputMaybe<TemplateType>;
  thirdColor?: InputMaybe<Scalars['String']['input']>;
};

export type GetCardsResult = {
  __typename?: 'GetCardsResult';
  cards: Array<Card>;
  totalPages: Scalars['Int']['output'];
};

export type GetCompaniesResult = {
  __typename?: 'GetCompaniesResult';
  companies: Array<Company>;
  totalPages: Scalars['Int']['output'];
};

export type GetContentsResult = {
  __typename?: 'GetContentsResult';
  contents: Array<Content>;
  totalPages: Scalars['Int']['output'];
};

export type LocalizationCard = {
  __typename?: 'LocalizationCard';
  lang: CardLang;
  path: Scalars['String']['output'];
};

export type LocalizationCardInput = {
  lang: CardLang;
  path: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBuilding: Building;
  addCard: Scalars['Boolean']['output'];
  addCompany: Scalars['Boolean']['output'];
  addContent: Scalars['Boolean']['output'];
  addUsageRecord: UsageRecord;
  deleteCard: Scalars['Boolean']['output'];
  deleteCompany: Scalars['Boolean']['output'];
  deleteContent: Scalars['Boolean']['output'];
  editCard: Scalars['Boolean']['output'];
  editCompany: Scalars['Boolean']['output'];
  login: Auth;
  logout: Scalars['Boolean']['output'];
  register: Scalars['String']['output'];
  verify: Auth;
  version: Scalars['String']['output'];
};


export type MutationAddBuildingArgs = {
  input: AddBuildingInput;
};


export type MutationAddCardArgs = {
  card: AddCardInput;
};


export type MutationAddCompanyArgs = {
  company: AddCompanyInput;
};


export type MutationAddContentArgs = {
  input: ContentInput;
};


export type MutationAddUsageRecordArgs = {
  input: AddUsageRecordInput;
};


export type MutationDeleteCardArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteCompanyArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteContentArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationEditCardArgs = {
  _id: Scalars['ID']['input'];
  card: EditCardInput;
};


export type MutationEditCompanyArgs = {
  _id: Scalars['ID']['input'];
  company: EditCompanyInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  password: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
};


export type MutationVerifyArgs = {
  code: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBuilding: Building;
  getCard: Card;
  getCardBySlug: Card;
  getCards: GetCardsResult;
  getCompanies: GetCompaniesResult;
  getCompany: Company;
  getContents: GetContentsResult;
  getMyBuildings: Array<Building>;
  getUsageRecords: Array<UsageRecord>;
  getUser: User;
  me: User;
  version: Scalars['String']['output'];
};


export type QueryGetBuildingArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetCardArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetCardBySlugArgs = {
  companySlug: Scalars['String']['input'];
  profileSlug: Scalars['String']['input'];
};


export type QueryGetCardsArgs = {
  companyID: Scalars['ID']['input'];
  lang?: InputMaybe<CardLang>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryGetCompaniesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryGetCompanyArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetContentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  type: ContentType;
};


export type QueryGetUsageRecordsArgs = {
  buildingId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  _id: Scalars['ID']['input'];
};

export enum TemplateType {
  TemplateTypeFive = 'TemplateTypeFive',
  TemplateTypeFour = 'TemplateTypeFour',
  TemplateTypeOne = 'TemplateTypeOne',
  TemplateTypeSix = 'TemplateTypeSix',
  TemplateTypeThree = 'TemplateTypeThree',
  TemplateTypeTwo = 'TemplateTypeTwo'
}

export type UsageRecord = {
  __typename?: 'UsageRecord';
  _id: Scalars['ID']['output'];
  building: Building;
  c_liter: Scalars['Float']['output'];
  createdAt: Scalars['Float']['output'];
  h_liter: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  phoneNo: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type Video = {
  __typename?: 'Video';
  order: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type VideoInput = {
  order: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  phoneNo: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string } };


export const LoginDocument = gql`
    mutation login($phoneNo: String!, $password: String!) {
  login(phoneNo: $phoneNo, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      phoneNo: // value for 'phoneNo'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;