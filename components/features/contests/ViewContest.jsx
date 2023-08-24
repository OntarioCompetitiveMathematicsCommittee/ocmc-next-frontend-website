import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { selectContestById } from "./contestsApiSlice";

const Contest = ({ contestId }) => {
    const contest = useSelector((state) => selectContestById(state, contestId));

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
                <td>{contest.signup_ids.length}</td>
                <td>
                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md" href={"/portal/proctors/contests/" + contestId}>View</Link>
                </td>
            </tr>
        )
    } else return null;
}

export default Contest
