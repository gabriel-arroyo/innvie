const { useState } = require("react")

function useShow() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  return [show, setShow, toggleModal]
}

export default useShow
