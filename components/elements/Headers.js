export const H2 = ({children, className, ...restProps}) => 
    <h2 className={`text-xl leading-6 font-medium text-gray-900 ${className}`} {...restProps}>{children}</h2>