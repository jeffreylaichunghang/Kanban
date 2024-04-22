import { useState, useEffect } from "react";

import useMediaQuery from "./useMediaQuery";
import { desktopLayout, tabletLayout, mobileLayout } from "../themes/layout"

export default function useLayout() {
    const [device, setDevice] = useState()
    const isTablet = useMediaQuery('(max-width: 800px)')
    const isMobile = useMediaQuery('(max-width: 650px)')
    let layout;

    useEffect(() => {
        if (isTablet) {
            if (isMobile) {
                setDevice('mobile')
            } else {
                setDevice('tablet')
            }
        } else {
            setDevice('desktop')
        }
    }, [isTablet, isMobile])

    switch (device) {
        case 'desktop':
            layout = desktopLayout
            break;

        case 'tablet':
            layout = tabletLayout
            break;

        case 'mobile':
            layout = mobileLayout
            break;

        default:
            layout = desktopLayout
            break;
    }

    return { layout, isTablet, isMobile }
}
