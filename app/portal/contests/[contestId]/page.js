"use client";

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectContestById } from '@components/features/contests/contestsApiSlice';
import EditContestForm from '@components/features/contests/EditContestForm';

const EditContest = () => {
    const params = useParams();
    const id = params.contestId;

    const contest = useSelector(state => selectContestById(state, id));

    const content = contest ? <EditContestForm contest={contest} id={id} /> : <p>Loading...</p>
    return content;
}

export default EditContest
