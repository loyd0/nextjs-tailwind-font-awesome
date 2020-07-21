export const Heading = ({ style, children }) => <h1 style={{ fontSize: 24, ...style }}>{children}</h1>
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
export const P = ({ style, children }) => <p style={{ margin: "14px 0px", ...style }}>{children}</p>
export const Bold = ({ children }) => <bold style={{ fontWeight: 600 }}>{children}</bold>



export const Poster = ({ width, height, padding, children, style }) => {
    return <article style={{
        height: height,
        width: width,
    }}
        className="border border-gray-900"
    >
        <div style={{
            padding,
            ...style
        }}>
            {children}
        </div>
    </article>

}


export const HotTip = ({ icon, children, className }) => <div className={`flex p-2 bg-gray-100 rounded-md text-sm ${className} `}>
    <div className="self-center">
        <FontAwesomeIcon icon={icon || faLightbulb} className="mx-3 text-yellow-300 text-xl" />
    </div>
    {children}
</div>