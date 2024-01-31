export interface ButtonFormProps {
  type: "submit" | "reset" | "button"
  onClick: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonFormProps> = (props) => {
  return (
    <button {...props}>
      { props.children }
    </button>
  )
}