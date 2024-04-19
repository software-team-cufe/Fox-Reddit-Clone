
/**
 * @file Select.tsx
 * This file contains the implementation of a custom Select component.
 */

"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "../../../lib/utils"

/**
 * The root component of the Select.
 */
const Select = SelectPrimitive.Root

/**
 * The group component of the Select.
 */
const SelectGroup = SelectPrimitive.Group

/**
 * The value component of the Select.
 */
const SelectValue = SelectPrimitive.Value

/**
 * The trigger component of the Select.
 */
const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(
    /**
     * Renders the SelectTrigger component.
     * @param className - The CSS class name of the component.
     * @param children - The child elements of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectTrigger component.
     */
    ({ className, children, ...props }, ref) => (
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                className
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <CaretSortIcon className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * The scroll up button component of the Select.
 */
const SelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(
    /**
     * Renders the SelectScrollUpButton component.
     * @param className - The CSS class name of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectScrollUpButton component.
     */
    ({ className, ...props }, ref) => (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            )}
            {...props}
        >
            <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
    )
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * The scroll down button component of the Select.
 */
const SelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(
    /**
     * Renders the SelectScrollDownButton component.
     * @param className - The CSS class name of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectScrollDownButton component.
     */
    ({ className, ...props }, ref) => (
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            )}
            {...props}
        >
            <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
    )
)
SelectScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName

/**
 * The content component of the Select.
 */
const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
    /**
     * Renders the SelectContent component.
     * @param className - The CSS class name of the component.
     * @param children - The child elements of the component.
     * @param position - The position of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectContent component.
     */
    ({ className, children, position = "popper", ...props }, ref) => (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                ref={ref}
                className={cn(
                    "relative z-50 max-h-96  min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    position === "popper" &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                    className
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" &&
                            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
)
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * The label component of the Select.
 */
const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(
    /**
     * Renders the SelectLabel component.
     * @param className - The CSS class name of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectLabel component.
     */
    ({ className, ...props }, ref) => (
        <SelectPrimitive.Label
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", className)}
            {...props}
        />
    )
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * The item component of the Select.
 */
const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(
    /**
     * Renders the SelectItem component.
     * @param className - The CSS class name of the component.
     * @param children - The child elements of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectItem component.
     */
    ({ className, children, ...props }, ref) => (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
            <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
)
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * The separator component of the Select.
 */
const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(
    /**
     * Renders the SelectSeparator component.
     * @param className - The CSS class name of the component.
     * @param props - The additional props for the component.
     * @param ref - The ref to attach to the component.
     * @returns The rendered SelectSeparator component.
     */
    ({ className, ...props }, ref) => (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-muted", className)}
            {...props}
        />
    )
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
