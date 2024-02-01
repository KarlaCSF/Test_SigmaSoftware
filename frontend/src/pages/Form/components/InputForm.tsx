export interface InputFormProps {
  label: string
  value: string
  canView: boolean
  canEdit: boolean

  onChange: (newValue: string) => void
}

export const InputForm: React.FC<InputFormProps> = (props) => {
  return (
    <div className="FormItem">
      <label>
        <span>{props.label}</span>
        <input 
          disabled={!props.canEdit}
          value={props.value}
          type={props.canView ? "text" : "password"} 
          onChange={e => props.onChange(e.target.value)}/>
      </label>
    </div>
  )
}