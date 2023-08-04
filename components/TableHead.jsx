
const TableHead = ({ headings }) => {

    return (
        <thead className='text-xl font-bold'>
            <tr>
                {headings.map((heading, index) => (
                    <th className='text-brandBlue-900' key={index}>
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead