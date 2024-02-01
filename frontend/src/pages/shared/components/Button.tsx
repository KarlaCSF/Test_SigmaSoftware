export interface ButtonProps {
  type: "submit" | "reset" | "button"
  onClick: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props}>
      { props.children }
    </button>
  )
}