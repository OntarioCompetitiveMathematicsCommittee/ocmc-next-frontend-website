import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import useAuth from '@hooks/useAuth';
import { selectContestById } from "./contestsApiSlice";

import { useGetUsersByContestQuery, selectUserById } from '@components/features/users/usersApiSlice';

const Contest = ({ contestId }) => {
    const proctor_id = useAuth().id;

    const contest = useSelector((state) => selectContestById(state, contestId));
	const proctor = useSelector((state) => selectUserById(state, proctor_id));

    // get list of users registered under the proctor taking this contest
    const {data:users, isLoading, isSuccess, isError, error} = useGetUsersByContestQuery({contest_id:contestId, school: proctor?.school}, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });


    const router = useRouter();

    if (contest) {
        const created = new Date(contest.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const updated = new Date(contest.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

        const handleEdit = () => router.push("/portal/contests/" + contestId);

        return (
            <tr className="bg-white border-2">
                <td className="py-4 pl-4">{contest.name}</td>
                <td>{contest.year}</td>
                <td>{contest.description}</td>
                <td>{contest.max_score}</td>
                <td>{contest.signups_active ? "Yes" : "No"}</td>
                <td>{users?.length}</td>
                <td>
                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600" href={"/portal/proctors/contests/" + contestId}>View</Link>
                </td>
            </tr>
        )
    } else return null;
}

export default Contest
