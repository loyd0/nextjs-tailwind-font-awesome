
import { getBillingUrl } from '../../utils/payments/client/getBillingUrl';
import { useAppStore } from '../../providers/AppStore';

export const BillingButton = (props) => {

    const { user } = useAppStore()


    const customerId = user.stripe?.customer

    return <button
        onClick={() => getBillingUrl(customerId, "")}
        className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:text-white`} >{props.children}</button>
}