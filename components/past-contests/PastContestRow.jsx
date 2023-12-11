
const PastContestRow = ({contestName, PDFName, hasContest, hasSolutions, hasResults}) => {
    return (
        <tr className='bg-brandNeutral-100'>
            {hasContest && <td className='py-4'>
                <a
                    className='p-5 md:px-10 lg:px-20'
                    href={'/past-contests/contests/'+ PDFName + '.pdf'}
                    alt={contestName + ' Contest'}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {contestName}
                </a>
            </td>}
            {hasSolutions && <td className='py-4'>
                <a
                    className='p-5 md:px-10 lg:px-20'
                    href={'/past-contests/solutions/'+ PDFName + '.pdf'}
                    alt={contestName + ' Solutions'}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {contestName}
                </a>
            </td>}
            {hasResults && <td className='py-4'>
                <a
                    className='p-5 md:px-10 lg:px-20'
                    href={'/past-contests/results/'+ PDFName + '.pdf'}
                    alt={contestName + ' Results'}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {contestName}
                </a>
            </td>}
        </tr>
    )
}

export default PastContestRow