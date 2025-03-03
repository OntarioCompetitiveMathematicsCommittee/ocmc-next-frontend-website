import { useSelector } from "react-redux";
import { selectProblemListById } from "./problemListsApiSlice";

const ProblemList = ({ problemListId }) => {
    const problemList = useSelector((state) => selectProblemListById(state, problemListId));

    if (problemList) {
        const startDate = new Date(problemList.contestStart).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const endDate = new Date(problemList.contestEnd).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

        return (
            <tr className="bg-white border-2">
                <td className="py-4 pl-4">{problemList.name}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
            </tr>
        )
    } else return null;
}

export default ProblemList