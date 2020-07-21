import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

export const PercentagePill = ({data}) => <span className={`py-1 px-2 rounded-md ${data> 0 ? 'bg-green-400' : 'bg-orange-300'} `}>
    
        <FontAwesomeIcon icon={data> 0 ? faChevronUp : faChevronDown } className={`${data> 0 ? 'text-yellow-300' : 'text-red-600'}  text-base mx-1 mb-1`}/>
    {data}%
    </span>

export const TagPill = ({children, removeTag}) => <span className="px-2 py-1 bg-gray-300 mr-1 mb-1 inline-block">
        {children} 
         <FontAwesomeIcon onClick={() => removeTag()} icon={faTimes} className="text-xs ml-1" /></span> 


export const RegistrationPill = ({ active, number, className="", children }) => <div className={`${className}`}>
    <div className={`${active ? "bg-white text-blue-900" : "text-gray-100"}  flex border border-gray-100 w-8 h-8 text-center font-bold rounded-full mx-auto mb-1`}>
       <span className="self-center mx-auto"> { number } </span>
    </div>
    <h3 className="text-gray-100 text-xs text-center leading-tight">
    { children }
    </h3>
 
</div>

export const EmphasisePill = ({children, className="bg-pink-400 text-yellow-300", ...restProps}) => <span className={`py-1 rounded-lg px-2 inline-block font-bold ${className}`} {...restProps}>{children}</span>