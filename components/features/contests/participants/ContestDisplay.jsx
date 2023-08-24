import { useGetContestsQuery, selectContestById } from "../contestsApiSlice"
import { useSelector } from "react-redux"

const ContestDisplay = ({ id, score, maxScore }) => {
    const { isSuccess, isLoading } = useGetContestsQuery(); // Fetch all contests

    const currContest = useSelector((state) => selectContestById(state, id));

    if (isLoading) return <p>Loading...</p>;

    if (isSuccess) {
        const { name, year } = currContest;
        return (
            <>
                <td className="py-4 pl-4">{name}</td>
                <td>{year}</td>
                {(score === -1) ? <td>TBD</td> : <td>{score}/{maxScore}</td>}
            </>
        );
    }

    return <p>Something went wrong</p>;
}

export default ContestDisplay
