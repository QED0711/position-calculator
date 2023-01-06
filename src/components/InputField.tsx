import React from 'react';
import { PropsType } from '../types';

// =============================== STYLES ===============================
const INPUT_STYLE: string = "w-full m-1 p-1 text-lg rounded-sm shadow-sm shadow-gray-800"

// =============================== TYPES ===============================
type LabelWrapperProps = {
    label: string,
    className: string, 
    children: JSX.Element,
}

type InputFieldProps = {
    label: string,
    inputType: string,
    value: any,
    onChange: (e: React.SyntheticEvent) => void,
    args?: { [key: string]: any },
    containerClassName?: string,
}


const LabelWrapper: React.FC<LabelWrapperProps> = ({ label, children, className }) => {

    return (
        <div className={className}>
            <label className={"text-left " }>
                <h4 className='ml-1 text-sm text-gray-500'>{label}</h4>
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
    containerClassName = ""
}: InputFieldProps) {

    switch (inputType) {
        case "number":
            return (
                <LabelWrapper label={label} className={containerClassName}>
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
        default:
            return <></>
    }
}