import { gql } from 'apollo-boost'

export default gql`
  mutation createPoll(
    $user: UserInput!
    $pollName: String!
    $pollOptions: [PollOptionInput]!
  ) {
    createPoll(user: $user, pollName: $pollName, pollOptions: $pollOptions) {
      id
      createdBy {
        id
        name
        email
      }
      name
      votes
      url
      pollOptions {
        id
        name
        votes
        voters {
          id
        }
      }
    }
  }
`