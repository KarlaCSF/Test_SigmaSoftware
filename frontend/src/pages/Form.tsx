import { useState } from "react"

export const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleContinue = () => {

  }

  return (
    <div>
      <form>
        <label>
          <span>Nome</span>
          <input value={name} onChange={e => setName(e.target.value)}/>
        </label>

        <label>
          <span>Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)}/>
        </label>

        <button type="button" onClick={handleContinue}>
          Continue
        </button>
      </form>
    </div>

  // useEffect(() => {
  //   UserService.getById()
  //     .then((result) => {
  //       if (result instanceof ApiException) {
  //         alert(result.message)
  //       }
  //     })
  // }, [])
  )
}