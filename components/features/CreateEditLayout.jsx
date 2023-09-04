"use client"

import BackButton from '@components/elements/BackButton'

const CreateEditLayout = ({ title, fields, buttons, backPath, onSubmit, isError, errmsg, errRef }) => {

    /*
    Formatting:
        const fields = [
            {
                label: "Label",
                placeholder: "Placeholder",
                type: "Type",
                id: "Id",
                value: value(if applicable) or checked(if checkbox),
                onChange: onChangeFunction
            }
        ]

        const buttons = [
        {
            type: "Type",
            disabled: ValueWhenDisabled,
            color: "bg-Color hover:bg-HoverColor",
            text: "Text",
            onClick: onClickFunction(if applicable)
        }
    ]
    */

	return (
		<div className='relative flex flex-col items-center w-full h-full gap-4 py-8 pt-24 overflow-y-scroll'>
			{/** back button */}
			<BackButton path={backPath} />
			<div className='flex flex-col items-center gap-2 text-center'>
				{/** title */}
				<h1 className="portalh2">{title}</h1>
			</div>

			<div className='flex flex-col items-center w-4/5 gap-4'>
				<form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
                    {fields.map((field, index) => (
                        <div key={index} className={'flex gap-2 ' 
                            + (field.type === "checkbox" ? "items-center justify-end w-full flex-row-reverse" : "flex-col")}>
                            <label className="text-xl text-brandBlue-900" htmlFor={field.id}>{field.label}</label>
                            {
                                field.type === "textarea" ?
                                <textarea
                                    className="h-32 px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                                    placeholder={field.placeholder}
                                    id={field.id}
                                    name={field.id}
                                    value={field.value}
                                    onChange={field.onChange}
                                /> :
                                <input className={"px-2 py-1 border-2 rounded-md " + 
                                    (field.type === "checkbox" ? "w-4 h-4 accent-brandBlue-600" : " w-[min(24rem,80vw)]")}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    id={field.id}
                                    name={field.id}
                                    checked={field.type === "checkbox" && field.checked}
                                    value={field.type !== "checkbox" && field.value}
                                    onChange={field.onChange}
                                />
                            }
                        </div>
                    ))}
                    {buttons.map((button, index) => (
                        <button key={index} type={button.type} disabled={button.disabled}
                            className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-[min(24rem,80vw)] ' +
                            (button.disabled ? "border-2 bg-brandNeutral-100" : ("text-white " + button.color))}
                            onClick={button.type === "button" ? button.onClick : () => {}}>
                            {button.text}
                        </button>
                    ))}
				</form>
                <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>
			</div>
		</div>
	)
}

export default CreateEditLayout