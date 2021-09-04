import {Dispatch, SetStateAction } from "react"

namespace StepProgressType {

    // StepProgress PropType ---------------------
    export type StepProgressPropType = {
        config: PropTypeConfig
    }

    export type PropTypeConfig = {
        steps: string[],
        startStep: 2 | 3 | 4 | 5
    }

    // Circle PropType ----------------------------
    export type CirclePropType = {
        itemNumber: CurrentItem
        compData: Item
        setCurrentItem: Dispatch<SetStateAction<number>>
    }

    // Label PropType ------------------------------
    export type LabelPropType = {
        compData: Item
    }

    // Segment PropType -----------------------------
    export type SegmentPropType = {
        itemNumber: CurrentItem
        compData: Item,
        items: itemList,
        currentItem: CurrentItem
    }

    // Component state types -----------------------

    export type StepList = Step[]
    export type Step = string

    export type CurrentItem = number

    export type itemList = Item[]
    type Item = {
        active: boolean
        disabled: boolean
        name: Step
    }
}

export default StepProgressType