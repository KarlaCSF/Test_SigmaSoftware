export interface InputFormProps {
  label: string
  value: string

  onChange: (newValue: string) => void
}

export const InputForm: React.FC<InputFormProps> = (props) => {
  return (
    <label>
      <span>{props.label}</span>
      <input 
        value={props.value} 
        onChange={e => props.onChange(e.target.value)}/>
    </label>
  )
}