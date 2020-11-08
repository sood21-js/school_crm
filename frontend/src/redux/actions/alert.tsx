import { TVariant } from "#src/libs/ui/Message";
import { SHOW_ALERT, HIDE_ALERT } from '#src/redux/types/alert';


export const showAlert = (message: string, variant: TVariant) => ({
    type: SHOW_ALERT,
    message,
    variant
} as const)
export const hideAlert = () => ({ type: HIDE_ALERT } as const)