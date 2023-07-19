import { useGetContestsQuery, selectContestById } from "../contestsApiSlice"
import { useSelector } from "react-redux"

const ContestDisplay = ({ id, score }) => {
    const { isSuccess, isLoading } = useGetContestsQuery(); // Fetch all contests

    const currContest = useSelector((state) => selectContestById(state, id));

    if (isLoading) return <p>Loading...</p>;

    if (isSuccess) {
        const { name, year } = currContest;
        return (
            <section>
                <p>Contest Name: {name}</p>
                <p>Contest Year: {year}</p>
                {(score === -1) ? <p>Score: Not yet available</p> : <p>Score: {score}</p>}
            </section>
        );
    }

    return <p>Something went wrong</p>;
}

export default ContestDisplay
