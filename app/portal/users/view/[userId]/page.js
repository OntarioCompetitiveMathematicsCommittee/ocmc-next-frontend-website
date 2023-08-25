"use client"

import { useParams } from 'next/navigation'

import ViewUserContestScores from '@components/portal/ViewUserContestScores';

const ViewUser = () => {
    // get user id
    const params = useParams();
    const id = params.userId;

    return <ViewUserContestScores id={id}/>
  }
  
  export default ViewUser