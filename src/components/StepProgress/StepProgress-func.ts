import {useEffect, useState } from 'react'
import StepProgressType from './StepProgressTypes'

// The function prepares item data array for render StepProgress component
// Data depends on current items number
export function getCompData(
    steps: StepProgressType.StepList,
    currentStep: StepProgressType.CurrentItem
): StepProgressType.itemList {

    // If currentStep number is greater then steps length, then set steps length as a currentStep number
    let currentStepFixed = steps.length >= currentStep
        ? currentStep : steps.length

    // Cut off unnecessary steps and create items data array
    return steps.slice(0, 5).map((stepName, i) => {
        let isActive = i < currentStepFixed

        let isDisabled = true
        if (i === currentStepFixed - 2 || i == currentStepFixed) {
            isDisabled = false
        }

        return {
            active: isActive,
            disabled: isDisabled,
            name: stepName
        }
    })
}

// The function return classes for Segment fill element
export function useGetSegmentFillElemClasses(
    CN: string,
    itemNumber: StepProgressType.CurrentItem,
    currentItem: StepProgressType.CurrentItem
) {
    // Has animate class been applied
    // 0 — main classes is not applied
    // 1 — main classes is applied
    // 2 — animate class is applied
    const [classesAppliedStatus, setClassesAppliedStatus] = useState(0)

    // Root component class
    const fillCN = `${CN}__segment-fill`
    // Fill element classes array
    const [fillClasses, setFillClasses] = useState([fillCN])

    // Rebuild classes if current item number was changed
    useEffect(function () {
        // Add fill class if the segment is located before current item number
        if (itemNumber < currentItem - 1) {
            const newFillClasses = [...fillClasses, `${fillCN}--filled`]
            setFillClasses(newFillClasses)
        }
        // Otherwise remove fill class
        else {
            const newFillClasses = fillClasses.filter(cls => cls !== `${fillCN}--filled`)
            setFillClasses(newFillClasses)
        }
    }, [itemNumber, currentItem])

    // If all classes are set, then allow to set animation class
    useEffect(function () {
        setTimeout(function () {
            setClassesAppliedStatus(1)
        }, 100)
    }, [])

    // Set animation class after all classes were set because I don't want to see animation
    // when component render for the first time
    useEffect(function () {
        if (classesAppliedStatus === 1) {
            const newFillClasses = [...fillClasses, `${fillCN}--animate`]
            setFillClasses(newFillClasses)
            // Forbid set animate class in next render
            setClassesAppliedStatus(2)
        }
    }, [fillClasses, classesAppliedStatus])

    return fillClasses
}
