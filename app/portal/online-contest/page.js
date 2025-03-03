"use client";

import { useGetProblemListsQuery } from "@components/features/problem-lists/problemListsApiSlice";
import ProblemList from "@components/features/problem-lists/ProblemList";

import TableHead from "@components/portal/TableHead";
import TableWrapper from "@components/portal/TableWrapper";

// temp imports for testing
import { useAddNewProblemListMutation } from "@components/features/problem-lists/problemListsApiSlice";

const CreateOnlineContest = () => {
    const {data: problemLists, isLoading, isSuccess, isError, error} = useGetProblemListsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    // temp for testing
    const [addNewProblemList, {isAddNewProblemListLoading}] = useAddNewProblemListMutation();

    let content;

    if (isError) content = <p>{error.error}</p>;

    if (isSuccess) {
        const {ids} = problemLists;

        const tableContent = ids?.length
            ? ids.map((problemListId) => <ProblemList key={problemListId} problemListId={problemListId}/>) : null;

        content = (
            <div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
                {/* Temp button for testing */}
                <button onClick={async () => {
                    if (isAddNewProblemListLoading) return;
                    await addNewProblemList({
                        name: "Test Contest",
                        contestStart: Date.now(),
                        contestEnd: Date.now(),
                        mc_questions: [
                            {
                                question: "asdfasdfasdf",
                                options: ["1", "2", "3", "4"],
                                answer: "A"
                            }
                        ],
                        short_answer_questions: [
                            {
                                question: "fsdasfd",
                                answer: "2"
                            }
                        ]
                    });
                }}>Add test contest</button>
                <div className='flex flex-col items-center gap-2 text-center'>
					<h1 className="portalh2">Online Contest List</h1>
                
                </div>
                <div className='flex flex-col w-4/5 gap-4'>
                    <TableWrapper>
                        <TableHead headings={["Name", "Start Date", "End Date"]}/>
                        <tbody className='text-md'>{tableContent}</tbody>
                    </TableWrapper>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-full'>
            {content}
        </div>
    );
}

export default CreateOnlineContest;