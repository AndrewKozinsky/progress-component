import React, {useCallback, useEffect, useState} from 'react'
import { getCompData, useGetSegmentFillElemClasses } from './StepProgress-func'
import StepProgressType from './StepProgressTypes'
import './StepProgress.css'

// Root class name
const CN = 'step-progress'

// StepProgress component
export default function StepProgress(props: StepProgressType.StepProgressPropType) {
    // Name of items and initial item
    const { steps, startStep } = props.config

    // Items array and current item number
    const [itemsData, setItemsData] = useState(getCompData(steps, startStep))
    const [currentItem, setCurrentItem] = useState<StepProgressType.CurrentItem>(startStep)

    // Recalculate items properties if current item has been changed
    useEffect(function () {
        setItemsData(
            getCompData(steps, currentItem)
        )
    }, [currentItem])

    return (
        <div className={`${CN}__wrapper`}>
            {itemsData.map((itemData, i) => {
                return (
                    <React.Fragment key={i}>
                        <Circle
                            itemNumber={i}
                            compData={itemData}
                            setCurrentItem={setCurrentItem}
                        />
                        <Segment
                            itemNumber={i}
                            compData={itemData}
                            items={itemsData}
                            currentItem={currentItem}
                        />
                    </React.Fragment>
                )
            })}
        </div>
    )
}

// Round button component
function Circle(props: StepProgressType.CirclePropType) {
    const { itemNumber, compData, setCurrentItem } = props

    // CLASSES
    const circleCN = `${CN}__circle`
    const circleClasses = [circleCN]

    if (compData.active && compData.disabled) circleClasses.push(`${circleCN}--active-disabled`)
    else if (compData.active) circleClasses.push(`${circleCN}--active`)
    else if (compData.disabled) circleClasses.push(`${circleCN}--disabled`)
    else circleClasses.push(`${circleCN}--normal`)

    // CLICK HANDLER
    const onClickHandler = useCallback(function () {
        if (!compData.disabled) {
            // Change current item number
            setCurrentItem(itemNumber + 1)
        }
    }, [compData, itemNumber])

    return (
        <button className={circleClasses.join(' ')} onClick={onClickHandler}>
            <div className={`${circleCN}-inner`}>
                <Label compData={compData} />
            </div>
        </button>
    )
}

// Text above button
function Label(props: StepProgressType.LabelPropType) {
    const { compData } = props

    // CLASSES
    const labelCN = `${CN}__label`
    const labelClasses = [labelCN]

    if (compData.active) labelClasses.push(`${labelCN}--active`)
    else if (compData.disabled) labelClasses.push(`${labelCN}--disabled`)
    else labelClasses.push(`${labelCN}--normal`)

    return <span className={labelClasses.join(' ')}>{compData.name}</span>
}

// Line between round buttons component
function Segment(props: StepProgressType.SegmentPropType) {
    const { itemNumber, compData, items, currentItem } = props

    const fillElemClasses = useGetSegmentFillElemClasses(CN, itemNumber, currentItem)

    if (itemNumber === items.length - 1) return null

    return (
        <div className={`${CN}__segment`}>
            <div className={fillElemClasses.join(' ')} />
        </div>
    )
}
