import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TagPill } from './Pills';

export const FormGroup = (props) => {
    const { className, disabled, ...restProps } = props;
    return <div
        {...restProps}
        className={`font-light ${className} ${disabled && "pointer-events-none opacity-50"}`}
    />
}


export const Input = React.forwardRef((props, ref) => {
    const { className = "text-gray-800", ...restProps } = props;
    return <input
        ref={ref}
        {...restProps}
        className={`block border border-gray-200 rounded w-full py-2 pl-3 pr-1 my-2 ${className}`}
    />
})


export const InputUrl = React.forwardRef((props, ref) => {
    const { className = "text-gray-800", ...restProps } = props;
    return <div className="flex">
        <span className="self-center font-medium text-xs bg-blue-900 py-3 px-1 text-gray-100 rounded-l-md">https://signmeninhere.com/</span>
        <input
        ref={ref}
        {...restProps}
        className={`block border border-gray-200 rounded-r-md w-full py-2 pl-3 pr-1 my-2  ${className}`}
    /></div>
})

export const SubmitButton = React.forwardRef((props, ref) => {
    const { className = "bg-gray-200 hover:bg-gray-300 my-2", ...restProps } = props;
    return <button
        ref={ref}
        {...restProps}
        className={`block w-full py-2 rounded ${className}`}
        type="submit"
    />
})

export const DisabledButton = React.forwardRef((props, ref) => {
    const { className = "border border-gray-200 my-2", ...restProps } = props;
    return <button
        ref={ref}
        disabled
        {...restProps}
        className={`block w-full rounded cursor-default opacity-50 py-2 ${className}`}
    />
})


export const Label = React.forwardRef((props, ref) => {
    const { className = "text-sm", children } = props;
    return <label
        htmlFor={props.for}
        ref={ref}
        className={`block w-full  ${className}`}
    >{children}</label>
})


export const TextArea = React.forwardRef((props, ref) => {
    const { className = "", ...restProps } = props;
    return <textarea
        {...restProps}
        rows="5"
        ref={ref}
        className={`form-textarea bg-gray-50 block w-full border border-gray-200 transition duration-150 ease-in-out sm:leading-5  ${className}`}></textarea>
})

export const FormError = ({ className = "text-xs text-red-800", children, ...restProps }) =>
    <span className={`block ${className}`} {...restProps}>
        <FontAwesomeIcon className="mr-1" icon={faExclamationTriangle} />
        {children}
    </span>


export const CheckBox = React.forwardRef((props, ref) => {
    const { checked, onCheckMark, onMarkUncheck, label, name, toggleCheckMark, defaultValue } = props;
    return <div className="flex h-5 pr-1 " >

        <input
            ref={ref}
            name={name}
            value={defaultValue}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
                if (!checked && onCheckMark) return onCheckMark()
                if (checked && onMarkUncheck) return onMarkUncheck()
                if (toggleCheckMark && !onMarkUncheck && !onCheckMark) return toggleCheckMark()
            }
               
            }
            className="ml-auto form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out self-center mt-1" />
        {label && label}
    </div>
})


export const TagInput = ({ name, id, style, className, addedTag, removedTag }) => {


    const [tags, setTags] = React.useState([])
    const [value, setValue] = React.useState("")

    const removeTag = (text) => setTags([...tags.filter(tag => tag !== text)])
    const addTag = (text) => {
        if (text.trim().length > 0) return setTags([...tags, text])
    }

    const handleAddClick = (e) => {
        e.preventDefault()
        addTag(value)
        return setValue("")
    }
    const handleKeyPress = (e) => {
        if (e.which === 13 || e.which === 9) {
            console.log('tab / enter')
            addTag(e.currentTarget.value)
            return setValue("")
        }
        return null
    }

    const handleChange = (e) => {
        if (e.currentTarget.value.length < 32) {
            return setValue(e.currentTarget.value)
        }
    }
    return <div className={`w-full py-3 px-2  border-1 border-gray-200 bg-gray-100 rounded ${className}`}>
        {tags.map((tag, index) => <TagPill key={tag + index} removeTag={() => removeTag(tag)}>{tag}</TagPill>)}
        <div className={`relative border-t ${tags.length > 0 ? "border-gray-200 pt-2" : "border-transparent"} mt-2  pb-2`}>
            <input
                type="text"
                className="bg-gray-100 my-1 overflow-visible inline-block pl-2 focus:outline-none w-full"
                placeholder="Add people that served them here"
                value={value}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                name={name}
            />
            <button
                onClick={(e) => handleAddClick(e)}
                className="ml-1 rounded hover:bg-gray-300 bg-gray-200 px-2 py-1 absolute right-0">+</button>
        </div>
    </div>
}


export const MediaInput = React.forwardRef((props, ref) => {
    const { initialSrc = null } = props;
    const [mediaSrc, setMediaSrc] = React.useState(initialSrc)


    // return <div className="w-full h-24 bg-gray-200 rounded-md">
    //     <input type="file"/>
    // </div>
    return <div className="mt-6 sm:mt-5 sm:items-start">

        <div className="mt-2 sm:mt-0 bg-gray-50 ">
            <div className=" flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                            Upload a file {" "}
                        </button>
                         {" "}or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 5mb
                    </p>
                </div>
            </div>
        </div>
    </div>
})


export const RadioButton = ({ register, name, value, header, description, className="border border-gray-800", active }) => {
    return (
        <div className={`py-3 -mt-1  flex relative pl-12 ${className} ${active ? 'bg-gray-200' :"bg-gray-50 " }`}>
            <label className="text-sm font-normal pr-4 flex w-full cursor-pointer" >
            <input 
                className="radio-button md:p-1 mx-4 block self-center absolute left-0" 
                type="radio" 
                name={name} 
                value={value} 
                ref={(options) => register(options)} 
            />
            <div>
            {header} {description ? <p className="font-thin">{description}</p>:""}
            </div>
         
            </label>
        </div>
    )
}