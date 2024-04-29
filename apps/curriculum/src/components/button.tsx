import type { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	disabled?: boolean
	primary?: boolean
	secondary?: boolean
}

export const Button: FC<ButtonProps> = ({
	text,
	disabled,
	primary,
	secondary,

	...props
}) => {
	const baseStyle =
		'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
	const primaryStyle = 'bg-blue-500 hover:bg-blue-700'
	const secondaryStyle = 'bg-gray-500 hover:bg-gray-700'
	const buttonStyle = primary ? primaryStyle : secondary ? secondaryStyle : ''
	const combinedClassName = `${baseStyle} ${buttonStyle} ${props.className} ${
		disabled ? 'opacity-50 cursor-not-allowed' : ''
	}`

	const className = `${baseStyle} ${primary ? primaryStyle : secondaryStyle} ${
		disabled ? 'opacity-50 cursor-not-allowed' : ''
	}`

	return (
		<button type='button' className={className} disabled={disabled} {...props}>
			{text}
		</button>
	)
}
