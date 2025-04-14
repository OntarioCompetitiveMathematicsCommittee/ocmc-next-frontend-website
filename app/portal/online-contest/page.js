"use client";

import { useGetProblemListsQuery } from "@components/features/online-contest/problemListsApiSlice";
import ProblemList from "@components/features/online-contest/ProblemList";

import TableHead from "@components/portal/TableHead";
import TableWrapper from "@components/portal/TableWrapper";

import Link from "@node_modules/next/link";

const CreateOnlineContest = () => {
    const {data: problemLists, isLoading, isSuccess, isError, error} = useGetProblemListsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isError) content = <p>{error.error}</p>;

    if (isSuccess) {
        const {ids} = problemLists;

        const tableContent = ids?.length
            ? ids.map((problemListId) => <ProblemList key={problemListId} problemListId={problemListId}/>) : null;

        content = (
            <div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
                <div className='flex flex-col items-center gap-2'>
                    <h1 className="portalh2">Online Contest List</h1>
                    <Link className='flex justify-center w-64 px-2 py-2 text-white transition-colors rounded-md bg-brandBlue-500 hover:bg-brandBlue-600' href="/portal/online-contest/new">
                        <button>Create Online Contest</button>
                    </Link>
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