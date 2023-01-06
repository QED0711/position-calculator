import React from 'react';
import { PropsType } from '../types';

// =============================== STYLES ===============================
const INPUT_STYLE: string = "w-full m-1 p-1 text-lg rounded-sm shadow-sm shadow-gray-800"

// =============================== TYPES ===============================
type LabelWrapperProps = {
    label: string,
    className?: string,
    textClassName?: string,
    children: JSX.Element,
}

type InputFieldProps = {
    label: string,
    inputType: string,
    value: any,
    onChange: (e: React.SyntheticEvent) => void,
    args?: { [key: string]: any },
    containerClassName?: string,
    textClassName?: string
}


const LabelWrapper: React.FC<LabelWrapperProps> = ({ label, children, className, textClassName}) => {
    return (
        <div className={className}>
            <label className={"text-left "}>
                <h4 className={`ml-1 text-sm  ${textClassName}`}>{label}</h4>
                {children}
            </label>
        </div>
    )
}

export default function InputField({
    label = "",
    inputType,
    value,
    onChange,
    args = {},
    containerClassName = "",
    textClassName=""
}: InputFieldProps) {

    // RENDERERS
    const renderToggleButtons = (options: string[], colors: string[], value: string) => {
        return options.map((option, i) => {
            return (
                <div key={option} className={`${value === option ? colors[i] : "bg-gray-200"} py-2 text-center select-none cursor-pointer`}>
                    {option}
                </div>
            )
        })
    }

    switch (inputType) {
        case "number":
            return (
                <LabelWrapper label={label} className={containerClassName} textClassName={textClassName}>
                    <input
                        className={INPUT_STYLE}
                        type="number"
                        onChange={onChange}
                        value={value}
                        {...args}
                    />
                </LabelWrapper>
            )
        case "text":
            return (
                <LabelWrapper label={label} className={containerClassName}>
                    <input
                        className={INPUT_STYLE}
                        type="text"
                        onChange={onChange}
                        value={value}
                        {...args}
                    />
                </LabelWrapper>
            )
        case "toggleButton":
            return (
                <LabelWrapper label={label} className={containerClassName}>
                    <div
                        className="rounded-sm shadow-sm shadow-gray-800"
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%" }}
                        onClick={onChange}
                    >
                        {renderToggleButtons(args.options, args.colors, value)}
                    </div>
                </LabelWrapper>
            )
        default:
            return <></>
    }
}