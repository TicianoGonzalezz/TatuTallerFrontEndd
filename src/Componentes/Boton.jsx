import { Button } from 'react-bootstrap'

const Boton = ({ onClick, name, disabled, variant, size, type }) => {
  return (
    <div className="d-grid gap-2">
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        size={size}
        type={type}
      >
        {name}
      </Button>
    </div>
  )
}

export default Boton