import Link from 'next/link'
import { useSelector } from "react-redux";
import { selectContestById } from "./contestsApiSlice";

const Contest = ({ contestId }) => {
    const contest = useSelector((state) => selectContestById(state, contestId));

    if (contest) {

        const created = new Date(contest.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const updated = new Date(contest.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

        return (
            <tr className="bg-white border-2">
                <td className="py-4 pl-4">{contest.name}</td>
                <td>{contest.year}</td>
                <td>{contest.description}</td>
                <td>{contest.max_score}</td>
                <td>{contest.signups_active ? "Yes" : "No"}</td>
                <td>{contest.signup_ids.length}</td>
                {/* <td>{created}</td>
                <td>{updated}</td> */}
                <td>
                    <Link href={"/portal/contests/" + contestId} className='px-6 py-2 text-white transition-colors rounded-md bg-brandBlue-500 hover:bg-brandBlue-600'>Edit</Link>
                </td>
                <td>
                    <Link href={"/portal/contests/input/" + contestId} className='px-6 py-2 text-white transition-colors rounded-md bg-brandYellow-500 hover:bg-brandYellow-600'>Input</Link>
                </td>
                <td>
                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md" href={"/portal/contests/view/" + contestId}>View</Link>
                </td>
            </tr>
        )
    } else return null;
}

export default Contest
